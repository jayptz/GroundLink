import os
from dotenv import load_dotenv
import time
import bcrypt
import jwt
from typing import Optional

load_dotenv()

JWT_SECRET=os.getenv("JWT_SECRET","devsecret")
JWT_EXPIRES_MIN=int(os.getenv("JWT_EXPIRES_MIN","60"))
def hash_password(p:str)->str: return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()
def verify_password(p:str, h:str)->bool: return bcrypt.checkpw(p.encode(), h.encode())
def create_token(sub:int, role:str)->str:
    now=int(time.time()); exp=now + JWT_EXPIRES_MIN*60
    return jwt.encode({"sub":sub,"role":role,"exp":exp}, JWT_SECRET, algorithm="HS256")
def decode_token(token:str)->Optional[dict]:
    try: return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception: return None 