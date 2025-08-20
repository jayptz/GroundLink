# 🌍 GroundLink

AI-powered field operations assistant for infrastructure monitoring, hazard reporting, and real-time task coordination.

---

## 📌 Overview

**GroundLink** is an AI-enabled field operations platform that connects field workers, managers, and automated systems in real time.

**Problem:** Traditional infrastructure monitoring and field reporting systems are fragmented, slow, and heavily manual. This leads to delayed responses, missed hazards, and inefficient coordination.

**Solution:** GroundLink acts as an **AI agent** that processes field data (jobs, photos, hazard logs), provides intelligent insights, and automates coordination.

With AI integration, GroundLink can:

- 🧠 **Analyze photos & reports** to detect hazards or missing info  
- ✍️ **Generate summaries** for field updates and reports  
- ⚡ **Provide recommendations** for job prioritization and routing  
- 🔔 **Trigger alerts** for high-risk situations  

---

## 🛠 Tech Stack

**Frontend**
- Next.js 14 (App Router)  
- Tailwind CSS v4  
- [shadcn/ui](https://ui.shadcn.com/) for UI primitives  
- [Magic UI](https://magicui.design/) for advanced patterns  
- Leaflet for mapping  

**Backend**
- FastAPI (Python)  
- Supabase (Auth + Database)  
- PostgreSQL  
- S3 / Supabase Storage for photo uploads  

**AI**
- OpenAI API (LLM + Vision)  
- Hazard detection, summaries, and recommendations  

---

## 🚀 Features

- 🔐 Login & Signup (via Supabase Auth)  
- 📋 Job Management: Create, assign, update, and close jobs  
- 🤖 AI Insights: Auto-summary + photo analysis  
- 📸 Photo Uploads: Field workers upload evidence to jobs  
- 🔄 Real-Time Updates: Managers see instant job status  
- 📊 Dashboard Analytics: AI-driven metrics & KPIs  

---

## 📂 Project Structure

---

## 📊 Example AI Workflow

1. Worker uploads photo → AI scans for hazards  
2. AI generates job summary → attaches to job card  
3. Dashboard shows priority-ranked jobs with insights  
4. The manager can assign, escalate, or close jobs in real time  

---

