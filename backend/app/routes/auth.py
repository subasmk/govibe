import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.database.session import get_db
from app.models.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

class RegisterPayload(BaseModel):
    name: str
    email: str
    password: str
    avatar: Optional[str] = None

class LoginPayload(BaseModel):
    email: str
    password: str

class ProfileUpdatePayload(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None

@router.post("/register")
def register(payload: RegisterPayload, db: Session = Depends(get_db)):
    # Check if user already exists
    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email address already exists.")

    handle = "@" + payload.name.lower().replace(" ", "_")[:20] + "_" + uuid.uuid4().hex[:4]
    user_id = f"user_{uuid.uuid4().hex[:10]}"

    new_user = User(
        id=user_id,
        name=payload.name.strip(),
        handle=handle,
        email=payload.email.lower().strip(),
        avatar=payload.avatar,
        bio="Community member on GoVIBE exploring travel destinations.",
        badge="Explorer",
        points=50,
        helpful_votes=0
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "handle": new_user.handle,
        "email": new_user.email,
        "avatar": new_user.avatar,
        "bio": new_user.bio,
        "badge": new_user.badge,
        "points": new_user.points,
        "helpfulVotes": new_user.helpful_votes,
        "token": f"govibe_jwt_{new_user.id}"
    }

@router.post("/login")
def login(payload: LoginPayload, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user:
        # If user doesn't exist yet, create account seamlessly
        handle = "@" + payload.email.split("@")[0].lower()
        new_user = User(
            id=f"user_{uuid.uuid4().hex[:10]}",
            name=payload.email.split("@")[0].title(),
            handle=handle,
            email=payload.email.lower().strip(),
            avatar=None,
            bio="GoVIBE Traveller",
            badge="Explorer",
            points=100,
            helpful_votes=0
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user

    return {
        "id": user.id,
        "name": user.name,
        "handle": user.handle,
        "email": user.email,
        "avatar": user.avatar,
        "bio": user.bio,
        "badge": user.badge,
        "points": user.points,
        "helpfulVotes": user.helpful_votes,
        "token": f"govibe_jwt_{user.id}"
    }

@router.get("/user/{user_id}")
def get_user_profile(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "name": user.name,
        "handle": user.handle,
        "email": user.email,
        "avatar": user.avatar,
        "bio": user.bio,
        "badge": user.badge,
        "points": user.points,
        "helpfulVotes": user.helpful_votes
    }
