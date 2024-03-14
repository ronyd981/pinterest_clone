from fastapi import HTTPException, Response
from bson import ObjectId
from jwt_functions.jwt import verify_token, encode_user
from config import collection_pin, collection_comments
from models.model_pin import PinResponse


async def create_pin_in_db(pin):
    new_pin = await collection_pin.insert_one(pin)

    new_pin_inserted = await collection_pin.find_one({
        "_id": new_pin.inserted_id
    })

    if new_pin_inserted:
        new_pin_inserted.update({"id": new_pin_inserted.pop("_id")})

        return new_pin_inserted
    raise HTTPException(500, "Something went wrong")


async def get_single_pin(pin_id):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if pin:
        pin.update({"id": pin.pop("_id")})
        return pin
    raise HTTPException(404, "Pin not found")


async def get_all_pines(user_id, title):
    filters = {}

    if user_id is not None:
        filters["user_id"] = user_id
    if title is not None:
        filters["title"] = {"$regex": title, "$options": "i"}

    pines = []
    all_pines = collection_pin.find(filters)
    async for pin in all_pines:
        pin.update({"id": pin.pop("_id")})
        pines.append(PinResponse(**pin))

    return pines


async def edit_pin(pin_id, user_id, pin):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin_in_db = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if not pin_in_db:
        raise HTTPException(404, "Pin was not found")

    if pin_in_db["user_id"] != user_id:
        raise HTTPException(403, "You are not the owner of this pin")

    new_pin = {k: v for k, v in pin.dict().items() if v is not None}

    await collection_pin.update_one({"_id": ObjectId(pin_id)}, {"$set": new_pin})

    new_pin_updated = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    new_pin_updated.update({"id": new_pin_updated.pop("_id")})

    return new_pin_updated


async def delete_pin_in_db(pin_id, user_id):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin_in_db = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if not pin_in_db:
        raise HTTPException(404, "Pin was not found")

    if pin_in_db["user_id"] != user_id:
        raise HTTPException(403, "You are not the owner of this pin")

    deleted_pin = await collection_pin.delete_one({
        "_id": ObjectId(pin_id)
    })

    delete_comments = await collection_comments.delete_many({
        "pin_id": pin_id
    })

    if deleted_pin and delete_comments:
        return Response(status_code=204)
    raise HTTPException(400, "Something went wrong")


async def like_pin_in_db(pin_id, user_id):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin_in_db = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if not pin_in_db:
        raise HTTPException(404, "Pin was not found")

    arr_likes = pin_in_db["likes"]

    has_like = True

    for user_id_in_likes in arr_likes:
        if user_id_in_likes == user_id:
            arr_likes.remove(user_id)
            has_like = False
            break

    if has_like:
        arr_likes.append(user_id)

    like_pin = await collection_pin.update_one({"_id": ObjectId(pin_id)}, {"$set": {"likes": arr_likes}})

    if like_pin:
        return has_like
    raise HTTPException(400, "Something went wrong")
