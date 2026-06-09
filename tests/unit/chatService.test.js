const chatService = require('../../src/server/services/chatService');

describe('ChatService - Intent Extraction', () => {
  test('should extract budget, location, and beds from a complex string', async () => {
    const message = "I want a 3BHK in New York under 600k";
    const filters = await chatService.extractIntent(message);

    expect(filters.location).toBe('New York');
    expect(filters.maxPrice).toBe(600000);
    expect(filters.bedrooms).toBe(3);
  });

  test('should extract only budget when location is missing', async () => {
    const message = "Something under 400k";
    const filters = await chatService.extractIntent(message);

    expect(filters.maxPrice).toBe(400000);
    expect(filters.location).toBeUndefined();
  });

  test('should handle "max" keyword for budget', async () => {
    const message = "max 1 million";
    const filters = await chatService.extractIntent(message);

    expect(filters.maxPrice).toBe(1000000);
  });

  test('should return empty filters for irrelevant messages', async () => {
    const message = "Hello, how are you?";
    const filters = await chatService.extractIntent(message);

    expect(Object.keys(filters).length).toBe(0);
  });
});
