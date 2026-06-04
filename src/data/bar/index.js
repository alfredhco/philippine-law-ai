import civilBar     from './civilLawBar.js'
import criminalBar  from './criminalLawBar.js'
import politicalBar from './politicalLawBar.js'
import remedialBar  from './remedialLawBar.js'
import commercialBar from './commercialLawBar.js'
import taxationBar  from './taxationLawBar.js'
import laborBar     from './laborLawBar.js'
import ethicsBar    from './legalEthicsBar.js'
import writingBar   from './legalWritingBar.js'

// ─── Registry ────────────────────────────────────────────────────────────────

export const ALL_MCQ = [
  ...civilBar.mcq,
  ...criminalBar.mcq,
  ...politicalBar.mcq,
  ...remedialBar.mcq,
  ...commercialBar.mcq,
  ...taxationBar.mcq,
  ...laborBar.mcq,
  ...ethicsBar.mcq,
  ...writingBar.mcq,
]

export const ALL_ESSAYS = [
  ...civilBar.essays,
  ...criminalBar.essays,
  ...politicalBar.essays,
  ...remedialBar.essays,
  ...commercialBar.essays,
  ...taxationBar.essays,
  ...laborBar.essays,
  ...ethicsBar.essays,
  ...writingBar.essays,
]

export const ALL_QUESTIONS = [...ALL_MCQ, ...ALL_ESSAYS]

// ─── Subject meta ─────────────────────────────────────────────────────────────

export const BAR_SUBJECTS = {
  'civil-law':      { name: 'Civil Law',      color: '#6366f1', weight: 20 },
  'criminal-law':   { name: 'Criminal Law',   color: '#ef4444', weight: 15 },
  'political-law':  { name: 'Political Law',  color: '#0ea5e9', weight: 15 },
  'remedial-law':   { name: 'Remedial Law',   color: '#10b981', weight: 15 },
  'commercial-law': { name: 'Commercial Law', color: '#f59e0b', weight: 15 },
  'taxation-law':   { name: 'Taxation Law',   color: '#8b5cf6', weight: 10 },
  'labor-law':      { name: 'Labor Law',      color: '#f97316', weight: 10 },
  'legal-ethics':   { name: 'Legal Ethics',   color: '#ec4899', weight: 5  },
  'legal-writing':  { name: 'Legal Writing',  color: '#14b8a6', weight: 5  },
}

// ─── Exam mode configs ────────────────────────────────────────────────────────

