from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Annotated, Any, Callable, Optional
from bson import ObjectId
from pydantic_core import core_schema
from .py_object_id import PydanticObjectId


class User(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: PydanticObjectId
    email: EmailStr
    token: str
    first_name: str
    last_name: str


class GetUserResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: PydanticObjectId
    email: EmailStr
    first_name: str
    last_name: str


class UpdateUser(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    old_password: Optional[str] = None
    password: Optional[str] = None
