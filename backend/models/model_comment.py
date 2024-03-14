from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, root_validator
from typing import Optional
from .py_object_id import PydanticObjectId


class PinComment(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    body: str
    likes: Optional[list] = []
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    @root_validator(pre=False, skip_on_failure=True)
    def number_validator(cls, values):
        values["updated_at"] = datetime.now()
        return values


class PinCommentUpdate(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    body: Optional[str] = None
    user_id: Optional[str] = None
    likes: Optional[list] = []


class PinCommentResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: PydanticObjectId
    pin_id: str
    body: str
    user_id: str
    likes: Optional[list] = []
    created_at: datetime
    updated_at: datetime
