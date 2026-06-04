export const PROFESSORS = {
  castillo: {
    id: 'castillo',
    name: 'Dean Castillo',
    title: 'Dean, College of Law',
    initials: 'DC',
    color: '#dc2626',
    dimColor: '#7f1d1d',
    personality: 'The Iron Dean',
    tagline: 'Twenty years breaking students into lawyers. No mercy. No excuses.',
    difficulty: 'Brutal',

    patience: 6,
    nudgePause: 4,
    typingSpeed: 28,
    thinkDelay: [600, 1400],
    minWords: 40,

    openings: [
      'Counsel, you are on the stand. Choose your words carefully.',
      'I expect precision. Not philosophy. Not poetry. Precision.',
      'Let us find out today whether you deserve to pass the bar.',
      'Stand up straight. I can already tell this will be painful.',
      'You have exactly as much time as I decide to give you. Begin.',
    ],

    nudges: [
      'Counsel.',
      'I am still waiting.',
      'The clock is not your enemy. Your ignorance is.',
      'Are you thinking, or have you simply forgotten everything?',
      'Every second of silence costs you points.',
    ],

    interruptions: [
      'STOP. You are going in circles.',
      'Counsel — that is not an answer. That is a recitation of your confusion.',
      'I did not ask for your autobiography. Answer. The. Question.',
      'Wrong. Wrong doctrine. Wrong article. Wrong everything. Try again.',
      'You just contradicted yourself. Are you even listening to what you are saying?',
      'That answer tells me you read the table of contents and nothing else.',
    ],

    escalations: [
      'Cite your basis, Counsel. What article? What case?',
      'I need ARTICLE NUMBERS. Not impressions. Not feelings. Article. Numbers.',
      'You are asserting a legal conclusion without legal foundation. CASE NAME.',
      'That answer tells me you have not opened your book since August. Correct yourself.',
      'If you cannot cite the provision, you do not know the law. Simple as that.',
    ],

    passComments: [
      '...Acceptable. Barely.',
      'Correct. I am not impressed — that was basic. But correct.',
      'That will do. Do not let your confidence exceed your competence.',
      'Finally. Was that so difficult?',
    ],

    failComments: [
      'Sit down.',
      'That was embarrassing, Counsel.',
      'Incorrect. That answer would fail you at the bar.',
      'I suggest you reconsider whether law is your calling.',
      'I\'ve seen first-year pre-law students do better.',
    ],

    evalComment: (pct) => {
      if (pct >= 88) return 'Unexpectedly competent. I am not entirely displeased.'
      if (pct >= 75) return 'Passable. Your citations saved you. The analysis was weak.'
      if (pct >= 60) return 'You know the rules but cannot apply them. That is useless.'
      if (pct >= 40) return 'Memorization without understanding. You will fail the bar like this.'
      return 'I have seen first-year students perform better. Study everything.'
    },

    moodThresholds: { impatient: 55, angry: 35 },
  },

  reyes: {
    id: 'reyes',
    name: 'Justice Reyes',
    title: 'Associate Justice (Ret.)',
    initials: 'JR',
    color: '#0ea5e9',
    dimColor: '#0c4a6e',
    personality: 'The Technician',
    tagline: 'Former SC Justice. Questions are precise. Expectations are absolute.',
    difficulty: 'Rigorous',

    patience: 11,
    nudgePause: 7,
    typingSpeed: 44,
    thinkDelay: [1400, 2800],
    minWords: 50,

    openings: [
      'Good morning, Counsel. Let us begin with first principles.',
      'I want to understand your analytical framework. Let us proceed.',
      'The law does not reward guesswork. Let us be methodical.',
      'Structure your responses: Issue, Rule, Application, Conclusion.',
    ],

    nudges: [
      'Take your time, Counsel.',
      'I am waiting for your analysis — not a summary.',
      'Structure your answer. Begin with the issue.',
      'Think carefully. Precision is everything here.',
      'I expect a complete legal analysis, not a fragment.',
    ],

    interruptions: [
      'Counsel, you identified the rule but did not apply it to the facts.',
      'That analysis is incomplete. What does the jurisprudence establish?',
      'You are conflating two distinct doctrines. Let me stop you there.',
      'The case you cited does not stand for that proposition. Reconsider.',
      'You stated a conclusion. I asked for an analysis. There is a difference.',
    ],

    escalations: [
      'Which G.R. Number are you citing, Counsel?',
      'The specific section of the statute controls here. Which section?',
      'There is controlling jurisprudence. Are you familiar with it?',
      'The SC has been categorical on this issue. What is the holding?',
      'Your argument requires a constitutional basis. Cite it.',
    ],

    passComments: [
      'That is the correct doctrine. Well articulated.',
      'Accurate. Your citation to jurisprudence was appropriate.',
      'Correct analysis. I would add only that subsequent cases refined the doctrine.',
      'That tracks with the SC\'s current position. Precise.',
    ],

    failComments: [
      'That analysis misses the essential legal question.',
      'Counsel, the statute is unambiguous. Please re-read it.',
      'That conclusion does not follow from your premises.',
      'The case you cited was distinguished in a later decision. Be more careful.',
    ],

    evalComment: (pct) => {
      if (pct >= 88) return 'Excellent analytical framework. Your jurisprudential citations were precise and on-point.'
      if (pct >= 75) return 'Solid doctrinal understanding. The application could use more nuance.'
      if (pct >= 60) return 'The foundation is present, but your jurisprudential support is thin.'
      if (pct >= 40) return 'You identified the correct area of law but the analysis lacks depth and authority.'
      return 'I am concerned about your preparation. The fundamentals require significant work.'
    },

    moodThresholds: { impatient: 45, angry: 25 },
  },

  santos: {
    id: 'santos',
    name: 'Atty. Santos',
    title: 'Asst. Professor of Law',
    initials: 'AS',
    color: '#10b981',
    dimColor: '#064e3b',
    personality: 'The Mentor',
    tagline: 'Young, sharp, practical. Will push you — but never humiliate you.',
    difficulty: 'Challenging',

    patience: 14,
    nudgePause: 9,
    typingSpeed: 38,
    thinkDelay: [800, 1800],
    minWords: 30,

    openings: [
      'Alright, Counsel — let\'s think through this together.',
      'Don\'t freeze up. You know this. Let\'s go.',
      'Treat this like the actual bar. Structured, clear, grounded.',
      'No pressure — well, some pressure. That\'s kind of the point. Let\'s begin.',
    ],

    nudges: [
      'Take a breath. What\'s the first principle here?',
      'Break it down — what does the law say first?',
      'You\'re overthinking this. Start with the basics.',
      'What subject area is this? Start there and work forward.',
      'Imagine you\'re explaining this to a client. Keep it clear.',
    ],

    interruptions: [
      'Hold on — you jumped ahead. What\'s the RULE first?',
      'Good start, but you skipped the legal basis. Back up a step.',
      'That\'s your conclusion, not your analysis. Walk me through it.',
      'You\'re close, but there\'s a key element missing. What is it?',
      'That\'s the right area but the wrong doctrine. Try again.',
    ],

    escalations: [
      'What article covers this? I need a number.',
      'There\'s a landmark case on this exact issue. Ring any bells?',
      'You said "the law provides" — which law? Be specific.',
      'Good instinct, but I need a citation to back it up.',
      'Don\'t give me the concept — give me the authority.',
    ],

    passComments: [
      'That\'s it! Exactly right.',
      'Nice — clear structure, solid citation.',
      'Yes! Great analysis. See? You knew it.',
      'That\'s the correct application. Well done.',
    ],

    failComments: [
      'Not quite — let\'s revisit the rule together.',
      'Almost, but you\'re missing one element. Think harder.',
      'That\'s the wrong framework. Let\'s reset.',
      'Close, but that\'s not the controlling principle here.',
    ],

    evalComment: (pct) => {
      if (pct >= 88) return 'Excellent session! Real command of the material. Keep this energy.'
      if (pct >= 75) return 'Strong work overall. A few citation gaps, but solid analysis.'
      if (pct >= 60) return 'Decent performance. The concepts are there — work on the precision.'
      if (pct >= 40) return 'Right instincts, but the technical foundations need reinforcement.'
      return 'Let\'s set up a review session. There\'s important ground to cover.'
    },

    moodThresholds: { impatient: 35, angry: 15 },
  },
}

export const PROF_LIST = Object.values(PROFESSORS)
