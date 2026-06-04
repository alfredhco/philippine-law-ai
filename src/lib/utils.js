export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export const getProgressColor = (progress) => {
  if (progress >= 80) return 'text-emerald-400'
  if (progress >= 50) return 'text-gold-400'
  if (progress >= 30) return 'text-amber-500'
  return 'text-red-400'
}

export const getProgressBarColor = (progress) => {
  if (progress >= 80) return 'bg-emerald-500'
  if (progress >= 50) return 'bg-gold-500'
  if (progress >= 30) return 'bg-amber-500'
  return 'bg-red-500'
}

export const getDifficultyColor = (difficulty) => {
  const map = {
    easy: 'text-emerald-400 bg-emerald-400/10',
    medium: 'text-amber-400 bg-amber-400/10',
    hard: 'text-red-400 bg-red-400/10',
  }
  return map[difficulty] || map.medium
}

export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const getStreakEmoji = (streak) => {
  if (streak >= 30) return '🔥🔥🔥'
  if (streak >= 14) return '🔥🔥'
  if (streak >= 7) return '🔥'
  if (streak >= 3) return '⚡'
  return '📚'
}
