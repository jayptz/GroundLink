from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PhotoBase(BaseModel):
    url: str
    job_id: int
    user_id: int

class PhotoCreate(PhotoBase):
    pass

class PhotoRead(PhotoBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True 