from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.chat_service import ChatService
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Real Estate Concierge API")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_service = ChatService()

class ChatRequest(BaseModel):
    message: str
    sessionId: str = "guest"

@app.get("/health")
async def health_check():
    return {"status": "UP", "engine": "FastAPI (Python)"}

@app.post("/api/chat")
async def handle_chat(request: ChatRequest):
    try:
        # 1. Extract Intent
        filters = chat_service.extract_intent(request.message)

        if not filters:
            return {
                "text": "I'd love to help you find a home! Could you tell me your preferred location and budget? (e.g., 'I'm looking for something in New York under 600k')",
                "properties": []
            }

        # 2. Query Database
        properties = chat_service.find_properties(filters)

        # MongoDB returns _id as ObjectId, which is not JSON serializable. Convert to string.
        for p in properties:
            p['_id'] = str(p['_id'])
            # Rename _id to propertyId for frontend consistency
            p['propertyId'] = p.get('propertyId', p['_id'])

        # 3. Generate Response
        text = chat_service.generate_response(filters, properties)

        return {
            "text": text,
            "properties": properties,
            "extractedFilters": filters
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/properties/save")
async def save_property(data: dict):
    # Simplified for MVP: Mock saving to DB
    return {"success": True, "message": "Property saved to favorites!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
