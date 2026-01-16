import axios from 'axios';

const API_KEY = 'kg5jsWBlnzjDwEflFCwUqX3xA6Go0vqqFASGMm7ZL4FCRwLswSC0fWQl'; // Ideally in .env
const BASE_URL = 'https://api.pexels.com/v1/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    'Content-Type': 'application/json'
  }
});

export default {
  /**
   * Fetch curated photos
   * @param {number} page 
   * @param {number} perPage 
   */
  async getCuratedPhotos(page = 1, perPage = 15) {
    try {
      const response = await apiClient.get(`curated?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching curated photos:', error);
      throw error;
    }
  },

  /**
   * Search photos
   * @param {string} query 
   * @param {number} page 
   * @param {number} perPage 
   */
  async searchPhotos(query, page = 1, perPage = 15) {
    try {
      const response = await apiClient.get(`search?query=${query}&page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error('Error searching photos:', error);
      throw error;
    }
  },

  /**
   * Get specific photo details
   * @param {number|string} id 
   */
  async getPhoto(id) {
    try {
      const response = await apiClient.get(`photos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching photo ${id}:`, error);
      throw error;
    }
  }
};
