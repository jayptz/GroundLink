from pydantic import BaseModel, EmailStr
class LoginIn(BaseModel):
    email: EmailStr
    password: str
class LoginOut(BaseModel):
    token: str
    role: str 