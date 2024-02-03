import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Memo(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    date: str = Field(None)
    topic: str = Field(None)
    Good_Bad: str = Field(None, alias="Good/Bad")
    cause: str = Field(None)
    lesson: str = Field(None)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "date": "2023-07-04",
                "topic": "Shopping",
                "Good/Bad": "Good",
                "cause": "...",
                "lesson": "Search for discounted items on app",
            }
        }

class MemoUpdate(BaseModel):
    date: Optional[str]
    topic: Optional[str]
    Good_Bad: Optional[str]
    cause: Optional[str]
    lesson: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "date": "2023-07-04",
                "topic": "Shopping",
                "Good/Bad": "Good",
                "cause": "...",
                "lesson": "Search for discounted items on app",
            }
        }
