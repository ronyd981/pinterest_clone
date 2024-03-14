from fastapi import HTTPException, APIRouter, Response
from models.model_user import User, UserResponse, UserLogin
from controllers.auth_controller import create_user, get_user, login

router = APIRouter()


@router.post("/api/v1/auth/login", response_model=UserResponse)
async def user_login(response: Response, user: UserLogin):
    user_dict = user.dict()

    user_response = await login(user_dict)

    if user_response:
        response.set_cookie(key="token",
                            value=user_response["token"])
        return user_response
    return HTTPException(400, "Something went wrong")


@router.post("/api/v1/auth/register", response_model=UserResponse)
async def register_user(response: Response, user: User):
    user_dict = user.dict()

    user_response = await create_user(user_dict)

    if user_response:
        response.set_cookie(key="token",
                            value=user_response["token"])
        return user_response
    return HTTPException(400, "Something went wrong")
