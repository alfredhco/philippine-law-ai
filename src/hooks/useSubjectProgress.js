import { useState, useEffect, useCallback } from 'react'
import { SUBJECT_REGISTRY } from '../data/subjects/index.js'

const STORAGE_KEY = 'ph-law-subject-progress'

const defaultSubjectProgress = () => ({
  flashcardsMastered: 0,
  barQuestionsAttempted: 0,
  codalRead: 0,
  recitationsCompleted: 0,
  lastStudied: null,
  totalStudyMinutes: 0,
})

const defaultProgress = () =>
  Object.fromEntries(
    SUBJECT_REGISTRY.map((s) => [s.id, defaultSubjectProgress()])
  )

export function useSubjectProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure all subjects have entries (handles new subjects being added)
        const defaults = defaultProgress()
        return { ...defaults, ...parsed }
      }
      return defaultProgress()
    } catch {
      return defaultProgress()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // Silently fail if storage is not available
    }
  }, [progress])

  const getSubjectProgress = useCallback(
    (id) => {
      return progress[id] ?? defaultSubjectProgress()
    },
    [progress]
  )

  const updateProgress = useCallback((id, field, value) => {
    setProgress((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? defaultSubjectProgress()),
        [field]: value,
        lastStudied: new Date().toISOString(),
      },
    }))
  }, [])

  const incrementProgress = useCallback((id, field, amount = 1) => {
    setProgress((prev) => {
      const current = prev[id] ?? defaultSubjectProgress()
      return {
        ...prev,
        [id]: {
          ...current,
          [field]: (current[field] ?? 0) + amount,
          lastStudied: new Date().toISOString(),
        },
      }
    })
  }, [])

  const getOverallStats = useCallback(() => {
    const subjects = SUBJECT_REGISTRY
    let totalFlashcards = 0
    let totalMastered = 0
    let totalBarAttempted = 0
    let totalStudyMinutes = 0

    subjects.forEach((s) => {
      totalFlashcards += s.flashcards.length
      const sp = progress[s.id] ?? defaultSubjectProgress()
      totalMastered += Math.min(sp.flashcardsMastered, s.flashcards.length)
      totalBarAttempted += sp.barQuestionsAttempted
      totalStudyMinutes += sp.totalStudyMinutes
    })

    const overallPercent =
      totalFlashcards > 0
        ? Math.round((totalMastered / totalFlashcards) * 100)
        : 0

    return {
      totalFlashcards,
      totalMastered,
      totalBarAttempted,
      totalStudyMinutes,
      overallPercent,
      subjectCount: subjects.length,
    }
  }, [progress])

  const getSubjectPercent = useCallback(
    (id) => {
      const subject = SUBJECT_REGISTRY.find((s) => s.id === id)
      if (!subject) return 0
      const sp = progress[id] ?? defaultSubjectProgress()
      const total = subject.flashcards.length
      if (total === 0) return 0
      return Math.round((Math.min(sp.flashcardsMastered, total) / total) * 100)
    },
    [progress]
  )

  return {
    progress,
    getSubjectProgress,
    updateProgress,
    incrementProgress,
    getOverallStats,
    getSubjectPercent,
  }
}
