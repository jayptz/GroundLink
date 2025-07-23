from pydantic import BaseModel
from enum import Enum

class UserRole(str, Enum):
    worker = "worker"
    supervisor = "supervisor"

class UserBase(BaseModel):
    username: str
    role: UserRole

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True 