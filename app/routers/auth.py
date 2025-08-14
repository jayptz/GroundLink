from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from app.core.db import SessionLocal, init_db
from app.models.user import User, Role
from app.core.security import hash_password, verify_password, create_token
from app.schemas.auth import LoginIn, LoginOut

router = APIRouter()

def get_db():
    db=SessionLocal()
    try: yield db
    finally: db.close()

@router.on_event("startup")
def startup(): init_db()

@router.post("/login", response_model=LoginOut)
def login(body: LoginIn, db: Session = Depends(get_db)):
    u=db.query(User).filter(User.email==body.email).first()
    if not u or not verify_password(body.password, u.password_hash):
        raise HTTPException(401, "Invalid credentials")
    return {
        "user": {
            "id": u.id,
            "email": u.email,
            "role": u.role.value
        },
        "token": create_token(u.id, u.role.value)
    }

@router.post("/seed")
def seed(db: Session = Depends(get_db)):
    if not db.query(User).first():
        sup=User(email="supervisor@gl.com", password_hash=hash_password("password"), role=Role.supervisor)
        wkr=User(email="worker@gl.com", password_hash=hash_password("password"), role=Role.worker)
        db.add_all([sup,wkr]); db.flush()
        from app.models.job import Job
        jobs=[
            Job(title="Inspect hydrant", latitude=43.651, longitude=-79.383, assignee_id=wkr.id),
            Job(title="Check transformer", latitude=43.664, longitude=-79.400, assignee_id=wkr.id),
            Job(title="Road sign audit", latitude=43.640, longitude=-79.390, assignee_id=None),
        ]
        db.add_all(jobs); db.commit()
    return {"ok": True} 