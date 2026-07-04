// controllers/aiController.js
// Handles Groq AI tip generation

import Groq from 'groq-sdk';
import { getLatestQuizResult } from '../models/quizModel.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateTip = async (req, res) => {
  const { subject, education_level } = req.body;

  if (!subject || !education_level) {
    return res.status(400).json({ message: 'subject and education_level are required.' });
  }
  if (!['high_school', 'university'].includes(education_level)) {
    return res.status(400).json({ message: 'education_level must be high_school or university.' });
  }

  try {
    // Get user's diagnosed persona
    const quizResult = await getLatestQuizResult(req.user.id);
    if (!quizResult) {
      return res.status(404).json({ message: 'No quiz result found. Please complete the quiz first.' });
    }

    const levelLabel = education_level === 'high_school' ? 'high school' : 'university';

    const prompt = `You are an expert study coach specialising in personalised learning strategies.

The student is a "${quizResult.persona_name}" — ${getPersonaContext(quizResult.persona_key)}.

Generate 5 highly specific, actionable study tips for this student studying "${subject}" at ${levelLabel} level.

Format your response EXACTLY as follows:
TITLE: [A short, motivating title for this tip set, max 10 words]
TIPS:
1. [Tip 1]
2. [Tip 2]
3. [Tip 3]
4. [Tip 4]
5. [Tip 5]

Each tip must be 1-2 sentences, concrete, and tailored to both the persona and the subject.`;

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    const raw = completion.choices[0]?.message?.content || '';
    const { title, content } = parseGroqResponse(raw, subject, quizResult.persona_name);

    res.json({
      title,
      content,
      persona_key: quizResult.persona_key,
      persona_name: quizResult.persona_name,
      subject,
      education_level,
    });
  } catch (err) {
    console.error('Groq generation error:', err);
    res.status(500).json({ message: 'Failed to generate tips. Please try again.' });
  }
};

const parseGroqResponse = (raw, subject, personaName) => {
  const titleMatch = raw.match(/TITLE:\s*(.+)/i);
  const title = titleMatch
    ? titleMatch[1].trim()
    : `Study Tips for ${subject} — ${personaName}`;

  const tipsMatch = raw.match(/TIPS:\s*([\s\S]+)/i);
  const content = tipsMatch ? tipsMatch[1].trim() : raw.trim();

  return { title, content };
};

const getPersonaContext = (key) => {
  const contexts = {
    persistent_perfectionist: 'a highly organised, thorough learner who tends to over-study',
    lastminute_legend: 'a deadline-driven learner who thrives under pressure',
    strategic_sprinter: 'an efficient learner who focuses on the 80/20 rule',
    ai_addict: 'a tech-forward learner who relies heavily on digital tools',
    effortless_einstein: 'a naturally gifted, intuitive learner who can become complacent',
    consistent_climber: 'a steady, routine-driven learner who builds knowledge incrementally',
  };
  return contexts[key] || 'a motivated student';
};
