import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import Post, Comment, User, Place
from app.schemas.schemas import PostCreate, PostResponse, CommentCreate, CommentResponse, PostVote

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.get("", response_model=List[PostResponse])
def get_posts(
    destination_id: Optional[str] = Query(None),
    place_id: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Post)
    if destination_id:
        query = query.filter(Post.destination_id == destination_id.lower())
    if place_id:
        query = query.filter(Post.place_id == place_id)
        
    posts = query.order_by(Post.created_at.desc()).all()
    
    results = []
    for p in posts:
        resp = PostResponse.from_orm(p)
        if p.author:
            resp.user_name = p.author.name
            resp.user_handle = p.author.handle
            resp.user_avatar = p.author.avatar
            resp.user_badge = p.author.badge
        if p.place:
            resp.place_name = p.place.name
        resp.comments_count = len(p.comments)
        results.append(resp)
        
    return results

@router.post("", response_model=PostResponse)
def create_post(payload: PostCreate, db: Session = Depends(get_db)):
    # Find or use fallback user
    user = db.query(User).first()
    user_id = user.id if user else "user_1"
    
    new_post = Post(
        id=f"post_{uuid.uuid4().hex[:8]}",
        destination_id=payload.destination_id.lower(),
        place_id=payload.place_id,
        user_id=user_id,
        visited_timestamp=payload.visited_timestamp,
        visit_date=payload.visit_date or "Recently",
        rating=payload.rating,
        crowd_level=payload.crowd_level,
        content=payload.content,
        images=payload.images or [],
        tags=payload.tags or []
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    
    resp = PostResponse.from_orm(new_post)
    if new_post.author:
        resp.user_name = new_post.author.name
        resp.user_avatar = new_post.author.avatar
    return resp

@router.get("/{post_id}", response_model=PostResponse)
def get_post(post_id: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    resp = PostResponse.from_orm(post)
    if post.author:
        resp.user_name = post.author.name
        resp.user_avatar = post.author.avatar
    return resp

@router.post("/{post_id}/comments", response_model=CommentResponse)
def add_comment(post_id: str, payload: CommentCreate, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    user = db.query(User).first()
    user_id = user.id if user else "user_1"
    
    new_comment = Comment(
        id=f"c_{uuid.uuid4().hex[:8]}",
        post_id=post_id,
        user_id=user_id,
        text=payload.text
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    
    resp = CommentResponse.from_orm(new_comment)
    if new_comment.user:
        resp.user_name = new_comment.user.name
        resp.user_avatar = new_comment.user.avatar
    return resp

@router.post("/{post_id}/vote")
def vote_post(post_id: str, payload: PostVote, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    if payload.direction == "up":
        post.upvotes += 1
    elif payload.direction == "down":
        post.downvotes += 1
        
    db.commit()
    return {"message": "Vote recorded", "upvotes": post.upvotes, "downvotes": post.downvotes}
