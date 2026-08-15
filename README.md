# GoVIBE 🧭
> **"Know the place before you explore."**

GoVIBE is a modern, community-powered travel web application built to solve the real problem travellers face *after* reaching a destination: understanding **what the place is like right now** based on recent visits, real-time crowd observations, safety alerts, community trust scores, and AI recommendations.

---

## 🌟 Core Features

1. **Destination Community**: Dedicated hubs for destinations (Ooty, Coorg, Munnar, Kodaikanal, Pondicherry, Chennai) featuring member stats, active traveller counts, and trust ratings.
2. **Recent Experience System**: Timestamps with freshness decay indicators (*"Visited 2 days ago"* vs warning notices on 2-year old posts).
3. **Interactive Community Map**: Color-coded markers for places:
   - 🟢 **Green**: Highly Recommended
   - 🟡 **Yellow**: Mixed Experiences / Fog Delays
   - 🔴 **Red**: Recent Community Concerns / High Crowd
   - 🔵 **Blue**: Popular Tourist Spots
4. **Community Trust Score (e.g. 92/100)**: Transparent metric calculated from recent visits, upvotes, ratings, and local guides.
5. **Peer Safety Reports**: Real-time road detours, parking queues, and weather hazards with traveller confirmation counts.
6. **Trip Groups & Co-Travellers**: Join or create trip groups with shared budgets, dates, and live group discussion walls.
7. **Ask GoVIBE AI & Itinerary Planner**: Grounded AI assistant that synthesizes community logs into explainable recommendations.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6, Lucide Icons, Leaflet / React-Leaflet
- **Backend**: Python 3.11, FastAPI, SQLAlchemy ORM, Pydantic v2, Uvicorn
- **Database**: PostgreSQL (Production) / SQLite (Zero-config local development)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) with grounded fallback
- **Storage**: AWS S3 with local multipart upload fallback
- **Deployment**: AWS (Backend - App Runner / EC2) & Vercel (Frontend)

---

## 📁 Project Structure

```
d:/sih/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       (Navbar, Sidebar, BottomNav, Button, Input, Modal, Rating, TrustScore, UserAvatar, Badge)
│   │   │   ├── cards/        (DestinationCard, PlaceCard, ExperienceCard, SafetyReportCard, QuestionCard, TripGroupCard, ItineraryCard, NotificationItem)
│   │   │   ├── map/          (CommunityMap)
│   │   │   ├── post/         (CommentSection, PostCreatorModal)
│   │   │   └── ai/           (AIChatModal)
│   │   ├── context/          (AuthContext, SavedContext, NotificationContext, DestinationContext)
│   │   ├── data/             (sampleData.js)
│   │   ├── pages/            (20 distinct responsive pages)
│   │   ├── layouts/          (MainLayout, AuthLayout)
│   │   ├── services/         (api.js, aiService.js)
│   │   ├── index.css
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env.example
├── backend/
│   ├── app/
│   │   ├── database/         (session.py, seed.py)
│   │   ├── models/           (models.py - User, Destination, Place, Post, SafetyReport, Question, TripGroup)
│   │   ├── schemas/          (schemas.py)
│   │   ├── routes/           (destinations, places, posts, questions, safety, groups, ai, uploads)
│   │   ├── services/         (gemini_service.py, storage_service.py)
│   │   ├── config.py
│   │   └── main.py
│   ├── deploy/               (aws-apprunner.yaml, nginx.conf, govibe.service)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   ├── run.py
│   └── .env.example
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### 2. Run Backend (FastAPI)
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# Linux / Mac:
# source venv/bin/activate

pip install -r requirements.txt
python run.py
```
Backend runs at **http://localhost:8000** with interactive Swagger documentation at **http://localhost:8000/docs**.

---

## ☁️ Deployment on AWS (Option 1)

### Method A: AWS App Runner (Recommended Serverless Container)
1. Push your repository to GitHub.
2. In AWS Console, navigate to **AWS App Runner** → Click **Create an App Runner service**.
3. Select **Source code repository** → Connect your GitHub repo.
4. Set **Build Settings**:
   - Configuration file: Use `backend/deploy/aws-apprunner.yaml` (or configure via console: Python 3, Build: `pip install -r requirements.txt`, Start: `uvicorn app.main:app --host 0.0.0.0 --port 8000`).
5. Add Environment Variables:
   - `DATABASE_URL`: Your AWS RDS PostgreSQL connection string.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `CORS_ORIGINS`: `https://your-frontend.vercel.app`
6. Click **Deploy**. App Runner provisions automatic HTTPS and auto-scales on traffic.

### Method B: AWS EC2 (Virtual Machine)
1. Launch an Ubuntu 22.04 LTS instance and connect via SSH.
2. Install Python, Git, and Nginx:
   ```bash
   sudo apt update && sudo apt install python3-pip python3-venv nginx git -y
   ```
3. Clone repository and set up backend:
   ```bash
   git clone <repo-url>
   cd sih/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Copy systemd service:
   ```bash
   sudo cp deploy/govibe.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now govibe
   ```
5. Copy Nginx configuration:
   ```bash
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/govibe
   sudo ln -s /etc/nginx/sites-available/govibe /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

---

## 🌐 Frontend Deployment on Vercel

1. Push code to GitHub.
2. Open **Vercel** → Click **Add New Project** → Select your repository.
3. Set **Root Directory** to `frontend`.
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-apprunner.awsapprunner.com/api`
5. Click **Deploy**.
