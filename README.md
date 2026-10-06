<div align="center">

# GoVIBE

**Know the place before you explore.**

A community-powered travel app that tells you what a destination is like *right now*, from travellers who were there recently.

![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-0f172a?style=flat-square&logo=tailwindcss&logoColor=38bdf8) ![Gemini](https://img.shields.io/badge/Gemini_AI-1a73e8?style=flat-square&logo=googlegemini&logoColor=white)

</div>

---

## The problem

Travellers find out the real situation only after they arrive: fog on the road, a crowded viewpoint, a parking queue, a scam. Reviews are old and scattered. GoVIBE collects fresh, local experience in one place.

## Features

- **Destination communities** for Ooty, Coorg, Munnar, Kodaikanal, Pondicherry and Chennai, with member counts, active travellers and trust ratings.
- **Fresh experiences first.** Every post shows how recently it was written, and old posts get a freshness warning.
- **Community map.** Colour-coded markers: green for highly recommended, yellow for mixed, red for recent concerns or crowds, blue for popular spots.
- **Trust score** out of 100, worked out from recent visits, upvotes, ratings and local guides.
- **Peer safety reports** for road detours, parking queues and weather, confirmed by other travellers.
- **Trip groups** with shared budgets, dates and a discussion wall.
- **Ask GoVIBE.** An AI assistant that answers from community posts and plans itineraries, with reasons.

## Built with

| Part | Tools |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Leaflet maps |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic |
| Data | PostgreSQL in production, SQLite locally |
| AI | Google Gemini with a grounded fallback |
| Hosting | Vercel (frontend), AWS (backend) |

20 responsive pages, 8 API route groups.

## Status

A working full-stack build by [Subash M K](https://github.com/subasmk). Frontend and backend live in `frontend/` and `backend/`.

<details>
<summary>Run it locally</summary>

```bash
cd frontend && npm install && npm run dev
cd backend && pip install -r requirements.txt && python run.py
```

</details>
