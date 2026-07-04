# Claude Instructions

# Proposal - Project Version 2 - Semester 2

---

# AcadeMe 2.0 — Project Framing

## Project Overview

**AcadeMe** is a full-stack web application designed to help students better understand their learning behavior and receive adaptive study support based on their study habits.

The platform centers around a diagnostic **Study Persona Quiz**, where users answer a series of multiple-choice questions related to study habits, motivation, time management, and learning behavior. Based on their responses, users are diagnosed as one of six predefined study personas:

- Persistent Perfectionist,
- Last-Minute Legend,
- Strategic Sprinter,
- AI Addict,
- Effortless Einstein,
- or Consistent Climber.

Each diagnosis includes general study insights, strengths, challenges, and recommendations associated with that learning style.

After receiving their diagnosis, users can generate additional subject-specific study tips by entering an academic subject and selecting whether the content is intended for high school or university-level study. Using the diagnosed study persona as context, the system generates AI-powered study recommendations tailored to both the user’s learning style and academic level.

Generated study tips can be saved or bookmarked to the user’s profile for future reference and organization.

Users can also provide feedback on generated recommendations through thumbs-up or thumbs-down interactions. This allows the platform to capture which types of study strategies resonate most strongly with different personas and educational contexts, supporting future refinement of recommendations and overall user experience.

---

# Core Features

## 1. Study Persona Diagnosis

Users complete a multiple-choice diagnostic quiz that evaluates study behavior and learning habits. Based on quiz responses, the system assigns one of six predefined study personas.

Each diagnosis includes:

- persona description,
- strengths,
- common challenges,
- and general study recommendations.

---

## 2. AI-Generated Subject-Specific Recommendations

After diagnosis, users can:

- enter an academic subject,
- select either high school or university level,
- and generate customized study tips.

The recommendation system uses:

- the diagnosed persona,
- subject context,
- and academic level

to generate targeted study strategies and learning recommendations.

---

# User Registration & Authentication

Users will be able to:

- register accounts,
- log in and log out,
- access protected pages,
- and securely store account information using encrypted passwords.

This fulfills the authentication and protected route requirements outlined in the project brief.

---

# User Profiles

Each user profile will contain:

- username,
- profile picture,
- short bio,
- saved study persona diagnosis,
- bookmarked generated study tips,
- and previously generated recommendations.

Users will also be able to edit and manage their profiles.

---

# CRUD Functionality

Authenticated users will be able to:

- create generated study strategies,
- view saved strategies,
- edit saved/generated content,
- and delete saved strategies from their profile.

Each saved strategy will also have its own unique URL.

This fulfills the CRUD and unique URL requirements.

---

# Interaction & Feedback

Users can interact with generated study recommendations through:

- thumbs-up reactions,
- thumbs-down reactions,
- bookmarking,
- and optional short reflections.

This interaction system allows the platform to identify which recommendations resonate most strongly with different study personas and educational contexts.

This fulfills the project requirement for comments, reviews, or feedback interactions.

---

# Search & Filtering

Users will be able to:

- search saved strategies by subject,
- filter recommendations by academic level,
- and organize bookmarked/generated content within their profiles.

This fulfills the search and filtering requirements.

---

# Bookmarks & Saved Strategies

Users can bookmark generated study tips and save them to their profile for later access and organization.

This fulfills the interaction feature requirement for favorites/bookmarks/save-for-later functionality.

# AcadeMe 2 System Design

## Step 1 — System Design Blueprint for AcadeMe 2.0

### Product Flow

```jsx
User registers / logs in
        ↓
Takes persona quiz
        ↓
Gets diagnosed as 1 of 6 study personas
        ↓
Sees general persona strengths, challenges, and tips
        ↓
Enters subject + selects education level
        ↓
AI generates custom study tips
        ↓
User saves/bookmarks tips
        ↓
User gives thumbs up/down feedback
        ↓
Saved tips appear in profile/dashboard
```

## Core Modules

## 1. Authentication Module - Required by the brief.

Supports:

