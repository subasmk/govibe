import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import SafetyReport
from app.schemas.schemas import SafetyReportCreate, SafetyReportResponse

router = APIRouter(prefix="/safety-reports", tags=["Safety Reports"])

@router.get("", response_model=List[SafetyReportResponse])
def get_safety_reports(destination_id: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(SafetyReport)
    if destination_id:
        query = query.filter(SafetyReport.destination_id == destination_id.lower())
    return query.order_by(SafetyReport.created_at.desc()).all()

@router.post("", response_model=SafetyReportResponse)
def create_safety_report(payload: SafetyReportCreate, db: Session = Depends(get_db)):
    new_report = SafetyReport(
        id=f"safety_{uuid.uuid4().hex[:8]}",
        destination_id=payload.destination_id.lower(),
        place_name=payload.place_name,
        category=payload.category,
        severity=payload.severity,
        title=payload.title,
        description=payload.description,
        reported_by="Community Contributor",
        reported_timestamp="Just now",
        verified_count=1,
        status="Active"
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return SafetyReportResponse.from_orm(new_report)

@router.post("/{report_id}/confirm")
def confirm_report(report_id: str, db: Session = Depends(get_db)):
    report = db.query(SafetyReport).filter(SafetyReport.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report.verified_count += 1
    db.commit()
    return {"message": "Report confirmed", "verified_count": report.verified_count}
