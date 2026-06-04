import { useState, useEffect, useRef } from 'react'

const STREAK_KEY = 'ph-law-streak'
const SESSION_KEY = 'ph-law-session'

export function useStudySession() {
  const [isActive, setIsActive] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [streak, setStreak] = useState(() => {
    try {
      const stored = localStorage.getItem(STREAK_KEY)
      return stored ? JSON.parse(stored) : { count: 7, lastStudied: new Date().toDateString() }
    } catch {
      return { count: 7, lastStudied: new Date().toDateString() }
    }
  })
  const [todayMinutes, setTodayMinutes] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      const session = stored ? JSON.parse(stored) : null
      if (session?.date === new Date().toDateString()) return session.minutes
      return 0
    } catch {
      return 0
    }
  })

  const intervalRef = useRef(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => e + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isActive])

  const startSession = () => setIsActive(true)
  const pauseSession = () => setIsActive(false)

  const endSession = () => {
    setIsActive(false)
    const minutes = Math.floor(elapsed / 60)
    const newTotal = todayMinutes + minutes
    setTodayMinutes(newTotal)
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      date: new Date().toDateString(),
      minutes: newTotal,
    }))
    setElapsed(0)

    const today = new Date().toDateString()
    if (streak.lastStudied !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const newCount = streak.lastStudied === yesterday ? streak.count + 1 : 1
      const newStreak = { count: newCount, lastStudied: today }
      setStreak(newStreak)
      localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak))
    }
  }

  const formatElapsed = () => {
    const m = Math.floor(elapsed / 60)
    const s = elapsed % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return {
    isActive,
    elapsed,
    formatElapsed,
    streak,
    todayMinutes,
    startSession,
    pauseSession,
    endSession,
  }
}
