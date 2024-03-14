from fastapi import HTTPException, APIRouter, Request
from models.model_comment import PinComment, PinCommentResponse, PinCommentUpdate
from controllers.comment_controller import create_comment_in_pin, get_comments_in_db, like_the_comment, delete_comment_in_db
from middleware_functions.verify_token_function import verify_token_function

router = APIRouter()


@router.post("/api/v1/comment/{pin_id}", response_model=PinCommentResponse)
async def create_comment(request: Request, comment: PinComment, pin_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await create_comment_in_pin(comment.dict(), pin_id, verify["id"])

    if response:
        return response
    raise HTTPException(500, "Something went wrong")


@router.get("/api/v1/comment/{pin_id}")
async def get_comments(pin_id: str):
    response = await get_comments_in_db(pin_id)

    if response is not None:
        return response
    raise HTTPException(500, "Something went wrong")


@router.put("/api/v1/comment/like/{comment_id}", response_model=bool)
async def like_comment(request: Request, comment_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await like_the_comment(comment_id, verify["id"])

    if response is not None:
        return response
    raise HTTPException(500, "Something went wrong")


@router.delete("/api/v1/comment/{comment_id}")
async def delete_comment(request: Request, comment_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await delete_comment_in_db(comment_id, verify["id"])

    if response:
        return response
    raise HTTPException(500, "Something went wrong")
