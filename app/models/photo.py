from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class Photo(Base):
    __tablename__="photos"
    id=Column(Integer, primary_key=True)
    job_id=Column(Integer, ForeignKey("jobs.id"), nullable=False)
    key=Column(String, nullable=False)  # S3 key
    url=Column(String, nullable=False)
    job=relationship("Job") 