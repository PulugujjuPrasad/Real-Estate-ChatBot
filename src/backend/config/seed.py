import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def seed_database():
    try:
        MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
        client = MongoClient(MONGODB_URI)
        db = client['realestate']
        collection = db['properties']

        # Paths to raw data
        basics_path = 'Case Study 3 JSON 1 (1).txt'
        chars_path = 'Case Study 3 JSON 2.txt'
        imgs_path = 'Case Study 3 JSON 3.txt'

        # Load data
        with open(basics_path, 'r') as f: basics = json.load(f)
        with open(chars_path, 'r') as f: characteristics = json.load(f)
        with open(imgs_path, 'r') as f: images = json.load(f)

        print("📦 Loading and merging data...")

        unified_properties = []
        for b in basics:
            char = next((c for c in characteristics if c['id'] == b['id']), None)
            img = next((i for i in images if i['id'] == b['id']), None)

            if not char or not img:
                print(f"⚠️ Data inconsistency found for ID {b['id']}. Skipping...")
                continue

            unified_properties.append({
                "propertyId": b['id'],
                "title": b['title'],
                "price": b['price'],
                "location": b['location'],
                "specs": {
                    "bedrooms": char['bedrooms'],
                    "bathrooms": char['bathrooms'],
                    "sizeSqft": char['size_sqft'],
                    "amenities": char['amenities'],
                },
                "media": {
                    "imageUrl": img['image_url'],
                }
            })

        # Clear and insert
        collection.delete_many({})
        collection.insert_many(unified_properties)
        print(f"🚀 Successfully seeded {len(unified_properties)} properties into MongoDB!")

    except Exception as e:
        print(f"❌ Seeding failed: {e}")

if __name__ == "__main__":
    seed_database()
