import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import LoginRegister from '@/features/auth/LoginRegister'

const MainPage = lazy(() => import('@/views/MainPage'))
const GamesMenu = lazy(() => import('@/views/GamesMenu'))
const Statistics = lazy(() => import('@/views/Statistics'))
const Game1LevelSelect = lazy(() => import('@/views/Game1/Game1LevelSelect'))
const Game1 = lazy(() => import('@/views/Game1'))
const Game2LevelSelect = lazy(() => import('@/views/Game2/Game2LevelSelect'))
const Game2 = lazy(() => import('@/views/Game2'))
const Game3 = lazy(() => import('@/views/Game3'))
const Game4LevelSelect = lazy(() => import('@/views/Game4/Game4LevelSelect'))
const Game4 = lazy(() => import('@/views/Game4'))

function PageLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 min-h-screen"
      style={{ background: 'linear-gradient(135deg, #5b9bd5 0%, #7bb8e8 50%, #a8d4f0 100%)' }}
    >
      <div className="page-loader-spinner" />
      <span
        className="text-white text-2xl tracking-wide"
        style={{ fontFamily: "'Luckiest Guy', cursive" }}
      >
        Cargando...
      </span>
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
                  <Game1LevelSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game1/level/:levelId"
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
                  <Game2LevelSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game2/level/:levelId"
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
                  <Game4LevelSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game4/level/:levelId"
              element={
                <ProtectedRoute>
                  <Game4 />
                </ProtectedRoute>
              }
            />
            <Route path="/game5" element={<Navigate to="/game4" replace />} />
            <Route path="/game6" element={<Navigate to="/game4" replace />} />
            <Route path="/stadistics" element={<Navigate to="/statistics" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
