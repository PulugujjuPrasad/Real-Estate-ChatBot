const chatService = require('../services/chatService');

/**
 * Controller to handle chat interactions.
 */
exports.handleMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Extract Intent
    const filters = await chatService.extractIntent(message);

    // 2. If no filters were extracted, the bot asks for more info
    if (Object.keys(filters).length === 0) {
      return res.json({
        text: "I'd love to help you find a home! Could you tell me your preferred location and budget? (e.g., 'I'm looking for something in New York under 600k')",
        properties: []
      });
    }

    // 3. Query Database
    const properties = await chatService.findProperties(filters);

    // 4. Generate Response
    const text = await chatService.generateResponse(filters, properties);

    return res.json({
      text,
      properties,
      extractedFilters: filters
    });

  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'An internal error occurred while processing your request.' });
  }
};
