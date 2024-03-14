from fastapi import HTTPException, Response
from bson import ObjectId
from jwt_functions.jwt import verify_token, encode_user
from config import collection_comments, collection_pin
from models.model_comment import PinCommentResponse


async def create_comment_in_pin(comment, pin_id, user_id):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin_in_db = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if not pin_in_db:
        raise HTTPException(404, "Pin was not found")

    comment["pin_id"] = pin_id
    comment["user_id"] = user_id

    try:
        new_comment = await collection_comments.insert_one(comment)

        new_comment_inserted = await collection_comments.find_one({
            "_id": new_comment.inserted_id
        })

        if new_comment_inserted:
            new_comment_inserted.update(
                {"id": new_comment_inserted.pop("_id")})
            return new_comment_inserted
    except Exception as e:
        raise HTTPException(400, e)


async def get_comments_in_db(pin_id):
    if len(pin_id) < 24 or len(pin_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    pin_in_db = await collection_pin.find_one({
        "_id": ObjectId(pin_id)
    })

    if not pin_in_db:
        raise HTTPException(404, "Pin was not found")

    try:
        comments = []
        all_comments = collection_comments.find({"pin_id": pin_id})
        async for comment in all_comments:
            comment.update({"id": comment.pop("_id")})
            comments.append(PinCommentResponse(**comment))

        return comments
    except Exception as e:
        raise HTTPException(400, e)


async def like_the_comment(comment_id, user_id):
    if len(comment_id) < 24 or len(comment_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    comment_in_db = await collection_comments.find_one({
        "_id": ObjectId(comment_id)
    })

    if not comment_in_db:
        raise HTTPException(404, "Comment was not found")

    arr_likes = comment_in_db["likes"]

    has_like = True

    for user_id_in_likes in arr_likes:
        if user_id_in_likes == user_id:
            arr_likes.remove(user_id)
            has_like = False
            break

    if has_like:
        arr_likes.append(user_id)

    like_comment = await collection_comments.update_one({"_id": ObjectId(comment_id)}, {"$set": {"likes": arr_likes}})

    if like_comment:
        return has_like
    raise HTTPException(400, "Something went wrong")


async def delete_comment_in_db(comment_id, user_id):
    if len(comment_id) < 24 or len(comment_id) > 24:
        raise HTTPException(400, "Invalid id were provided")

    comment_in_db = await collection_comments.find_one({
        "_id": ObjectId(comment_id)
    })

    if not comment_in_db:
        raise HTTPException(404, "Comment was not found")

    if comment_in_db["user_id"] != user_id:
        raise HTTPException(403, "You are not the owner of this comment")

    delete_comment = await collection_comments.delete_one({
        "_id": ObjectId(comment_id)
    })

    if delete_comment:
        return Response(status_code=204)
    raise HTTPException(400, "Something went wrong")
