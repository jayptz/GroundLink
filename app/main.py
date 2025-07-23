from fastapi import FastAPI
from app.routers import jobs, auth, users
from app.core.database import engine, Base

app = FastAPI()

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(jobs.router)

@app.on_event("startup")
async def startup():
    # Create tables (for dev/demo; use Alembic in prod)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all) 