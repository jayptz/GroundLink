from pydantic import BaseModel
class PresignOut(BaseModel):
    putUrl: str
    key: str
class PhotoCompleteIn(BaseModel):
    jobId: int
    key: str 