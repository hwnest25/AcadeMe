// server.js
// Author: Mourad
// Entry point — starts the Express server

import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AcadeMe server running on port ${PORT}`);
});
