const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('../../src/server/index'); // Note: Need to export app from index.js
const Property = require('../../src/server/models/Property');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:test_db');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /api/chat - should return property matches for valid input', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: "3BHK in New York under 600k" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text');
    expect(Array.isArray(res.body.properties)).toBe(true);
  });

  test('POST /api/chat - should return helpful error for no results', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: "100BHK in Mars under 1k" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toContain("I couldn't find any properties");
  });
});
