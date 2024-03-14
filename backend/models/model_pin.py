from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, root_validator
from typing import Optional
from .py_object_id import PydanticObjectId


class Pin(BaseModel):
    # model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config = ConfigDict(arbitrary_types_allowed=True,
                              allow_population_by_field_name=True, timestamps=True)

    title: str
    description: str
    image: str
    likes: Optional[list] = []
    url: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    @root_validator(pre=False, skip_on_failure=True)
    def number_validator(cls, values):
        values["updated_at"] = datetime.now()
        return values


class PinUpdate(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    likes: Optional[list] = []
    url: Optional[str] = None


class PinResponse(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: PydanticObjectId
    user_id: str
    title: str
    description: str
    image: str
    likes: Optional[list] = []
    url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