- register
- login
- logout
- protected pages
- hashed passwords

## 2. User Profile Module - Required by the brief.

Each user has:

- username
- email
- bio
- profile image
- diagnosed persona
- saved/generated tips

## 3. Persona Diagnosis Module

Keeps your current quiz logic, but stores:

- user answers
- diagnosed persona
- quiz completion date

## 4. AI Study Tip Generator - to generate custom tips.

User inputs:

- subject
- level: `High School` or `University`

System uses:

- diagnosed persona
- subject
- level

## 5. Saved Tips Module / Main Content Type - Satisfies the CRUD requirement.

This becomes your CRUD feature.

Users can:

- create/generate tips
- view saved tips
- edit notes/title
- delete saved tips

## 6. Feedback Module - Interaction/feedback requirement.

Users can mark generated tips with:

- 👍 Resonates
- 👎 Does not resonate

## 7. Search & Filter Module - Required by the brief.

Users can search/filter their saved tips by:

- subject
- education level
- persona
- feedback status
- date created

Users can search/filter their saved tips by:

- subject
- education level
- persona
- feedback status
- date created

## Recommended Architecture

```jsx
Frontend: React + Vite
        ↓ API calls
Backend: Node.js + Express
        ↓ SQL queries / ORM
Database: MySQL
        ↓
External API: LLM provider for study-tip generation
```

## MVC Backend Structure

```jsx
server/
├── config/
│   └── db.js
├── models/
│   ├── userModel.js
│   ├── quizResultModel.js
│   ├── studyTipModel.js
│   └── feedbackModel.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── quizController.js
│   ├── studyTipController.js
│   └── aiController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── quizRoutes.js
│   ├── studyTipRoutes.js
│   └── aiRoutes.js
├── middleware/
│   └── authMiddleware.js
├── app.js
└── server.js
```

This directly supports the MVC requirement: models, views, controllers, and routes separated.

## MySQL Database Tables

### `users`

Stores account/profile data.

```sql
id
username
email
password_hash
bio
profile_image_url
created_at
updated_at
```

### `quiz_results`

Stores persona diagnosis.

```sql
id
user_id
persona
answers_json
created_at
```

### `study_tips`

Stores generated/saved tips.

```sql
id
user_id
persona
subject
education_level
title
content
is_bookmarked
created_at
updated_at
```

### `tip_feedback`

Stores thumbs up/down feedback.

```sql
id
tip_id
user_id
feedback_value -- 'up' or 'down'
created_at
```

## Frontend Page Structure

```
src/
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Quiz.jsx
│   ├── Results.jsx
│   ├── GenerateTips.jsx
│   ├── SavedTips.jsx
│   └── Profile.jsx
├── components/
│   ├── NavBar.jsx
│   ├── ProtectedRoute.jsx
│   ├── QuestionCard.jsx
│   ├── PersonaResultCard.jsx
│   ├── TipCard.jsx
│   ├── TipGeneratorForm.jsx
│   └── FeedbackButtons.jsx
├── services/
│   ├── authService.js
│   ├── quizService.js
│   ├── tipService.js
│   └── aiService.js
```

…

## Step 2 - MySQL Schema Design for AcadeMe 2.0

### 1. `users`

Stores registered users and profile information.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 2. `personas`

Stores the six predefined study personas.

```sql
CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  strengths TEXT,
  challenges TEXT,
  general_tips TEXT
);
```

Example rows:

```sql
INSERT INTO personas (name, description)
VALUES
('Persistent Perfectionist', 'Organized, thorough, and highly prepared.'),
('Last-Minute Legend', 'Deadline-driven and performs under pressure.'),
('Strategic Sprinter', 'Efficient, focused, and goal-oriented.'),
('AI Addict', 'Tech-forward and uses digital tools heavily.'),
('Effortless Einstein', 'Fast, intuitive learner with natural understanding.'),
('Consistent Climber', 'Steady learner who improves through regular effort.');
```

---

### 3. `quiz_results`

Stores each user’s diagnosis result.

