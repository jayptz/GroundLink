import os
from dotenv import load_dotenv
import boto3
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.core.deps import require_user
from app.models.photo import Photo
from app.schemas.photo import PresignOut, PhotoCompleteIn
from app.core.socket import emit_photo_uploaded

load_dotenv()

router = APIRouter()
s3 = boto3.client("s3", region_name=os.getenv("AWS_REGION"))

def get_db():
    db=SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/presign", response_model=PresignOut)
def presign(jobId:int, user=Depends(require_user)):
    key=f"jobs/{jobId}/{user['sub']}.jpg"
    url=s3.generate_presigned_url("put_object", Params={"Bucket":os.getenv("S3_BUCKET"),"Key":key,"ContentType":"image/jpeg"}, ExpiresIn=300)
    return {"putUrl":url, "key":key}

@router.post("/complete")
def complete(body: PhotoCompleteIn, db: Session = Depends(get_db), user=Depends(require_user)):
    url=f"https://{os.getenv('S3_BUCKET')}.s3.amazonaws.com/{body.key}"
    p=Photo(job_id=body.jobId, key=body.key, url=url)
    db.add(p); db.commit()
    emit_photo_uploaded(p)
    return {"ok":True,"url":url} 