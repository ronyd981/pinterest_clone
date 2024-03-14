from fastapi import HTTPException
from config import collection_user
from bson import ObjectId
import bcrypt
from passlib.context import CryptContext
from jwt_functions.jwt import encode_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def get_user(email):
    user = await collection_user.find_one({
        "email": email
    })

    return user


async def login(user):
    user_in_db = await get_user(user["email"])

    if not user_in_db:
        raise HTTPException(409, "User not found")

    verify_pw = pwd_context.verify(user["password"], user_in_db["password"])

    if not verify_pw:
        raise HTTPException(401, "User or password incorrect")

    user_in_db.pop("password", None)
    user_object_id = ObjectId(user_in_db["_id"])
    string_id = str(user_object_id)

    new_user_dict = {
        "id": string_id,
        "email": user_in_db["email"],
        "first_name": user_in_db["first_name"],
        "last_name": user_in_db["last_name"]
    }

    token = encode_user(new_user_dict)

    new_user_dict["token"] = token
    new_user_dict["id"] = user_in_db["_id"]

    return new_user_dict


async def create_user(user):
    check_if_it_exist = await get_user(user["email"])

    if check_if_it_exist:
        raise HTTPException(409, "Email already exist")

    user["password"] = bcrypt.hashpw(
        user["password"].encode("utf-8"), bcrypt.gensalt())

    new_user = await collection_user.insert_one(user)

    created_user = await collection_user.find_one({
        "_id": new_user.inserted_id
    })

    if created_user:
        created_user.pop("password", None)

        # Converting ObjectId to str
        # This right here, I can pass it into a function, and don't make the step in py_object_id
        user_object_id = ObjectId(created_user["_id"])
        string_id = str(user_object_id)

        new_user_dict = {
            "id": string_id,
            "email": created_user["email"],
            "first_name": created_user["first_name"],
            "last_name": created_user["last_name"]
        }

        token = encode_user(new_user_dict)

        new_user_dict["token"] = token
        new_user_dict["id"] = created_user["_id"]

        return new_user_dict
    raise HTTPException(500, "Something went wrong")
