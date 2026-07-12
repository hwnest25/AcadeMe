import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import pg from 'pg';

import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import tipRoutes from './routes/tipRoutes.js';

dotenv.config();

const app = express();
const PgSession = connectPgSimple(session);
const { Pool } = pg;

// Session store uses same Supabase DB
const sessionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const allowedOrigins = [
  'http://localhost:5173',
  'https://academe-quiz.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new PgSession({
    pool: sessionPool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/tips', tipRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AcadeMe API is running' });
});

export default app;
