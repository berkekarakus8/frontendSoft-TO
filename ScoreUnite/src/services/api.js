import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// A service layer for various API calls
export const matchService = {
  getAll: () => api.get('/matches'),
  getById: (id) => api.get(`/matches/${id}`),
  update: (id, data) => api.put(`/matches/${id}`, data),
};

export const leagueService = {
  getAll: () => api.get('/leagues'),
};

export const teamService = {
  getAll: () => api.get('/teams'),
};

export const newsService = {
  getAll: () => api.get('/news'),
};

export default api;
