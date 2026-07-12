import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 5000;
console.log(`PORT env var: ${process.env.PORT}`);
console.log(`Listening on port: ${PORT}`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AcadeMe server running on port ${PORT}`);
});
