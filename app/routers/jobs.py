from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.core.deps import require_user
from app.models.job import Job, JobStatus
from app.schemas.job import JobIn
from app.core.socket import emit_job_created, emit_job_updated

router = APIRouter()

def get_db():
    db=SessionLocal()
    try: yield db
    finally: db.close()

@router.get("")
def list_jobs(db: Session = Depends(get_db), user=Depends(require_user)):
    q=db.query(Job)
    if user["role"]=="worker": q=q.filter((Job.assignee_id==user["sub"]) | (Job.assignee_id==None))
    return [ { "id":j.id, "title":j.title, "latitude":j.latitude, "longitude":j.longitude, "status":j.status.value, "assignee_id":j.assignee_id } for j in q.all() ]

@router.post("")
def create_job(body: JobIn, db: Session = Depends(get_db), user=Depends(require_user)):
    if user["role"]!="supervisor": raise HTTPException(403,"Forbidden")
    j=Job(title=body.title, latitude=body.latitude, longitude=body.longitude, assignee_id=body.assignee_id)
    db.add(j); db.commit(); db.refresh(j)
    emit_job_created(j)
    return {"id":j.id}

@router.put("/{job_id}/status")
def update_status(job_id:int, status: JobStatus, db: Session = Depends(get_db), user=Depends(require_user)):
    j=db.query(Job).get(job_id)
    if not j: raise HTTPException(404,"Not found")
    j.status=status; db.commit(); emit_job_updated(j)
    return {"ok":True} 