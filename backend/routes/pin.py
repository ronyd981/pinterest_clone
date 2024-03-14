from fastapi import HTTPException, APIRouter, Request, Query
from controllers.pin_controller import create_pin_in_db, get_single_pin, get_all_pines, edit_pin, delete_pin_in_db, like_pin_in_db
from models.model_pin import Pin, PinResponse, PinUpdate
from middleware_functions.verify_token_function import verify_token_function

router = APIRouter()


@router.post("/api/v1/pin", response_model=PinResponse)
async def create_pin(request: Request, pin: Pin):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    new_pin = pin.dict()
    new_pin["user_id"] = verify["id"]
    response = await create_pin_in_db(new_pin)

    if response:
        return response
    raise HTTPException(500, "Something went wrong")


@router.get("/api/v1/pin/{pin_id}", response_model=PinResponse)
async def get_pin(pin_id: str):
    pin = await get_single_pin(pin_id)

    if pin:
        return pin
    raise HTTPException(500, "Something went wrong")


@router.get("/api/v1/pin")
async def get_all_pin(
    user_id: str = Query(None, description="Find by user"),
    title: str = Query(None, description="Find by title")
):
    response = await get_all_pines(user_id=user_id, title=title)

    return response


@router.put("/api/v1/pin/{pin_id}", response_model=PinResponse)
async def update_pin(request: Request, pin_id: str, pin: PinUpdate):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await edit_pin(pin_id=pin_id, user_id=verify["id"], pin=pin)

    if response:
        return response
    raise HTTPException(500, "Something went wrong")


@router.put("/api/v1/pin/like/{pin_id}", response_model=bool)
async def like_pin(request: Request, pin_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await like_pin_in_db(pin_id, verify["id"])

    if response is not None:
        return response
    raise HTTPException(500, "Something went wrong")


@router.delete("/api/v1/pin/{pin_id}")
async def delete_pin(request: Request, pin_id: str):
    token = request.cookies.get("token")
    verify = verify_token_function(token)

    response = await delete_pin_in_db(pin_id=pin_id, user_id=verify["id"])

    if response:
        return response
    raise HTTPException(500, "Something went wrong")