export const EXAM_MODES = [
  {
    id: 'full-mock',
    label: 'Full Mock Bar',
    desc: 'All 9 subjects · MCQ + Essay · 3-hour simulation',
    icon: 'GraduationCap',
    color: '#f59e0b',
    timeMinutes: 180,
    questions: ALL_MCQ.length,
    subjects: Object.keys(BAR_SUBJECTS),
    types: ['mcq'],
  },
  {
    id: 'essay-drill',
    label: 'Essay & IRAC Drill',
    desc: 'Full structured essays with model IRAC answers',
    icon: 'FileText',
    color: '#6366f1',
    timeMinutes: 90,
    questions: ALL_ESSAYS.length,
    subjects: Object.keys(BAR_SUBJECTS),
    types: ['essay'],
  },
  {
    id: 'civil-sprint',
    label: 'Civil Law Sprint',
    desc: `${civilBar.mcq.length} MCQ · Civil Law only · 30 minutes`,
    icon: 'BookOpen',
    color: '#6366f1',
    timeMinutes: 30,
    questions: civilBar.mcq.length,
    subjects: ['civil-law'],
    types: ['mcq'],
  },
  {
    id: 'criminal-sprint',
    label: 'Criminal Law Sprint',
    desc: `${criminalBar.mcq.length} MCQ · Criminal Law only · 25 minutes`,
    icon: 'Shield',
    color: '#ef4444',
    timeMinutes: 25,
    questions: criminalBar.mcq.length,
    subjects: ['criminal-law'],
    types: ['mcq'],
  },
  {
    id: 'political-sprint',
    label: 'Political Law Sprint',
    desc: `${politicalBar.mcq.length} MCQ · Political Law only · 25 minutes`,
    icon: 'Landmark',
    color: '#0ea5e9',
    timeMinutes: 25,
    questions: politicalBar.mcq.length,
    subjects: ['political-law'],
    types: ['mcq'],
  },
  {
    id: 'remedial-sprint',
    label: 'Remedial Law Sprint',
    desc: `${remedialBar.mcq.length} MCQ · Remedial Law only · 30 minutes`,
    icon: 'Scale',
    color: '#10b981',
    timeMinutes: 30,
    questions: remedialBar.mcq.length,
    subjects: ['remedial-law'],
    types: ['mcq'],
  },
  {
    id: 'commercial-sprint',
    label: 'Commercial Law Sprint',
    desc: `${commercialBar.mcq.length} MCQ · Commercial Law only · 25 minutes`,
    icon: 'Briefcase',
    color: '#f59e0b',
    timeMinutes: 25,
    questions: commercialBar.mcq.length,
    subjects: ['commercial-law'],
    types: ['mcq'],
  },
  {
    id: 'taxation-sprint',
    label: 'Taxation Law Sprint',
    desc: `${taxationBar.mcq.length} MCQ · Tax Law only · 25 minutes`,
    icon: 'Receipt',
    color: '#8b5cf6',
    timeMinutes: 25,
    questions: taxationBar.mcq.length,
    subjects: ['taxation-law'],
    types: ['mcq'],
  },
  {
    id: 'labor-sprint',
    label: 'Labor Law Sprint',
    desc: `${laborBar.mcq.length} MCQ · Labor Law only · 25 minutes`,
    icon: 'Users',
    color: '#f97316',
    timeMinutes: 25,
    questions: laborBar.mcq.length,
    subjects: ['labor-law'],
    types: ['mcq'],
  },
  {
    id: 'ethics-sprint',
    label: 'Legal Ethics Sprint',
    desc: `${ethicsBar.mcq.length} MCQ · Legal Ethics only · 20 minutes`,
    icon: 'Award',
    color: '#ec4899',
    timeMinutes: 20,
    questions: ethicsBar.mcq.length,
    subjects: ['legal-ethics'],
    types: ['mcq'],
  },
  {
    id: 'writing-sprint',
    label: 'Legal Writing Sprint',
    desc: `${writingBar.mcq.length} MCQ · Legal Writing only · 20 minutes`,
    icon: 'PenLine',
    color: '#14b8a6',
    timeMinutes: 20,
    questions: writingBar.mcq.length,
    subjects: ['legal-writing'],
    types: ['mcq'],
  },
  {
    id: 'weak-areas',
    label: 'Weak Area Review',
    desc: 'Auto-selected based on past performance',
    icon: 'TrendingDown',
    color: '#ef4444',
    timeMinutes: 40,
    questions: null,
    subjects: 'auto',
    types: ['mcq'],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getQuestionsBySubject = (subjectId) =>
  ALL_MCQ.filter(q => q.subject === subjectId)

export const getEssaysBySubject = (subjectId) =>
  ALL_ESSAYS.filter(q => q.subject === subjectId)

export const getQuestionById = (id) =>
  ALL_QUESTIONS.find(q => q.id === id) ?? null

export const buildQueue = (modeId, analyticsData) => {
  const mode = EXAM_MODES.find(m => m.id === modeId)
  if (!mode) return shuffle(ALL_MCQ).slice(0, 10)

  if (modeId === 'full-mock')          return shuffle([...ALL_MCQ])
  if (modeId === 'essay-drill')        return ALL_ESSAYS
  if (modeId === 'civil-sprint')       return shuffle([...civilBar.mcq])
  if (modeId === 'criminal-sprint')    return shuffle([...criminalBar.mcq])
  if (modeId === 'political-sprint')   return shuffle([...politicalBar.mcq])
  if (modeId === 'remedial-sprint')    return shuffle([...remedialBar.mcq])
  if (modeId === 'commercial-sprint')  return shuffle([...commercialBar.mcq])
  if (modeId === 'taxation-sprint')    return shuffle([...taxationBar.mcq])
  if (modeId === 'labor-sprint')       return shuffle([...laborBar.mcq])
  if (modeId === 'ethics-sprint')      return shuffle([...ethicsBar.mcq])
  if (modeId === 'writing-sprint')     return shuffle([...writingBar.mcq])

  if (modeId === 'weak-areas' && analyticsData) {
    const weakTopics = getWeakTopics(analyticsData)
    const weak = ALL_MCQ.filter(q => weakTopics.includes(q.topic))
    return weak.length >= 5 ? shuffle(weak) : shuffle(ALL_MCQ).slice(0, 10)
  }

  return shuffle(ALL_MCQ).slice(0, 10)
}

export const getWeakTopics = (analyticsData) => {
  if (!analyticsData?.topicPerformance) return []
  return Object.entries(analyticsData.topicPerformance)
    .filter(([, v]) => v.total >= 2 && (v.correct / v.total) < 0.6)
    .map(([topic]) => topic)
}

export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

export const PASSING_SCORE = 75

export const getGrade = (pct) => {
  if (pct >= 90) return { label: 'Outstanding',   color: '#f59e0b', emoji: '🏆' }
  if (pct >= 80) return { label: 'Very Good',      color: '#10b981', emoji: '🌟' }
  if (pct >= 75) return { label: 'Passed',         color: '#22c55e', emoji: '✅' }
  if (pct >= 65) return { label: 'Near Passing',   color: '#f97316', emoji: '📈' }
  if (pct >= 50) return { label: 'Needs Work',     color: '#fb923c', emoji: '📚' }
  return              { label: 'Must Improve',    color: '#ef4444', emoji: '🔄' }
}

export const scoreSession = (answers, questions) => {
  let correct = 0, total = 0, points = 0, maxPoints = 0

  questions.forEach(q => {
    if (q.type === 'mcq') {
      total++
      maxPoints += q.points || 2
      if (answers[q.id] === q.correctAnswer) {
        correct++
        points += q.points || 2
      }
    }
  })

  const pct = maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0
  return { correct, total, points, maxPoints, pct, passed: pct >= PASSING_SCORE }
}
