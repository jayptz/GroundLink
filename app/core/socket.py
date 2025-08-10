import os
from dotenv import load_dotenv
import socketio

load_dotenv()

sio_app = socketio.Server(
    cors_allowed_origins=[o.strip() for o in os.getenv("SOCKET_CORS_ORIGINS","http://localhost:3000").split(",")],
    async_mode="threading"
)

def emit_job_created(job): sio_app.emit("job:created", {"id":job.id,"title":job.title,"latitude":job.latitude,"longitude":job.longitude,"status":job.status})
def emit_job_updated(job): sio_app.emit("job:updated", {"id":job.id,"status":job.status})
def emit_photo_uploaded(photo): sio_app.emit("photo:uploaded", {"jobId":photo.job_id,"url":photo.url}) 