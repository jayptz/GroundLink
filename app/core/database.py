from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use SQLite as fallback for development
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./groundlink.db")

engine = create_async_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base() 