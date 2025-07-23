from pydantic import BaseModel
from typing import Optional
from enum import Enum

class JobStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class JobBase(BaseModel):
    title: str
    description: Optional[str] = None
    latitude: float
    longitude: float
    status: JobStatus = JobStatus.pending
    assigned_to_id: Optional[int] = None

class JobCreate(JobBase):
    pass

class JobRead(JobBase):
    id: int

    class Config:
        orm_mode = True 