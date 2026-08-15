import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database.session import engine, Base
from app.database.seed import seed_database

# Routers
from app.routes.auth import router as auth_router
from app.routes.destinations import router as destinations_router
from app.routes.places import router as places_router
from app.routes.posts import router as posts_router
from app.routes.questions import router as questions_router
from app.routes.safety import router as safety_router
from app.routes.groups import router as groups_router
from app.routes.ai import router as ai_router
from app.routes.uploads import router as uploads_router

# Initialize FastAPI App
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="GoVIBE API: Know the place before you explore. Community-driven travel backend."
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows frontend on localhost:5173, Vercel, or custom domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables & Seed Initial Records on Startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    try:
        seed_database()
    except Exception as e:
        print(f"[Seed Notice] {e}")

# Static uploads directory
uploads_dir = os.path.join(os.path.dirname(__file__), "static", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include Routers
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(destinations_router, prefix=settings.API_PREFIX)
app.include_router(places_router, prefix=settings.API_PREFIX)
app.include_router(posts_router, prefix=settings.API_PREFIX)
app.include_router(questions_router, prefix=settings.API_PREFIX)
app.include_router(safety_router, prefix=settings.API_PREFIX)
app.include_router(groups_router, prefix=settings.API_PREFIX)
app.include_router(ai_router, prefix=settings.API_PREFIX)
app.include_router(uploads_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "app": "GoVIBE API",
        "tagline": "Know the place before you explore",
        "status": "healthy",
        "docs": "/docs"
    }
