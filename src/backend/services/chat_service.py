import re
from typing import Dict, Any, List
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from services.groq_service import GroqAI

load_dotenv()

class ChatService:
    def __init__(self):
        self.client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
        self.db = self.client['realestate']
        self.collection = self.db['properties']
        self.ai = GroqAI()

    def extract_intent(self, message: str) -> Dict[str, Any]:
        # Try AI first for high-precision natural language understanding
        ai_filters = self.ai.extract_intent(message)
        if ai_filters:
            # Normalize keys to match internal logic
            return {
                'maxPrice': ai_filters.get('maxPrice'),
                'location': ai_filters.get('location'),
                'bedrooms': ai_filters.get('bedrooms'),
                'bathrooms': ai_filters.get('bathrooms'),
            }

        # Fallback to Regex for stability if AI is offline/fails
        text = message.lower()
        filters = {}
        budget_match = re.search(r'under\s*(\d+)\s*k?|max\s*(\d+)\s*k?|below\s*(\d+)\s*k?', text)
        if budget_match:
            val = budget_match.group(1) or budget_match.group(2) or budget_match.group(3)
            filters['maxPrice'] = int(val) * 1000 if 'k' in text or 'thousand' in text else int(val)
        loc_match = re.search(r'in\s+([a-z\s,]+)(?=\s+under|\s+with|\s+and|$)', text)
        if loc_match:
            filters['location'] = loc_match.group(1).strip()
        bed_match = re.search(r'(\d+)\s*(?:bhk|bedroom|bed)', text)
        if bed_match:
            filters['bedrooms'] = int(bed_match.group(1))
        bath_match = re.search(r'(\d+)\s*(?:bathroom|bath)', text)
        if bath_match:
            filters['bathrooms'] = int(bath_match.group(1))

        return filters

    def find_properties(self, filters: Dict[str, Any]) -> List[Dict]:
        query = {}
        if filters.get('maxPrice'):
            query['price'] = {'$lte': filters['maxPrice']}
        if filters.get('location'):
            query['location'] = {'$regex': filters['location'], '$options': 'i'}
        if filters.get('bedrooms'):
            query['specs.bedrooms'] = filters['bedrooms']
        if filters.get('bathrooms'):
            query['specs.bathrooms'] = filters['bathrooms']

        return list(self.collection.find(query))

    def generate_response(self, filters: Dict[str, Any], properties: List[Dict]) -> str:
        # Use AI for high-end concierge response
        ai_response = self.ai.generate_concierge_response(filters, properties)
        if ai_response:
            return ai_response

        # Fallback response
        if not properties:
            return "I couldn't find any properties that match all your criteria. Would you like to try increasing your budget or changing the location?"
        return f"I found {len(properties)} properties that match your preferences!"
