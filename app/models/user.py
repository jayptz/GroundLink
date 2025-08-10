from sqlalchemy import Column, Integer, String, Enum
from app.core.db import Base
import enum
class Role(str, enum.Enum):
    supervisor="supervisor"
    worker="worker"
class User(Base):
    __tablename__="users"
    id=Column(Integer, primary_key=True, index=True)
    email=Column(String, unique=True, index=True, nullable=False)
    password_hash=Column(String, nullable=False)
    role=Column(Enum(Role), nullable=False) 