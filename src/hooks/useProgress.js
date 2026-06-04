import { useState, useEffect } from 'react'
import { SUBJECTS } from '../data/subjects'

const STORAGE_KEY = 'ph-law-progress'

const defaultProgress = () =>
  Object.fromEntries(SUBJECTS.map(s => [s.id, { progress: s.progress, mastered: s.mastered }]))

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultProgress()
    } catch {
      return defaultProgress()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const updateProgress = (subjectId, value) => {
    setProgress(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], progress: Math.min(100, Math.max(0, value)) },
    }))
  }

  const incrementMastered = (subjectId) => {
    setProgress(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        mastered: (prev[subjectId]?.mastered || 0) + 1,
      },
    }))
  }

  const overallProgress = Math.round(
    Object.values(progress).reduce((sum, s) => sum + (s.progress || 0), 0) / Object.keys(progress).length
  )

  return { progress, updateProgress, incrementMastered, overallProgress }
}
