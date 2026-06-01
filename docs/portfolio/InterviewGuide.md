# INTERVIEW PREPARATION GUIDE: THE STAFF ENGINEER/PM DEFENSE
**Target Roles:** AI Product Manager / Technical PM / Staff AI Engineer
**Focus:** Defending Architectural and Product Decisions.

---

## 🧩 The "Hard" Questions & The "Elite" Answers

### 1. "Why did you use a hybrid regex/keyword extractor instead of a full LLM for the intent extraction?"
**The Elite Answer**: "In an enterprise real estate context, **Precision is more valuable than Fluency**. LLMs can hallucinate budget numbers or locations. For the MVP, I prioritized 'Strict Grounding.' I used the AI for the *conversational wrapping* but used a deterministic extractor for the *filter parameters*. This ensures $100\%$ accuracy in the property search, which is the primary trust-driver for the user."

### 2. "Why MongoDB? Why not a relational database like PostgreSQL?"
**The Elite Answer**: "Real estate data is inherently semi-structured. Amenities (e.g., 'Pool', 'Smart Home', 'EV Charging') vary wildly between properties. Using a document store allowed for **Schema Flexibility**. I could implement a 'Unified Property Document' without the overhead of complex join tables, which reduced our API latency and allowed us to iterate on the data model without downtime."

### 3. "How does your system handle the 'Zero Results' state?"
**The Elite la nswer**: "I treated 'Zero Results' as a UX failure. Instead of a dead-end, I implemented a **'Near-Match' Logic**. The system identifies which constraint is the 'blocker' (usually budget) and suggests the closest alternative. This keeps the user in the funnel and maintains the conversation flow, which is critical for our North Star Metric (S-PMR)."

### 4. "If you had to scale this to 10 million properties, what would break first?"
**The Elite Answer**: "The current linear scan of MongoDB would become a bottleneck. To scale, I would introduce two things:
1. **Elasticsearch/OpenSearch**: For high-performance geo-spatial and text search.
2. **Vector Embeddings**: I would move from keyword matching to **Semantic Search** using an embedding model (like `text-embedding-3-small`), allowing users to search for 'vibes' (e.g., 'cozy cottage') rather than just '2 bedrooms'."

### 5. "How did you ensure the security of the API?"
**The Elite Answer**: "I implemented a defense-in-depth strategy. At the edge, I used **Helmet.js** for secure headers and **Express-Rate-Limit** to prevent DoS. At the application layer, I used **Zod** for strict type validation of all request bodies, effectively neutralizing NoSQL injection attempts by ensuring only expected types reach the database query."

---

## 🚀 Key Narrative Hooks to Use in Interviews
- **"The North Star"**: Talk about S-PMR (Successful Property Match Rate). It shows you think about business value, not just code.
- **"Decoupled Intelligence"**: Mention that the AI layer is separate from the Data layer. This shows you understand maintainability and future-proofing.
- **"Data-Sourced Design"**: Explain that the UI was born from the Data Analysis report, not just a random mockup. This demonstrates a data-driven product mindset.
