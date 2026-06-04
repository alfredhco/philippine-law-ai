import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/auth/ProtectedRoute'

const Dashboard      = lazy(() => import('./pages/Dashboard'))
const SubjectLibrary = lazy(() => import('./pages/SubjectLibrary'))
const SubjectDashboard = lazy(() => import('./pages/SubjectDashboard'))
const CodalStudy     = lazy(() => import('./pages/CodalStudy'))
const BarReview      = lazy(() => import('./pages/BarReview'))
const Flashcards     = lazy(() => import('./pages/Flashcards'))
const OralRecitation = lazy(() => import('./pages/OralRecitation'))
const IssueSpotting  = lazy(() => import('./pages/IssueSpotting'))
const IRACTrainer    = lazy(() => import('./pages/IRACTrainer'))
const Analytics      = lazy(() => import('./pages/Analytics'))
const Settings       = lazy(() => import('./pages/Settings'))
const AICoach        = lazy(() => import('./pages/AICoach'))
const Login          = lazy(() => import('./pages/Login'))

function PageLoader() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-navy-800 rounded-xl" />
      <div className="h-40 bg-navy-800 rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-navy-800 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="h-48 bg-navy-800 rounded-2xl lg:col-span-2" />
        <div className="h-48 bg-navy-800 rounded-2xl" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public auth route */}
              <Route path="/login" element={<Login />} />

              {/* Protected app shell */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route index                      element={<Dashboard />}        />
                <Route path="subjects"            element={<SubjectLibrary />}   />
                <Route path="subjects/:subjectId" element={<SubjectDashboard />} />
                <Route path="codal"               element={<CodalStudy />}       />
                <Route path="bar-review"          element={<BarReview />}        />
                <Route path="flashcards"          element={<Flashcards />}       />
                <Route path="oral"                element={<OralRecitation />}   />
                <Route path="issue-spotting"      element={<IssueSpotting />}    />
                <Route path="irac"                element={<IRACTrainer />}      />
                <Route path="analytics"           element={<Analytics />}        />
                <Route path="ai-coach"            element={<AICoach />}          />
                <Route path="settings"            element={<Settings />}         />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}
