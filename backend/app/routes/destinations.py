from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.models import Destination
from app.schemas.schemas import DestinationResponse

router = APIRouter(prefix="/destinations", tags=["Destinations"])

@router.get("", response_model=List[DestinationResponse])
def get_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).all()

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(destination_id: str, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.id == destination_id.lower()).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest
