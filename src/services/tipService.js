// services/tipService.js
// Author: Fabian

import api from './api.js';

export const generateTip = (data) => api.post('/tips/generate', data);
export const saveTip = (data) => api.post('/tips', data);
export const listTips = (params) => api.get('/tips', { params });
export const getTip = (id) => api.get(`/tips/${id}`);
export const updateTip = (id, data) => api.put(`/tips/${id}`, data);
export const deleteTip = (id) => api.delete(`/tips/${id}`);
export const toggleBookmark = (id) => api.patch(`/tips/${id}/bookmark`);
export const submitFeedback = (id, feedback_value) =>
  api.post(`/tips/${id}/feedback`, { feedback_value });
export const removeFeedback = (id) => api.delete(`/tips/${id}/feedback`);
