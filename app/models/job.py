from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base
import enum
class JobStatus(str, enum.Enum):
    pending="pending"; in_progress="in_progress"; done="done"
class Job(Base):
    __tablename__="jobs"
    id=Column(Integer, primary_key=True)
    title=Column(String, nullable=False)
    latitude=Column(Float, nullable=False)
    longitude=Column(Float, nullable=False)
    status=Column(Enum(JobStatus), default=JobStatus.pending, nullable=False)
    assignee_id=Column(Integer, ForeignKey("users.id"), nullable=True)
    assignee=relationship("User") 