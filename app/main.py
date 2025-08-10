import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, jobs, photos
from app.core.db import init_db
from app.core.socket import sio_app

load_dotenv()

app = FastAPI(title="GroundLink API", version="0.1.0")

origins = [o.strip() for o in os.getenv("CORS_ORIGINS","http://localhost:3000").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
app.include_router(photos.router, prefix="/photos", tags=["photos"])

@app.get("/health")
def health(): return {"ok": True}

# Mount Socket.IO ASGI app at /ws
from asgiref.wsgi import WsgiToAsgi
from socketio import ASGIApp
socketio_asgi = ASGIApp(sio_app, other_asgi_app=None)
# In uvicorn: run "app.main:socketio_asgi" to serve Socket.IO, or use app with an ASGI router. 