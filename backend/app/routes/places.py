from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import Place
from app.schemas.schemas import PlaceResponse

router = APIRouter(prefix="/places", tags=["Places"])

@router.get("", response_model=List[PlaceResponse])
def get_places(destination_id: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Place)
    if destination_id:
        query = query.filter(Place.destination_id == destination_id.lower())
    return query.all()

@router.get("/{place_id}", response_model=PlaceResponse)
def get_place(place_id: str, db: Session = Depends(get_db)):
    place = db.query(Place).filter(Place.id == place_id).first()
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return place
