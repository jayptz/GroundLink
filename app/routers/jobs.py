from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import SessionLocal
from app.models.job import Job, JobStatus
from app.schemas.job import JobCreate, JobRead
from app.models.user import User, UserRole
from app.routers.auth import get_current_user
from typing import List

router = APIRouter(prefix="/jobs", tags=["jobs"])

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.get("/", response_model=List[JobRead])
async def list_jobs(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Job))
    return result.scalars().all()

@router.post("/", response_model=JobRead, status_code=status.HTTP_201_CREATED)
async def create_job(job: JobCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.supervisor:
        raise HTTPException(status_code=403, detail="Not authorized")
    db_job = Job(**job.dict())
    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job

@router.get("/{job_id}", response_model=JobRead)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    job = await db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=JobRead)
async def update_job(job_id: int, job: JobCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_job = await db.get(Job, job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role != UserRole.supervisor:
        raise HTTPException(status_code=403, detail="Not authorized")
    for key, value in job.dict().items():
        setattr(db_job, key, value)
    await db.commit()
    await db.refresh(db_job)
    return db_job

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_job = await db.get(Job, job_id)
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role != UserRole.supervisor:
        raise HTTPException(status_code=403, detail="Not authorized")
    await db.delete(db_job)
    await db.commit()
    return None 