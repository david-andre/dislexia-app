import { Link } from 'react-router-dom'
import GridMenuItem from './GridMenuItem'
import './gridMenu.css'

function preloadGame1() {
  void import('@/views/Game1')
}
function preloadGame2() {
  void import('@/views/Game2')
}
function preloadGame4() {
  void import('@/views/Game4')
}
function preloadGame5() {
  void import('@/views/Game5')
}
function preloadGame6() {
  void import('@/views/Game6')
}

export default function GridMenu() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <Link
        to="/game1"
        className="gmi-link"
        onMouseEnter={preloadGame1}
        onFocus={preloadGame1}
      >
        <GridMenuItem key="1" />
      </Link>
      <Link
        to="/game2"
        className="gmi-link"
        onMouseEnter={preloadGame2}
        onFocus={preloadGame2}
      >
        <GridMenuItem key="2" />
      </Link>
      <Link
        to="/game4"
        className="gmi-link"
        onMouseEnter={preloadGame4}
        onFocus={preloadGame4}
      >
        <GridMenuItem key="3" />
      </Link>
      <Link
        to="/game5"
        className="gmi-link"
        onMouseEnter={preloadGame5}
        onFocus={preloadGame5}
      >
        <GridMenuItem key="4" />
      </Link>
      <Link
        to="/game6"
        className="gmi-link"
        onMouseEnter={preloadGame6}
        onFocus={preloadGame6}
      >
        <GridMenuItem key="5" />
      </Link>
    </ul>
  )
}
