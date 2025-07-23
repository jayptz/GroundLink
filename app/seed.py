import asyncio
from app.core.database import SessionLocal
from app.models.user import User, UserRole
from app.models.job import Job, JobStatus
from app.core.security import get_password_hash

async def seed():
    async with SessionLocal() as db:
        # Users
        supervisor = User(
            username="supervisor1",
            hashed_password=get_password_hash("supervisorpass"),
            role=UserRole.supervisor
        )
        worker = User(
            username="worker1",
            hashed_password=get_password_hash("workerpass"),
            role=UserRole.worker
        )
        db.add_all([supervisor, worker])
        await db.commit()
        await db.refresh(supervisor)
        await db.refresh(worker)

        # Jobs
        job1 = Job(
            title="Inspect transformer",
            description="Routine inspection of transformer at Site A",
            latitude=40.7128,
            longitude=-74.0060,
            status=JobStatus.pending,
            assigned_to_id=worker.id
        )
        job2 = Job(
            title="Repair streetlight",
            description="Fix broken streetlight on Main St.",
            latitude=40.7138,
            longitude=-74.0020,
            status=JobStatus.in_progress,
            assigned_to_id=worker.id
        )
        job3 = Job(
            title="Check water meter",
            description="Check water meter at 123 Elm St.",
            latitude=40.7150,
            longitude=-74.0100,
            status=JobStatus.completed,
            assigned_to_id=worker.id
        )
        db.add_all([job1, job2, job3])
        await db.commit()

if __name__ == "__main__":
    asyncio.run(seed()) 