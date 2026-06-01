# Local Setup Guide (Offline)
**Target**: Developers and Internal Reviewers

This guide outlines the steps to get the AI Real Estate Concierge running on a local workstation.

## 🛠️ Prerequisites
Ensure the following are installed:
- **Python 3.10+**
- **Node.js v18+**
- **MongoDB Community Server** (Running on `localhost:27017`)
- **Git**

---

## 🚀 Installation Steps

### 1. Backend Configuration
```bash
# Navigate to the backend directory
cd src/backend

# Install Python dependencies
pip install -r requirements.txt

# Configure Environment
# Create a .env file in src/backend/ and add:
# MONGODB_URI=mongodb://localhost:27017/realestate
# GROQ_API_KEY=your_api_key_here
```

### 2. Database Seeding
Before running the server, you must merge the fragmented JSON data into MongoDB:
```bash
# From src/backend
python config/seed.py
```
*This script validates and merges Property Basics, Characteristics, and Images into a unified collection.*

### 3. Launching the Server
```bash
# Start the FastAPI server
python main.py
```
**Verification**: Visit `http://localhost:8000/health`. You should see `{"status": "UP"}`.

---

### 4. Frontend Configuration
```bash
# Navigate to the client directory
cd src/client

# Install JS dependencies
npm install

# Start the development server
npm run dev
```
**Verification**: Open your browser to `http://localhost:5173`.

---

## ❓ Troubleshooting
- **MongoDB Connection Error**: Ensure the MongoDB service is running in the background.
- **API Connection Error**: Ensure the backend is started *before* the frontend.
- **AI Not Responding**: Check if the `GROQ_API_KEY` is correct in the `.env` file.
