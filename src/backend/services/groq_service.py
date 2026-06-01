import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class GroqAI:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            print("⚠️ GROQ_API_KEY not found in environment variables.")
        self.client = Groq(api_key=self.api_key) if self.api_key else None

    def extract_intent(self, user_message: str):
        """
        Uses Llama-3 via Groq to extract structured filters from a natural language query.
        """
        if not self.client:
            return None

        prompt = f"""
        You are a real estate data extractor. Extract the following filters from the user message:
        - location (City, State)
        - maxPrice (Number in USD)
        - bedrooms (Number)
        - bathrooms (Number)

        User Message: "{user_message}"

        Return ONLY a JSON object. If a value is missing, use null.
        Example: {{"location": "New York", "maxPrice": 500000, "bedrooms": 3, "bathrooms": 2}}
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192",
                response_format={"type": "json_object"}
            )
            import json
            return json.loads(chat_completion.choices[0].message.content)
        except Exception as e:
            print(f"Groq Error: {e}")
            return None

    def generate_concierge_response(self, filters: dict, properties: list):
        """
        Turns raw property data into a high-end, professional concierge response.
        """
        if not self.client:
            return "I found some properties for you, but my AI brain is currently offline."

        properties_text = "\n".join([f"- {p['title']} in {p['location']} for ${p['price']:,}" for p in properties])

        prompt = f"""
        You are a luxury real estate concierge. Based on these filters: {filters}
        and these found properties:
        {properties_text}

        Write a sophisticated, helpful, and concise response.
        If no properties were found, apologize and suggest alternatives.
        Keep it professional and alluring.
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama3-8b-8192"
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            print(f"Groq Error: {e}")
            return "I've found some options for you. Please check the cards below!"
