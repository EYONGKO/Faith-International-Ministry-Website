import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public
export const getSermons = () => api.get('/sermons');
export const getEvents = () => api.get('/events');
export const getAnnouncements = () => api.get('/announcements');
export const getTeam = () => api.get('/team');
export const submitContact = (data) => api.post('/contact', data);
export const submitPrayer = (data) => api.post('/prayer', data);

// Auth
export const adminLogin = (data) => api.post('/auth/login', data);

// Admin — Sermons
export const createSermon = (data) => api.post('/sermons', data);
export const updateSermon = (id, data) => api.put(`/sermons/${id}`, data);
export const deleteSermon = (id) => api.delete(`/sermons/${id}`);

// Admin — Events
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Admin — Announcements
export const getAllAnnouncements = () => api.get('/announcements/all');
export const createAnnouncement = (data) => api.post('/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

// Admin — Team
export const createTeamMember = (data) => api.post('/team', data);
export const updateTeamMember = (id, data) => api.put(`/team/${id}`, data);
export const deleteTeamMember = (id) => api.delete(`/team/${id}`);

// Admin — Messages
export const getContacts = () => api.get('/contact');
export const markContactRead = (id) => api.patch(`/contact/${id}/read`);

// Admin — Prayer Requests
export const getPrayerRequests = () => api.get('/prayer');
export const markPrayerRead = (id) => api.patch(`/prayer/${id}/read`);
export const deletePrayerRequest = (id) => api.delete(`/prayer/${id}`);

export default api;
