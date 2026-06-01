# Deployment Strategy Overview
**Project:** AI Real Estate Concierge
**Target Audience:** Technical Leaders, DevOps Engineers, Executive Stakeholders

## 🌐 Architectural Deployment Model
This project employs a **Three-Tier Cloud Architecture** to ensure high availability, scalability, and a professional separation of concerns.

### The Infrastructure Map
1. **Client Layer (Frontend)**: Hosted on **Vercel**. Optimized for global delivery via CDN, providing the lowest possible latency for the end-user.
2. **Logic Layer (Backend)**: Hosted on **Render**. A Python-based FastAPI environment that handles intent extraction, business logic, and AI orchestration.
3. **Data Layer (Database)**: Hosted on **MongoDB Atlas**. A distributed NoSQL cluster ensuring data persistence, high availability, and rapid query execution.

---

## 🚀 Deployment Options

We provide three distinct deployment paths based on the target environment:

### 1. Local Development (Offline)
**Purpose**: Rapid prototyping and internal testing.
**Method**: Local installation of Python, Node.js, and MongoDB.
**Guide**: See [LOCAL_SETUP.md](./LOCAL_SETUP.md)

### 2. Cloud Production (Online)
**Purpose**: Public portfolio, client demos, and production usage.
**Method**: Managed cloud services (Vercel $\rightarrow$ Render $\rightarrow$ Atlas).
**Guide**: See [CLOUD_DEPLOYMENT.md](./CLOUD_DEPLOYMENT.md)

### 3. Containerized Orchestration (DevOps)
**Purpose**: Environment parity and enterprise-grade scalability.
**Method**: Docker & Docker Compose.
**Guide**: See [DOCKER_GUIDE.md](./DOCKER_GUIDE.md)

---

## 🛡️ Security & Reliability
- **Secrets Management**: No API keys are stored in the codebase. We utilize `.env` files locally and "Environment Secret" managers in the cloud.
- **SLA**: By using managed services (Vercel/Atlas), we achieve an estimated **99.9% uptime**.
- **Scale**: The backend is stateless, allowing for horizontal scaling via Load Balancers if traffic increases.
