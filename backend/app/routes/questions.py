import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import Question, Answer, User
from app.schemas.schemas import QuestionCreate, QuestionResponse, AnswerCreate, AnswerResponse

router = APIRouter(prefix="/questions", tags=["Questions"])

@router.get("", response_model=List[QuestionResponse])
def get_questions(destination_id: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Question)
    if destination_id:
        query = query.filter(Question.destination_id == destination_id.lower())
    questions = query.order_by(Question.created_at.desc()).all()
    
    results = []
    for q in questions:
        resp = QuestionResponse.from_orm(q)
        resp.answers_count = len(q.answers)
        resp.answers = [AnswerResponse.from_orm(a) for a in q.answers]
        results.append(resp)
    return results

@router.post("", response_model=QuestionResponse)
def ask_question(payload: QuestionCreate, db: Session = Depends(get_db)):
    user = db.query(User).first()
    asked_by = user.name if user else "Traveller"
    avatar = user.avatar if user else None
    
    new_q = Question(
        id=f"q_{uuid.uuid4().hex[:8]}",
        destination_id=payload.destination_id.lower(),
        question=payload.question,
        details=payload.details,
        asked_by=asked_by,
        asked_avatar=avatar,
        asked_timestamp="Just now",
        upvotes=1,
        status="Unanswered"
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)
    return QuestionResponse.from_orm(new_q)

@router.post("/{question_id}/answers", response_model=AnswerResponse)
def answer_question(question_id: str, payload: AnswerCreate, db: Session = Depends(get_db)):
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
        
    user = db.query(User).first()
    answered_by = user.name if user else "Local Guide"
    avatar = user.avatar if user else None
    badge = user.badge if user else "Contributor"
    
    new_ans = Answer(
        id=f"ans_{uuid.uuid4().hex[:8]}",
        question_id=question_id,
        answered_by=answered_by,
        answerer_avatar=avatar,
        answerer_badge=badge,
        text=payload.text,
        upvotes=0
    )
    question.status = "Answered"
    db.add(new_ans)
    db.commit()
    db.refresh(new_ans)
    return AnswerResponse.from_orm(new_ans)
