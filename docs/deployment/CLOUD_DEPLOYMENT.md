# Cloud Deployment Guide (Online)
**Target**: Product Owners, DevOps Engineers, and Stakeholders

This guide describes the professional deployment of the AI Real Estate Concierge to a public-facing production environment using a **Modern SaaS Stack**.

---

## ☁️ The Cloud Infrastructure Stack

| Layer | Service | Purpose |
| :--- | :--- | :--- |
| **Database** | **MongoDB Atlas** | Managed NoSQL Cloud Cluster. |
| **Backend** | **Render** | Auto-deploying Python (FastAPI) Web Service. |
| **Frontend** | **Vercel** | Edge-optimized React Hosting. |

---

## 🚀 Step-by-Step Deployment Process

### Step 1: Data Layer (MongoDB Atlas)
1. **Create Cluster**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free shared cluster.
2. **Network Security**: In "Network Access," add an IP entry for `0.0.0.0/0` (Allows the Render backend to connect).
3. **Database Access**: Create a user with `readWriteAnyDatabase` permissions.
4. **Connection String**: Copy the URI (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/...`).

### Step 2: Logic Layer (Render)
1. **Link GitHub**: Connect your account and select the `Real-Estate-ChatBot` repository.
2. **Service Config**:
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r src/backend/requirements.txt`
   - **Start Command**: `uvicorn src.backend.main:app --host 0.0.0.0 --port 10000`
3. **Environment Variables**: Add the following in the "Environment" tab:
   - `MONGODB_URI` $\rightarrow$ Your Atlas Connection String.
   - `GROQ_API_KEY` $\rightarrow$ Your Groq API Key.
   - `PORT` $\rightarrow$ `10000`

### Step 3: Presentation Layer (Vercel)
1. **Import Project**: Connect GitHub and import the repository.
2. **Project Settings**:
   - **Root Directory**: `src/client`
   - **Framework Preset**: `Vite`
3. **Environment Variables**:
   - `VITE_API_URL` $\rightarrow$ `https://your-backend-service.onrender.com/api`
4. **Deploy**: Click "Deploy" to push the frontend to the global edge network.

---

## 🛠️ Critical Validation Checklist
- [ ] **Cold Start**: Render's free tier sleeps after inactivity. The first request may take 30s to wake up.
- [ ] **CORS Policy**: The backend is configured with `allow_origins=["*"]`, enabling seamless communication between Vercel and Render.
- [ ] **Data Seed**: Remember to run `python src/backend/config/seed.py` locally once with the Atlas URI to populate the cloud database before the first user visit.

---

## 📈 Scalability Path
To move from "Portfolio" to "Enterprise" scale, we can upgrade to:
- **Redis Caching**: To store frequent queries and reduce LLM costs.
- **S3 Buckets**: To host property images instead of external URLs.
- **Auth0/Clerk**: To implement secure user login and "Saved Properties" accounts.
