from fastapi import HTTPException, APIRouter, Request
from models.model_user import GetUserResponse, UpdateUser
from controllers.user_controller import get_user_in_db, update_user, delete_user_in_db
from middleware_functions.verify_token_function import verify_token_function

router = APIRouter()


@router.get("/api/v1/users/{user_id}", response_model=GetUserResponse)
async def get_user(user_id: str):
    response = await get_user_in_db(user_id)

    if response:
        return response
    raise HTTPException(500, "Something went wrong")


@router.put("/api/v1/users/{user_id}", response_model=GetUserResponse)
async def edit_user(request: Request, user_id: str, updated_user: UpdateUser):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await update_user(user_id, verify["id"], updated_user)

    if response:
        return response
    raise HTTPException(500, "Something went wrong")


@router.delete("/api/v1/users/{user_id}")
async def delete_user(request: Request, user_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await delete_user_in_db(user_id, verify["id"])

    if response:
        return response
    raise HTTPException(500, "Something went wrong")
