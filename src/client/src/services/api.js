import axios from 'axios';

// Updated to point to FastAPI Python server on port 8000
const API_BASE_URL = 'http://localhost:8000/api';

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message,
      sessionId: 'guest-session-123'
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const saveProperty = async (propertyId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/properties/save`, {
      propertyId,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Save Error:', error);
    throw error;
  }
};
