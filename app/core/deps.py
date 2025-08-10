from fastapi import Depends, HTTPException, Header
from app.core.security import decode_token
def require_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "): raise HTTPException(401, "Missing token")
    token=authorization.split(" ",1)[1]
    payload=decode_token(token)
    if not payload: raise HTTPException(401, "Invalid token")
    return payload 