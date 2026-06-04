import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseEnabled } from '../lib/supabase'
import { syncAll, getLastSync } from '../lib/sync'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isSupabaseEnabled)
  const [syncing, setSyncing] = useState(false)
  const [lastSync,setLastSync] = useState(() => getLastSync())

  const loadProfile = useCallback(async (uid) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).single()
    if (data) { setProfile(data); return }
    // Auto-create profile if trigger didn't fire
    if (error?.code === 'PGRST116') {
      const { data: created } = await supabase.from('profiles').insert({ id: uid, display_name: 'Counsel', bar_year: '2026' }).select().single()
      if (created) setProfile(created)
    }
  }, [])

  const doSync = useCallback(async (uid, direction = 'both') => {
    setSyncing(true)
    const result = await syncAll(uid, direction)
    setSyncing(false)
    if (result.success) setLastSync(new Date().toISOString())
    return result
  }, [])

  useEffect(() => {
    if (!isSupabaseEnabled) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) { loadProfile(u.id); doSync(u.id) }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        loadProfile(u.id)
        if (event === 'SIGNED_IN') doSync(u.id)
      } else {
        setProfile(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [loadProfile, doSync])

  // ─── Auth actions ────────────────────────────────────────────────────────────
  async function signIn({ email, password }) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signUp({ email, password, displayName = 'Counsel', barYear = '2026' }) {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: displayName } },
    })
    if (!error && data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, display_name: displayName, bar_year: barYear, updated_at: new Date().toISOString() })
    }
    return { error, needsConfirmation: !error && !data?.session }
  }

  async function signInWithMagicLink(email) {
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
    return { error }
  }

  async function signOut() {
    if (user) { setSyncing(true); await syncAll(user.id, 'push'); setSyncing(false) }
    await supabase.auth.signOut()
    setUser(null); setProfile(null)
  }

  async function updateProfile(updates) {
    if (!user) return { error: new Error('Not signed in') }
    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })
    if (!error) await loadProfile(user.id)
    return { error }
  }

  async function manualSync() {
    if (!user) return { success: false, reason: 'Not signed in' }
    return doSync(user.id, 'both')
  }

  return (
    <AuthContext.Provider value={{
      user, profile, loading, syncing, lastSync,
      isAuthenticated: !!user,
      isEnabled: isSupabaseEnabled,
      signIn, signUp, signInWithMagicLink, signOut,
      updateProfile, manualSync,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
