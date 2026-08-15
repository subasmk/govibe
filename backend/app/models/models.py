from sqlalchemy import Column, Integer, String, Text, Float, Boolean, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    handle = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=True)
    avatar = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    badge = Column(String(50), default="Explorer")
    points = Column(Integer, default=100)
    helpful_votes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="user")
    questions = relationship("Question", back_populates="author")
    answers = relationship("Answer", back_populates="author")

class Destination(Base):
    __tablename__ = "destinations"
    
    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    state = Column(String(50), nullable=False)
    tagline = Column(String(200), nullable=True)
    cover_image = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    trust_score = Column(Integer, default=90)
    trust_breakdown = Column(JSON, nullable=True)
    rating = Column(Float, default=4.5)
    total_ratings = Column(Integer, default=0)
    members_count = Column(Integer, default=1000)
    active_now = Column(Integer, default=20)
    categories = Column(JSON, nullable=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    places = relationship("Place", back_populates="destination")
    posts = relationship("Post", back_populates="destination")
    safety_reports = relationship("SafetyReport", back_populates="destination")
    questions = relationship("Question", back_populates="destination")
    trip_groups = relationship("TripGroup", back_populates="destination")

class Place(Base):
    __tablename__ = "places"
    
    id = Column(String(50), primary_key=True, index=True)
    destination_id = Column(String(50), ForeignKey("destinations.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    location = Column(String(150), nullable=True)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    rating = Column(Float, default=4.5)
    recent_rating = Column(Float, default=4.6)
    total_ratings = Column(Integer, default=0)
    trust_score = Column(Integer, default=90)
    status = Column(String(20), default="green") # green, yellow, red, blue
    status_text = Column(String(100), nullable=True)
    cover_image = Column(String(255), nullable=True)
    gallery = Column(JSON, nullable=True)
    description = Column(Text, nullable=True)
    timings = Column(String(100), nullable=True)
    entry_fee = Column(String(100), nullable=True)
    current_crowd = Column(String(20), default="Low")
    best_time_to_visit = Column(String(100), nullable=True)
    family_suitability = Column(Integer, default=90)
    accessibility = Column(String(100), nullable=True)
    safety_observations = Column(Text, nullable=True)
    recent_experiences_count = Column(Integer, default=0)
    latest_report = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    destination = relationship("Destination", back_populates="places")
    posts = relationship("Post", back_populates="place")

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(String(50), primary_key=True, index=True)
    destination_id = Column(String(50), ForeignKey("destinations.id"), nullable=False)
    place_id = Column(String(50), ForeignKey("places.id"), nullable=True)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=False)
    visited_timestamp = Column(String(50), nullable=False) # e.g. "Visited 2 days ago"
    visit_date = Column(String(50), nullable=True)
    rating = Column(Float, default=5.0)
    crowd_level = Column(String(20), default="Low")
    is_outdated = Column(Boolean, default=False)
    outdated_notice = Column(String(200), nullable=True)
    content = Column(Text, nullable=False)
    images = Column(JSON, nullable=True)
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)
    tags = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    author = relationship("User", back_populates="posts")
    destination = relationship("Destination", back_populates="posts")
    place = relationship("Place", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(String(50), primary_key=True, index=True)
    post_id = Column(String(50), ForeignKey("posts.id"), nullable=False)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=False)
    text = Column(Text, nullable=False)
    upvotes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    post = relationship("Post", back_populates="comments")
    user = relationship("User", back_populates="comments")

class SafetyReport(Base):
    __tablename__ = "safety_reports"
    
    id = Column(String(50), primary_key=True, index=True)
    destination_id = Column(String(50), ForeignKey("destinations.id"), nullable=False)
    place_name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    severity = Column(String(20), default="warning") # info, warning, danger
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    reported_by = Column(String(100), nullable=False)
    reported_timestamp = Column(String(50), default="Reported recently")
    verified_count = Column(Integer, default=1)
    status = Column(String(20), default="Active")
    resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    destination = relationship("Destination", back_populates="safety_reports")

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(String(50), primary_key=True, index=True)
    destination_id = Column(String(50), ForeignKey("destinations.id"), nullable=False)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=True)
    question = Column(String(255), nullable=False)
    details = Column(Text, nullable=True)
    asked_by = Column(String(100), nullable=False)
    asked_avatar = Column(String(255), nullable=True)
    asked_timestamp = Column(String(50), default="Recently")
    upvotes = Column(Integer, default=0)
    status = Column(String(20), default="Unanswered")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    author = relationship("User", back_populates="questions")
    destination = relationship("Destination", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")

class Answer(Base):
    __tablename__ = "answers"
    
    id = Column(String(50), primary_key=True, index=True)
    question_id = Column(String(50), ForeignKey("questions.id"), nullable=False)
    user_id = Column(String(50), ForeignKey("users.id"), nullable=True)
    answered_by = Column(String(100), nullable=False)
    answerer_avatar = Column(String(255), nullable=True)
    answerer_badge = Column(String(50), nullable=True)
    text = Column(Text, nullable=False)
    upvotes = Column(Integer, default=0)
    is_accepted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    question = relationship("Question", back_populates="answers")
    author = relationship("User", back_populates="answers")

class TripGroup(Base):
    __tablename__ = "trip_groups"
    
    id = Column(String(50), primary_key=True, index=True)
    destination_id = Column(String(50), ForeignKey("destinations.id"), nullable=False)
    destination_name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    dates = Column(String(100), nullable=False)
    budget = Column(String(50), nullable=False)
    members_count = Column(Integer, default=1)
    max_members = Column(Integer, default=6)
    organizer = Column(JSON, nullable=True)
    members = Column(JSON, nullable=True)
    interests = Column(JSON, nullable=True)
    description = Column(Text, nullable=False)
    status = Column(String(20), default="Open")
    itinerary_summary = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    destination = relationship("Destination", back_populates="trip_groups")

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(String(50), primary_key=True, index=True)
    type = Column(String(30), default="general")
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    timestamp = Column(String(50), default="Just now")
    read = Column(Boolean, default=False)
    link = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
