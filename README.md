# GroundLink — AI-Powered Field Operations Platform

**GroundLink** is a real-time, AI-assisted platform for managing geographically distributed fieldwork (inspections, repairs, audits). Supervisors assign and monitor jobs on a live map; workers check in, upload photos, and update status from mobile. AI analyzes photos for hazards, prioritizes jobs, and generates weekly reports.

## ✨ Highlights
- **Live map ops**: React-Leaflet + PostGIS
- **Realtime updates**: Socket.IO events for job and photo changes
- **AI analysis**: Detect defects/hazards in uploaded images
- **Smart prioritization**: Jobs ranked by urgency & impact
- **Automated reports**: Weekly summaries with insights & actions
- **Cloud-native**: Docker, Kubernetes (EKS), Terraform, CI/CD

---

## 🧱 Architecture
- **Frontend**: Next.js (App Router), Tailwind, React-Leaflet, SWR
- **Backend**: FastAPI, SQLAlchemy, Socket.IO
- **Data**: PostgreSQL + PostGIS
- **Storage**: AWS S3 (photos)
- **AI**: AWS Rekognition or OpenAI Vision + LangChain (reports)
- **Auth**: JWT (or Supabase Auth optional)
- **Infra**: Docker, Kubernetes (EKS), Terraform, GitHub Actions/Jenkins

