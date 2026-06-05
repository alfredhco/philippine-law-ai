import civilObligations    from './civilObligations.js'
import civilContracts      from './civilContracts.js'
import criminalBookI       from './criminalBookI.js'
import politicalLaw        from './politicalLaw.js'
import laborLawCode        from './laborLawCode.js'
import remedialLawRules    from './remedialLawRules.js'

// ─── Registry ────────────────────────────────────────────────────────────────

export const CODAL_REGISTRY = [
  {
    id: 'civil-law',
    name: 'Civil Law',
    color: '#6366f1',
    topics: [
      { id: 'obligations', label: 'Obligations', articles: civilObligations },
      { id: 'contracts',   label: 'Contracts',   articles: civilContracts   },
    ],
  },
  {
    id: 'criminal-law',
    name: 'Criminal Law',
    color: '#ef4444',
    topics: [
      { id: 'felonies',   label: 'Felonies (RPC Book I)',       articles: criminalBookI },
      { id: 'stages',     label: 'Stages & Circumstances',      articles: criminalBookI.filter(a => ['stages','justifying','exempting'].includes(a.topic)) },
    ],
  },
  {
    id: 'political-law',
    name: 'Political Law',
    color: '#0ea5e9',
    topics: [
      { id: 'state-principles', label: 'State Principles',    articles: politicalLaw.filter(a => a.topic === 'state-principles') },
      { id: 'bill-of-rights',   label: 'Bill of Rights',      articles: politicalLaw.filter(a => a.topic === 'bill-of-rights') },
    ],
  },
  {
    id: 'labor-law',
    name: 'Labor Law',
    color: '#f97316',
    topics: [
      { id: 'security-of-tenure', label: 'Security of Tenure',    articles: laborLawCode.filter(a => a.topic === 'security-of-tenure') },
      { id: 'just-causes',        label: 'Just Causes',           articles: laborLawCode.filter(a => a.topic === 'just-causes') },
      { id: 'labor-relations',    label: 'Labor Relations',       articles: laborLawCode.filter(a => a.topic === 'labor-relations') },
      { id: 'all-labor',          label: 'All Labor Provisions',  articles: laborLawCode },
    ],
  },
  {
    id: 'remedial-law',
    name: 'Remedial Law',
    color: '#10b981',
    topics: [
      { id: 'general-provisions',  label: 'General Provisions',   articles: remedialLawRules.filter(a => a.topic === 'general-provisions') },
      { id: 'appeals',             label: 'Appeals',              articles: remedialLawRules.filter(a => a.topic === 'appeals') },
      { id: 'special-civil-actions', label: 'Special Civil Actions', articles: remedialLawRules.filter(a => a.topic === 'special-civil-actions') },
      { id: 'arrest',              label: 'Arrest',               articles: remedialLawRules.filter(a => a.topic === 'arrest') },
      { id: 'evidence',            label: 'Evidence',             articles: remedialLawRules.filter(a => ['evidence','rights-of-accused','cause-of-action'].includes(a.topic)) },
      { id: 'all-remedial',        label: 'All Rules of Court',   articles: remedialLawRules },
    ],
  },
]

// ─── All articles flat list ───────────────────────────────────────────────────

export const ALL_ARTICLES = [
  ...civilObligations,
  ...civilContracts,
  ...criminalBookI,
  ...politicalLaw,
  ...laborLawCode,
  ...remedialLawRules,
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const getArticle = (id) =>
  ALL_ARTICLES.find(a => a.id === id) ?? null

export const getArticlesBySubject = (subjectId) =>
  ALL_ARTICLES.filter(a => a.subject === subjectId)

export const getArticlesByTopic = (topic) =>
  ALL_ARTICLES.filter(a => a.topic === topic)

export const getAdjacentArticles = (id) => {
  const idx  = ALL_ARTICLES.findIndex(a => a.id === id)
  return {
    prev: idx > 0                       ? ALL_ARTICLES[idx - 1] : null,
    next: idx < ALL_ARTICLES.length - 1 ? ALL_ARTICLES[idx + 1] : null,
  }
}

export const searchArticles = (query) => {
  if (!query.trim()) return ALL_ARTICLES
  const q = query.toLowerCase()
  return ALL_ARTICLES.filter(a =>
    a.article.toLowerCase().includes(q)     ||
    a.title.toLowerCase().includes(q)       ||
    a.text.toLowerCase().includes(q)        ||
    a.topic.toLowerCase().includes(q)       ||
    a.subject.toLowerCase().includes(q)     ||
    (a.taglishExplanation || '').toLowerCase().includes(q) ||
    (a.barIssue || '').toLowerCase().includes(q)
  )
}

export const SUBJECT_META = {
  'civil-law':     { name: 'Civil Law',     color: '#6366f1', accent: '#818cf8' },
  'criminal-law':  { name: 'Criminal Law',  color: '#ef4444', accent: '#f87171' },
  'political-law': { name: 'Political Law', color: '#0ea5e9', accent: '#38bdf8' },
  'remedial-law':  { name: 'Remedial Law',  color: '#10b981', accent: '#34d399' },
  'commercial-law':{ name: 'Commercial Law',color: '#f59e0b', accent: '#fcd34d' },
  'taxation-law':  { name: 'Taxation Law',  color: '#8b5cf6', accent: '#a78bfa' },
  'labor-law':     { name: 'Labor Law',     color: '#f97316', accent: '#fb923c' },
  'legal-ethics':  { name: 'Legal Ethics',  color: '#ec4899', accent: '#f472b6' },
}

export const TOPIC_META = {
  obligations:         { label: 'Obligations',               chapter: 'Book IV, Title I' },
  contracts:           { label: 'Contracts',                 chapter: 'Book IV, Title II' },
  felonies:            { label: 'Felonies',                  chapter: 'RPC Book I' },
  stages:              { label: 'Stages of Execution',       chapter: 'RPC Book I' },
  justifying:          { label: 'Justifying Circumstances',  chapter: 'RPC Book I' },
  exempting:           { label: 'Exempting Circumstances',   chapter: 'RPC Book I' },
  'state-principles':  { label: 'State Principles',          chapter: 'Const. Art. II' },
  'bill-of-rights':    { label: 'Bill of Rights',            chapter: 'Const. Art. III' },
  'security-of-tenure':{ label: 'Security of Tenure',        chapter: 'Labor Code, Arts. 294-299' },
  'just-causes':       { label: 'Just Causes',               chapter: 'Labor Code, Art. 297' },
  'bona-fide-suspension':{ label: 'Bona Fide Suspension',    chapter: 'Labor Code, Art. 301' },
  'labor-relations':   { label: 'Labor Relations',           chapter: 'Labor Code, Art. 255' },
  'general-provisions':{ label: 'General Provisions',        chapter: 'Rules of Court, Rule 1' },
  'cause-of-action':   { label: 'Cause of Action',           chapter: 'Rules of Court, Rule 2' },
  appeals:             { label: 'Appeals',                   chapter: 'Rules of Court, Rules 40-45' },
  'special-civil-actions':{ label: 'Special Civil Actions',  chapter: 'Rules of Court, Rule 65' },
  arrest:              { label: 'Arrest',                    chapter: 'Rules of Court, Rule 113' },
  'rights-of-accused': { label: 'Rights of the Accused',     chapter: 'Rules of Court, Rule 115' },
  evidence:            { label: 'Evidence',                  chapter: 'Rules of Court, Rule 130' },
}
