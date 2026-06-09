const request = require('supertest');
const app = require('../../src/server/index');

describe('Security Audit', () => {
  test('should block NoSQL Injection in chat input', async () => {
    const payload = {
      message: { "$gt": "" }, // Classic NoSQL injection attempt
      sessionId: "attacker-session"
    };

    const res = await request(app)
      .post('/api/chat')
      .send(payload);

    // Should return 400 or a clean error, not a 500 crash or leaked data
    expect(res.statusCode).not.toEqual(500);
  });

  test('should enforce rate limiting on chat endpoint', async () => {
    // Sending 101 requests quickly
    for (let i = 0; i < 100; i++) {
      await request(app).post('/api/chat').send({ message: "Hello" });
    }
    const res = await request(app).post('/api/chat').send({ message: "Hello" });

    expect(res.statusCode).toEqual(429); // Too Many Requests
  });
});
