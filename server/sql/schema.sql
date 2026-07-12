-- AcadeMe Database Schema
-- PostgreSQL (Supabase)

-- Sessions table (required by connect-pg-simple)
CREATE TABLE IF NOT EXISTS "session" (
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_seed VARCHAR(100) DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Personas table (seeded with the 6 predefined personas)
CREATE TABLE IF NOT EXISTS personas (
  id SERIAL PRIMARY KEY,
  key VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL UNIQUE,
  emoji VARCHAR(10),
  description TEXT NOT NULL,
  strengths TEXT,
  challenges TEXT,
  general_tips TEXT
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona_id INT NOT NULL REFERENCES personas(id),
  answers_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated study tips table (main CRUD content)
CREATE TABLE IF NOT EXISTS generated_tips (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona_id INT NOT NULL REFERENCES personas(id),
  subject VARCHAR(150) NOT NULL,
  education_level VARCHAR(20) NOT NULL CHECK (education_level IN ('high_school', 'university')),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_bookmarked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tip feedback table (thumbs up/down)
CREATE TABLE IF NOT EXISTS tip_feedback (
  id SERIAL PRIMARY KEY,
  tip_id INT NOT NULL REFERENCES generated_tips(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  feedback_value VARCHAR(4) NOT NULL CHECK (feedback_value IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (tip_id, user_id)
);

-- Seed the 6 personas
INSERT INTO personas (key, name, emoji, description, strengths, challenges, general_tips) VALUES
(
  'persistent_perfectionist',
  'The Persistent Perfectionist',
  '🧐',
  'You are a dedicated and thorough learner who leaves nothing to chance. Structure, preparation, and consistency are your strongest assets.',
  'Highly organized and always prepared|Consistent and disciplined study habits|Thorough understanding of the material|Reliable and dependable in group settings',
  'Tendency to over-study and burn out|Struggles to move on when something is unclear|Can spend too much time on minor details|Perfectionism can cause unnecessary stress',
  'Use the Pomodoro technique to protect your energy|Learn to distinguish what is essential vs optional|Practice accepting that good enough is sometimes enough|Schedule rest as seriously as you schedule study sessions'
),
(
  'lastminute_legend',
  'The Last-Minute Legend',
  '🫠',
  'You are a deadline-driven learner who comes alive under pressure. Urgency is your fuel and you have a talent for absorbing information fast when it counts.',
  'Works extremely fast under pressure|Strong ability to focus when it matters most|Adaptable and resourceful in tight situations|Often performs better than expected',
  'High stress levels around deadlines|Inconsistent performance across subjects|Knowledge gaps from rushed studying|Procrastination can spiral out of control',
  'Set fake personal deadlines a few days early|Break large tasks into smaller daily chunks|Try starting with just 10 minutes to beat procrastination|Use a simple to-do list to create a sense of urgency earlier'
),
(
  'strategic_sprinter',
  'The Strategic Sprinter',
  '⏱️',
  'You are a smart and efficient learner who focuses on what matters most. You instinctively apply the 80/20 rule, spending energy where it has the highest impact.',
  'Highly efficient with time and energy|Strong prioritization and planning skills|Goal oriented and results driven|Avoids wasting time on low value tasks',
  'May miss important details by skipping too much|Can underestimate the depth required for some topics|Risk of overconfidence in what will be tested|May struggle with open ended or creative tasks',
  'Occasionally review topics you skipped to close gaps|Double check your assumptions about what is important|Balance efficiency with thoroughness on high stakes exams|Try teaching a topic to someone else to test real understanding'
),
(
  'ai_addict',
  'The AI Addict',
  '🤖',
  'You are a tech-forward learner who leverages modern tools to study smarter. You are at ease using AI and digital resources to accelerate your learning.',
  'Resourceful and comfortable with technology|Efficient at finding and processing information|Adapts quickly to new tools and platforms|Can cover a lot of ground in a short time',
  'Risk of over-relying on AI without deep understanding|May struggle when tools are not available in exams|Can confuse familiarity with genuine knowledge|Critical thinking skills may be underdeveloped',
  'Regularly test yourself without any AI assistance|Use AI to check your understanding, not replace it|Practice explaining concepts out loud in your own words|Try solving problems manually before turning to tools'
),
(
  'effortless_einstein',
  'The Effortless Einstein',
  '😏',
  'You are a naturally gifted learner who grasps concepts quickly and intuitively. You rarely need to grind through material because things just click for you.',
  'Fast and intuitive understanding of new concepts|Strong natural ability to connect ideas|Rarely needs to repeat material multiple times|Often helps others understand difficult topics',
  'Can underestimate exams or assignments|May get bored easily with repetitive material|Lacks consistent study habits for harder topics|Overconfidence can lead to unpleasant surprises',
  'Challenge yourself with harder or deeper material|Use your gift to help others — it deepens your own knowledge|Build basic study habits for when things get truly difficult|Do not let past ease make you complacent on tough subjects'
),
(
  'consistent_climber',
  'The Consistent Climber',
  '🧱',
  'You believe progress comes from steady effort over time. Instead of cramming or chasing perfection, you focus on showing up regularly and building your knowledge base brick by brick.',
  'Strong and reliable study routines|Builds knowledge steadily over time|Low stress approach to exams and deadlines|Consistent progress across subjects',
  'May struggle when sudden pressure is required|Can rely too heavily on routine without adapting|Sometimes progresses slower than more intense approaches|May hesitate to try new study strategies',
  'Combine your routine with active recall techniques|Occasionally challenge yourself with timed practice tests|Experiment with new study methods to accelerate progress|Track your progress to stay motivated over the long term'
)
ON CONFLICT (key) DO NOTHING;
