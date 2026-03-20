import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import LoginRegister from '@/features/auth/LoginRegister'

const MainPage = lazy(() => import('@/views/MainPage'))
const GamesMenu = lazy(() => import('@/views/GamesMenu'))
const Statistics = lazy(() => import('@/views/Statistics'))
const Game1 = lazy(() => import('@/views/Game1'))
const Game2 = lazy(() => import('@/views/Game2'))
const Game3 = lazy(() => import('@/views/Game3'))
const Game4 = lazy(() => import('@/views/Game4'))
const Game5 = lazy(() => import('@/views/Game5'))
const Game6 = lazy(() => import('@/views/Game6'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-xl">Cargando...</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route
              path="/main-page"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <GamesMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <Statistics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game1"
              element={
                <ProtectedRoute>
                  <Game1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game2"
              element={
                <ProtectedRoute>
                  <Game2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game3"
              element={
                <ProtectedRoute>
                  <Game3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game4"
              element={
                <ProtectedRoute>
                  <Game4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game5"
              element={
                <ProtectedRoute>
                  <Game5 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game6"
              element={
                <ProtectedRoute>
                  <Game6 />
                </ProtectedRoute>
              }
            />
            <Route path="/stadistics" element={<Navigate to="/statistics" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
