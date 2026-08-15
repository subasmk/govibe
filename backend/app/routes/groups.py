import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import TripGroup, User
from app.schemas.schemas import TripGroupCreate, TripGroupResponse

router = APIRouter(prefix="/trip-groups", tags=["Trip Groups"])

@router.get("", response_model=List[TripGroupResponse])
def get_trip_groups(destination_id: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(TripGroup)
    if destination_id:
        query = query.filter(TripGroup.destination_id == destination_id.lower())
    return query.order_by(TripGroup.created_at.desc()).all()

@router.post("", response_model=TripGroupResponse)
def create_trip_group(payload: TripGroupCreate, db: Session = Depends(get_db)):
    user = db.query(User).first()
    organizer_name = user.name if user else "Traveller"
    organizer_avatar = user.avatar if user else None
    
    new_group = TripGroup(
        id=f"group_{uuid.uuid4().hex[:8]}",
        destination_id=payload.destination_id.lower(),
        destination_name=payload.destination_name,
        title=payload.title,
        dates=payload.dates,
        budget=payload.budget,
        members_count=1,
        max_members=payload.max_members,
        organizer={"name": organizer_name, "avatar": organizer_avatar},
        members=[{"name": organizer_name, "avatar": organizer_avatar}],
        interests=payload.interests or [],
        description=payload.description,
        status="Open"
    )
    db.add(new_group)
    db.commit()
    db.refresh(new_group)
    return TripGroupResponse.from_orm(new_group)

@router.post("/{group_id}/join")
def join_trip_group(group_id: str, db: Session = Depends(get_db)):
    group = db.query(TripGroup).filter(TripGroup.id == group_id).first()
    if not group:
        raise HTTPException(status_code=404, detail="Trip group not found")
    if group.members_count < group.max_members:
        group.members_count += 1
        db.commit()
    return {"message": "Joined group successfully", "members_count": group.members_count}
