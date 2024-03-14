from fastapi import HTTPException, Response
from config import collection_user
from bson import ObjectId
from passlib.context import CryptContext
import bcrypt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def get_user_in_db(user_id):
    if len(user_id) < 24 or len(user_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    user_in_db = await collection_user.find_one({
        "_id": ObjectId(user_id)
    })

    user = await collection_user.find_one({
        "_id": ObjectId(user_id)
    })

    if user:
        user.pop("password", None)
        user.update({"id": user.pop("_id")})
        return user
    raise HTTPException(404, "User not found")


async def update_user(user_id, log_user_id, updated_user):
    if len(user_id) < 24 or len(user_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    user_in_db = await collection_user.find_one({
        "_id": ObjectId(user_id)
    })

    if not user_in_db:
        raise HTTPException(404, "User was not found")

    if user_id != log_user_id:
        raise HTTPException(409, "You can edit only your user")

    if updated_user.old_password is not None and updated_user.password is not None:
        verify_pw = pwd_context.verify(
            updated_user.old_password, user_in_db["password"])

        if not verify_pw:
            raise HTTPException(
                409, "Your password does not match the previous one")

    if updated_user.password is not None:
        updated_user.password = bcrypt.hashpw(
            updated_user.password.encode("utf-8"), bcrypt.gensalt())

    del updated_user.old_password

    user_updated = {k: v for k, v in updated_user.dict().items()
                    if v is not None}

    updating_user = await collection_user.update_one({"_id": ObjectId(user_id)}, {"$set": user_updated})

    if updating_user.matched_count > 0:
        new_user_updated = await collection_user.find_one({
            "_id": ObjectId(user_id)
        })

        new_user_updated.update({"id": new_user_updated.pop("_id")})

        return new_user_updated
    raise HTTPException(400, "Something went wrong")


async def delete_user_in_db(user_id, log_user_id):
    if len(user_id) < 24 or len(user_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    user_in_db = await collection_user.find_one({
        "_id": ObjectId(user_id)
    })

    if not user_in_db:
        raise HTTPException(404, "User was not found")

    user_object_id = ObjectId(user_in_db["_id"])
    string_id = str(user_object_id)

    if string_id != log_user_id:
        raise HTTPException(403, "You can delete only your account")

    deleted_user = await collection_user.delete_one({
        "_id": ObjectId(user_id)
    })

    if deleted_user:
        return Response(status_code=204)
    raise HTTPException(400, "Something went wrong")
