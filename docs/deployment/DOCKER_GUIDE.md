# Docker & Containerization Guide
**Target**: DevOps Engineers, System Architects

This project is fully containerized to ensure **Environment Parity**. Whether the app runs on a developer's laptop or a Kubernetes cluster, the behavior remains identical.

---

## 🐳 Architecture Overview

We use a **Multi-Container Orchestration** approach via `docker-compose`.

### Container Breakdown
1. **`server`**: Python 3.11-slim image containing the FastAPI backend.
2. **`client`**: Multi-stage build (Node.js $\to$ Nginx) to serve the production-built React app.
3. **`mongo`**: Official MongoDB image for data persistence.

---

## 🚀 Quick Start (The "One-Command" Launch)

If you have Docker and Docker Compose installed, you can launch the entire ecosystem with a single command:

```bash
docker-compose up --build
```

### What happens under the hood?
1. **Network Creation**: A virtual bridge network is created for containers to communicate.
2. **Volume Mapping**: The `/data/db` folder in the Mongo container is mapped to the local disk, ensuring data survives container restarts.
3. **Dependency Sequencing**: The `server` waits for `mongo` to be healthy before starting.
4. **Port Mapping**:
   - Frontend $\to$ `http://localhost:80`
   - Backend $\to$ `http://localhost:5000`
   - MongoDB $\to$ `localhost:27017`

---

## 🛠️ Advanced DevOps Commands

### Viewing Logs
To watch the AI la- lala logic in real-time:
```bash
docker-compose logs -f server
```

### Resetting the Database
To wipe all property data and start fresh:
```bash
docker-compose down -v
docker-compose up --build
```

### Scaling the Backend
To spin up multiple instances of the API for load testing:
```bash
docker-compose up --scale server=3
```

---

## 📉 Resource Allocation
- **CPU Limit**: 0.5 vCPU per container (Recommended).
- **Memory Limit**: 512MB RAM for Backend, 256MB for Frontend.
- **Storage**: Persistent Volume for MongoDB.
