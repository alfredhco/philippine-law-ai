import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, Mail, Lock, User, Calendar, Eye, EyeOff, Sparkles, ArrowRight, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const TAB_LABELS = ['Sign In', 'Create Account', 'Magic Link']

function InputField({ icon: Icon, label, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full pl-9 pr-9 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gold-500/50 transition-colors"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  )
}

function ErrorMsg({ msg }) {
  if (!msg) return null
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
      {msg}
    </motion.div>
  )
}

function SuccessMsg({ msg }) {
  if (!msg) return null
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
      {msg}
    </motion.div>
  )
}

export default function Login() {
  const { signIn, signUp, signInWithMagicLink, isAuthenticated } = useAuth()
  const [tab,      setTab]      = useState(0)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')

  // Sign-in form
  const [siEmail, setSiEmail] = useState('')
  const [siPass,  setSiPass]  = useState('')

  // Sign-up form
  const [suEmail,   setSuEmail]   = useState('')
  const [suPass,    setSuPass]    = useState('')
  const [suName,    setSuName]    = useState('')
  const [suBarYear, setSuBarYear] = useState('2026')

  // Magic link
  const [mlEmail, setMlEmail] = useState('')

  if (isAuthenticated) return <Navigate to="/" replace />

  const reset = () => { setError(''); setSuccess('') }

  const handleSignIn = async (e) => {
    e.preventDefault(); reset(); setLoading(true)
    const { error } = await signIn({ email: siEmail, password: siPass })
    setLoading(false)
    if (error) setError(error.message)
  }

  const handleSignUp = async (e) => {
    e.preventDefault(); reset(); setLoading(true)
    const { error, needsConfirmation } = await signUp({ email: suEmail, password: suPass, displayName: suName || 'Counsel', barYear: suBarYear })
    setLoading(false)
    if (error) setError(error.message)
    else if (needsConfirmation) setSuccess('Check your email to confirm your account, then sign in.')
  }

  const handleMagicLink = async (e) => {
    e.preventDefault(); reset(); setLoading(true)
    const { error } = await signInWithMagicLink(mlEmail)
    setLoading(false)
    if (error) setError(error.message)
    else setSuccess('Magic link sent! Check your email and click the link to sign in.')
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-accent-orange flex items-center justify-center shadow-glow">
            <Scale size={24} className="text-navy-950" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-xl font-bold text-white">PH Law AI</h1>
            <p className="text-xs text-gray-500 mt-0.5">Philippine Bar Exam Companion</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-6 space-y-5">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-navy-800 rounded-xl">
            {TAB_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => { setTab(i); reset() }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === i ? 'bg-gold-500 text-navy-950' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── Sign In ── */}
            {tab === 0 && (
              <motion.form key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSignIn} className="space-y-4">
                <ErrorMsg msg={error} />
                <SuccessMsg msg={success} />
                <InputField icon={Mail}  label="Email"    type="email"    value={siEmail} onChange={setSiEmail} placeholder="counsel@lawschool.edu" autoComplete="email" />
                <InputField icon={Lock}  label="Password" type="password" value={siPass}  onChange={setSiPass}  placeholder="••••••••" autoComplete="current-password" />
                <button type="submit" disabled={loading || !siEmail || !siPass}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <div className="w-4 h-4 border-2 border-navy-950/40 border-t-transparent rounded-full animate-spin" /> : <><ArrowRight size={14} /> Sign In</>}
                </button>
                <p className="text-center text-xs text-gray-600">
                  No account?{' '}
                  <button type="button" onClick={() => setTab(1)} className="text-gold-400 hover:text-gold-300">Create one</button>
                </p>
              </motion.form>
            )}

            {/* ── Sign Up ── */}
            {tab === 1 && (
              <motion.form key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSignUp} className="space-y-4">
                <ErrorMsg msg={error} />
                <SuccessMsg msg={success} />
                <InputField icon={User}  label="Display Name" value={suName}  onChange={setSuName}  placeholder="Counsel" autoComplete="name" />
                <InputField icon={Mail}  label="Email"        type="email"    value={suEmail} onChange={setSuEmail} placeholder="counsel@lawschool.edu" autoComplete="email" />
                <InputField icon={Lock}  label="Password"     type="password" value={suPass}  onChange={setSuPass}  placeholder="Min. 6 characters" autoComplete="new-password" />
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    <Calendar size={12} className="inline mr-1.5" />Target Bar Year
                  </label>
                  <select value={suBarYear} onChange={e => setSuBarYear(e.target.value)}
                    className="w-full px-3 py-2.5 bg-navy-800 border border-navy-700 rounded-xl text-sm text-gray-200 outline-none focus:border-gold-500/50">
                    {['2025','2026','2027','2028'].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={loading || !suEmail || !suPass}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <div className="w-4 h-4 border-2 border-navy-950/40 border-t-transparent rounded-full animate-spin" /> : <><Sparkles size={14} /> Create Account</>}
                </button>
              </motion.form>
            )}

            {/* ── Magic Link ── */}
            {tab === 2 && (
              <motion.form key="magic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleMagicLink} className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">Enter your email and we'll send a passwordless sign-in link.</p>
                <ErrorMsg msg={error} />
                <SuccessMsg msg={success} />
                <InputField icon={Mail} label="Email" type="email" value={mlEmail} onChange={setMlEmail} placeholder="counsel@lawschool.edu" autoComplete="email" />
                <button type="submit" disabled={loading || !mlEmail}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-gold-500 to-accent-orange text-navy-950 font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <div className="w-4 h-4 border-2 border-navy-950/40 border-t-transparent rounded-full animate-spin" /> : <><Send size={14} /> Send Magic Link</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-700 mt-4">
          Philippine Law AI Companion · Personal use only
        </p>
      </motion.div>
    </div>
  )
}
