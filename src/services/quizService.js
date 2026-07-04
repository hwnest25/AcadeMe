// services/quizService.js
// Author: Fabian

import api from './api.js';

export const submitQuizResult = (data) => api.post('/quiz/results', data);
export const getLatestQuizResult = () => api.get('/quiz/latest');
