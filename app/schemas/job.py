from pydantic import BaseModel
from typing import Optional

class JobIn(BaseModel):
    title: str
    latitude: float
    longitude: float
    assignee_id: Optional[int] = None

class JobOut(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float
    status: str
    assignee_id: Optional[int] 