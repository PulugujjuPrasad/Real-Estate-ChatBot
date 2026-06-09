const Property = require('../models/Property'); // Note: We need to create the model file

/**
 * ChatService handles the intelligence layer of the chatbot.
 * It transforms natural language into structured MongoDB queries.
 */
class ChatService {
  /**
   * Extracts key filters from a user's natural language message.
   * @param {string} message - The raw user input.
   * @returns {Object} Extracted filters { budget, location, bedrooms, bathrooms }
   */
  async extractIntent(message) {
    const text = message.toLowerCase();
    const filters = {};

    // 1. Budget Extraction (e.g., "under 500k", "max 1 million")
    const budgetMatch = text.match(/under\s*(\d+)\s*k?|max\s*(\d+)\s*k?|below\s*(\d+)\s*k?/);
    if (budgetMatch) {
      let val = budgetMatch[1] || budgetMatch[2] || budgetMatch[3];
      // Convert 'k' to thousands
      filters.maxPrice = text.includes('k') ? parseInt(val) * 1000 : parseInt(val);
    }

    // 2. Location Extraction (e.g., "in New York", "Miami")
    // Simple heuristic: words following "in " or "at "
    const locationMatch = text.match(/in\s+([a-z\s,]+)(?=\s+under|\s+with|\s+and|$)/);
    if (locationMatch) {
      filters.location = locationMatch[1].trim();
    }

    // 3. Bedroom Extraction (e.g., "3BHK", "3 bedroom", "3 bed")
    const bedMatch = text.match(/(\d+)\s*(?:bhk|bedroom|bed)/);
    if (bedMatch) {
      filters.bedrooms = parseInt(bedMatch[1]);
    }

    // 4. Bathroom Extraction
    const bathMatch = text.match(/(\d+)\s*(?:bathroom|bath)/);
    if (bathMatch) {
      filters.bathrooms = parseInt(bathMatch[1]);
    }

    return filters;
  }

  /**
   * Executes a search against the property database based on extracted filters.
   */
  async findProperties(filters) {
    const query = {};

    if (filters.maxPrice) {
      query.price = { $lte: filters.maxPrice };
    }

    if (filters.location) {
      // Use a case-insensitive regex for location flexibility
      query.location = { $regex: filters.location, $options: 'i' };
    }

    if (filters.bedrooms) {
      query['specs.bedrooms'] = filters.bedrooms;
    }

    if (filters.bathrooms) {
      query['specs.bathrooms'] = filters.bathrooms;
    }

    return await Property.find(query).lean();
  }

  /**
   * Generates a natural language response based on the properties found.
   */
  async generateResponse(filters, properties) {
    if (properties.length === 0) {
      return "I couldn't find any properties that match all your criteria. Would you like to try increasing your budget or changing the location?";
    }

    if (properties.length === 1) {
      const p = properties[0];
      return `I found a perfect match! The ${p.title} in ${p.location} is listed for $${p.price.toLocaleString()}. It has ${p.specs.bedrooms} bedrooms and ${p.specs.bathrooms} bathrooms. Would you like to save this property?`;
    }

    return `I found ${properties.length} properties that match your preferences in ${filters.location || 'your desired area'}. I'll list them below for you to explore!`;
  }
}

module.exports = new ChatService();
