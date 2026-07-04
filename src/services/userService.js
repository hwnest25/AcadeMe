// services/userService.js
// Author: Fabian

import api from './api.js';

export const getProfile = () => api.get('/users/me');
export const updateProfile = (data) => api.put('/users/me', data);
export const getDashboard = () => api.get('/users/me/dashboard');