```sql
CREATE TABLE quiz_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  persona_id INT NOT NULL,
  answers_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (persona_id) REFERENCES personas(id)
);
```

---

### 4. `generated_tips`

Main CRUD content type. Stores AI-generated subject-specific study tips.

```sql
CREATE TABLE generated_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  persona_id INT NOT NULL,
  subject VARCHAR(150) NOT NULL,
  education_level ENUM('high_school', 'university') NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_bookmarked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (persona_id) REFERENCES personas(id)
);
```

---

### 5. `tip_feedback`

Stores thumbs-up / thumbs-down feedback.

```sql
CREATE TABLE tip_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tip_id INT NOT NULL,
  user_id INT NOT NULL,
  feedback_value ENUM('up', 'down') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (tip_id, user_id),
  FOREIGN KEY (tip_id) REFERENCES generated_tips(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Relationships

```
users
  ├── quiz_results
  ├── generated_tips
  └── tip_feedback

personas
  ├── quiz_results
  └── generated_tips

generated_tips
  └── tip_feedback
```

## Why this works

This schema supports:

- user authentication and profiles,
- six predefined personas,
- stored quiz diagnoses,
- CRUD for generated study tips,
- bookmarks,
- thumbs-up/down feedback,
- search/filtering by subject, persona, level, and date.

It also fits the brief’s requirements for database storage, user profiles, CRUD, feedback, search/filtering, and MVC-backed data structure.

## Step 3 -  API Design

Next: design the **API routes and backend MVC structure** so the schema becomes implementable.

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### User/Profile Routes

```
GET  /api/users/me
PUT  /api/users/me
GET  /api/users/me/dashboard
```

### Quiz Routes

```
POST /api/quiz/results
GET  /api/quiz/latest
GET  /api/personas
```

### AI Tip Generator Routes

```
POST /api/tips/generate
```

Input:

```json
{
  "subject": "Database Systems",
  "educationLevel": "university"
}
```

Backend adds the logged-in user’s diagnosed persona automatically.

### Saved Tips CRUD Routes

```
GET    /api/tips
GET    /api/tips/:id
POST   /api/tips
PUT    /api/tips/:id
DELETE /api/tips/:id
```

### Bookmark Route

```
PATCH /api/tips/:id/bookmark
```

### Feedback Route

```
POST /api/tips/:id/feedback
```

Input:

```json
{
  "feedbackValue": "up"
}
```

or:

```json
{
  "feedbackValue": "down"
}
```

## Recommended next implementation order

1. Set up backend folder with Express
2. Connect MySQL
3. Create database tables
4. Add auth/register/login with hashed passwords
5. Add protected route middleware
6. Add quiz result saving
7. Add AI tip generation
8. Add saved tips CRUD
9. Add bookmark + feedback
10. Connect React frontend to backend

Next, I’d set up the **backend project structure and initial Express/MySQL configuration**.

## **Step 4 — Backend Setup Plan**

### Backend folder

Create a new folder in the project root:

```bash
mkdir server
cd server
npm init -y
```

Install core dependencies:

```bash
npm install express mysql2 bcrypt jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

---

## Recommended backend structure

```
server/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── quizController.js
│   ├── tipController.js
│   └── feedbackController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── userModel.js
│   ├── personaModel.js
│   ├── quizResultModel.js
│   ├── generatedTipModel.js
│   └── feedbackModel.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── quizRoutes.js
│   ├── tipRoutes.js
│   └── feedbackRoutes.js
├── sql/
│   └── schema.sql
├── app.js
└── server.js
```

This clearly supports the required MVC separation: models, controllers, routes, and views/interface separation.

---

## `.env`

Create:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=academe_db

JWT_SECRET=replace_with_long_random_secret
```

---

## `config/db.js`

```jsx
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

---

## `app.js`

```jsx
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AcadeMe API is running" });
});

export default app;
```

---

## `server.js`

```jsx
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AcadeMe server running on port ${PORT}`);
});
```

---

## Update `package.json`

Inside `server/package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

---
