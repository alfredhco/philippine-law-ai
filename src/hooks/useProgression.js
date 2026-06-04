import { useState, useCallback } from 'react'
import { useToast } from '../context/ToastContext'
import { awardXP, recordRecitation, recordSubject, getProgressionSnapshot, setTargets, setReminder } from '../lib/progression.js'

export function useProgression() {
  const [snap, setSnap] = useState(() => getProgressionSnapshot())
  const toast = useToast()

  const refresh = useCallback(() => setSnap(getProgressionSnapshot()), [])

  const grantXP = useCallback((type, count = 1, meta = {}) => {
    const result = awardXP(type, count, meta)
    if (result.xpGained > 0) {
      toast.success(`+${result.xpGained} XP`, labelFor(type))
    }
    if (result.leveledUp) {
      setTimeout(() => toast.success(
        `Level Up! ${result.newLevel.icon} Level ${result.newLevel.level}`,
        `You are now a ${result.newLevel.title}!`
      ), 600)
    }
    result.newAchievements.forEach((badge, i) => {
      setTimeout(() => toast.success(
        `${badge.icon} Achievement Unlocked!`,
        badge.name
      ), 1200 + i * 800)
    })
    refresh()
    return result
  }, [toast, refresh])

  const submitRecitation = useCallback((score) => {
    const result = recordRecitation(score)
    result.newAchievements.forEach((badge, i) => {
      setTimeout(() => toast.success(`${badge.icon} Achievement Unlocked!`, badge.name), i * 800)
    })
    refresh()
    return result
  }, [refresh, toast])

  const trackSubject = useCallback((subjectId) => {
    recordSubject(subjectId)
    refresh()
  }, [refresh])

  const updateTargets = useCallback((targets) => {
    setTargets(targets)
    refresh()
  }, [refresh])

  const updateReminder = useCallback((time, enabled) => {
    setReminder(time, enabled)
    refresh()
  }, [refresh])

  return { ...snap, grantXP, submitRecitation, trackSubject, updateTargets, updateReminder, refresh }
}

function labelFor(type) {
  const labels = {
    flashcard_mastered:   'Flashcard mastered',
    flashcard_reviewed:   'Flashcard reviewed',
    bar_correct:          'Bar question correct',
    bar_attempted:        'Bar question attempted',
    recitation_session:   'Recitation completed',
    irac_submission:      'IRAC analysis submitted',
    issue_spotting:       'Issues spotted',
    codal_article:        'Article studied',
    study_minute:         'Study session',
    daily_target_complete:'Daily targets complete!',
    perfect_bar_score:    'Perfect score!',
    streak_bonus:         'Streak bonus',
  }
  return labels[type] ?? 'Study activity'
}
