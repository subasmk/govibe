from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

# User Schemas
class UserBase(BaseModel):
    name: str
    handle: str
    email: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    badge: Optional[str] = "Explorer"

class UserResponse(UserBase):
    id: str
    points: int = 100
    helpful_votes: int = 0
    class Config:
        from_attributes = True

# Destination Schemas
class DestinationResponse(BaseModel):
    id: str
    name: str
    state: str
    tagline: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    trust_score: int
    trust_breakdown: Optional[Dict[str, int]] = None
    rating: float
    total_ratings: int
    members_count: int
    active_now: int
    categories: Optional[List[str]] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    class Config:
        from_attributes = True

# Place Schemas
class PlaceResponse(BaseModel):
    id: str
    destination_id: str
    name: str
    category: str
    location: Optional[str] = None
    lat: float
    lng: float
    rating: float
    recent_rating: float
    total_ratings: int
    trust_score: int
    status: str
    status_text: Optional[str] = None
    cover_image: Optional[str] = None
    gallery: Optional[List[str]] = None
    description: Optional[str] = None
    timings: Optional[str] = None
    entry_fee: Optional[str] = None
    current_crowd: str
    best_time_to_visit: Optional[str] = None
    family_suitability: int
    accessibility: Optional[str] = None
    safety_observations: Optional[str] = None
    recent_experiences_count: int
    latest_report: Optional[str] = None
    class Config:
        from_attributes = True

# Post Schemas
class CommentCreate(BaseModel):
    text: str

class CommentResponse(BaseModel):
    id: str
    post_id: str
    user_id: str
    text: str
    upvotes: int = 0
    user_name: Optional[str] = None
    user_avatar: Optional[str] = None
    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    destination_id: str
    place_id: Optional[str] = None
    visited_timestamp: str
    visit_date: Optional[str] = None
    rating: float = 5.0
    crowd_level: str = "Low"
    content: str
    images: Optional[List[str]] = []
    tags: Optional[List[str]] = []

class PostVote(BaseModel):
    direction: str # 'up' or 'down'

class PostResponse(BaseModel):
    id: str
    destination_id: str
    place_id: Optional[str] = None
    user_id: str
    visited_timestamp: str
    visit_date: Optional[str] = None
    rating: float
    crowd_level: str
    is_outdated: bool = False
    outdated_notice: Optional[str] = None
    content: str
    images: Optional[List[str]] = None
    upvotes: int = 0
    downvotes: int = 0
    tags: Optional[List[str]] = None
    comments_count: Optional[int] = 0
    user_name: Optional[str] = None
    user_handle: Optional[str] = None
    user_avatar: Optional[str] = None
    user_badge: Optional[str] = None
    place_name: Optional[str] = None
    class Config:
        from_attributes = True

# Safety Report Schemas
class SafetyReportCreate(BaseModel):
    destination_id: str
    place_name: str
    category: str
    severity: str = "warning"
    title: str
    description: str

class SafetyReportResponse(BaseModel):
    id: str
    destination_id: str
    place_name: str
    category: str
    severity: str
    title: str
    description: str
    reported_by: str
    reported_timestamp: str
    verified_count: int
    status: str
    resolved: bool
    class Config:
        from_attributes = True

# Question & Answer Schemas
class AnswerCreate(BaseModel):
    text: str

class AnswerResponse(BaseModel):
    id: str
    question_id: str
    answered_by: str
    answerer_avatar: Optional[str] = None
    answerer_badge: Optional[str] = None
    text: str
    upvotes: int = 0
    is_accepted: bool = False
    class Config:
        from_attributes = True

class QuestionCreate(BaseModel):
    destination_id: str
    question: str
    details: Optional[str] = None

class QuestionResponse(BaseModel):
    id: str
    destination_id: str
    question: str
    details: Optional[str] = None
    asked_by: str
    asked_avatar: Optional[str] = None
    asked_timestamp: str
    upvotes: int
    status: str
    answers_count: Optional[int] = 0
    answers: Optional[List[AnswerResponse]] = []
    class Config:
        from_attributes = True

# Trip Group Schemas
class TripGroupCreate(BaseModel):
    destination_id: str
    destination_name: str
    title: str
    dates: str
    budget: str
    max_members: int = 6
    interests: Optional[List[str]] = []
    description: str

class TripGroupResponse(BaseModel):
    id: str
    destination_id: str
    destination_name: str
    title: str
    dates: str
    budget: str
    members_count: int
    max_members: int
    organizer: Optional[Dict[str, Any]] = None
    members: Optional[List[Dict[str, Any]]] = None
    interests: Optional[List[str]] = None
    description: str
    status: str
    itinerary_summary: Optional[List[str]] = None
    class Config:
        from_attributes = True

# AI Schemas
class AIChatRequest(BaseModel):
    prompt: str
    destination_id: Optional[str] = "ooty"
    context: Optional[Dict[str, Any]] = {}

class AIChatResponse(BaseModel):
    response: str
    citations: List[str] = []
    timestamp: str

class AIItineraryRequest(BaseModel):
    destination_id: str = "ooty"
    days: int = 2
    travel_type: str = "Family"
    interests: List[str] = []
    budget: str = "Moderate"
