import { Link } from 'react-router-dom'
import GridMenuItem from './GridMenuItem'
import './gridMenu.css'

function preloadGame1() {
  void import('@/views/Game1')
  void import('@/views/Game1/Game1LevelSelect')
}
function preloadGame2() {
  void import('@/views/Game2')
  void import('@/views/Game2/Game2LevelSelect')
}
function preloadGame4() {
  void import('@/views/Game4')
  void import('@/views/Game4/Game4LevelSelect')
}

const GAMES = [
  {
    to: '/game1',
    preload: preloadGame1,
    title: 'Sílaba que Falta',
    description: 'Escucha la palabra y elige la sílaba correcta para completarla',
    color: '#3b82f6',
    preview: (
      <div className="gmi-preview gmi-preview--blue">
        <span className="gmi-tile">CA</span>
        <span className="gmi-tile gmi-tile--blank">?</span>
        <span className="gmi-tile">TA</span>
      </div>
    ),
  },
  {
    to: '/game2',
    preload: preloadGame2,
    title: 'Ordena las Sílabas',
    description: 'Arrastra las sílabas para formar la palabra en el orden correcto',
    color: '#10b981',
    preview: (
      <div className="gmi-preview gmi-preview--green">
        <span className="gmi-tile gmi-tile--dragging">RRO</span>
        <span className="gmi-tile">PE</span>
        <span className="gmi-arrow">→</span>
        <span className="gmi-tile">PE</span>
        <span className="gmi-tile">RRO</span>
      </div>
    ),
  },
  {
    to: '/game4',
    preload: preloadGame4,
    title: 'Identificación Visual',
    description: 'Encuentra todas las letras iguales a la letra modelo',
    color: '#f59e0b',
    preview: (
      <div className="gmi-preview gmi-preview--amber">
        <span className="gmi-letter gmi-letter--target">p</span>
        <span className="gmi-letter gmi-letter--distractor">q</span>
        <span className="gmi-letter gmi-letter--target">p</span>
      </div>
    ),
  },
]

export default function GridMenu() {
  return (
    <ul className="gmi-grid" role="list">
      {GAMES.map((game) => (
        <li key={game.to}>
          <Link
            to={game.to}
            className="gmi-link"
            onMouseEnter={game.preload}
            onFocus={game.preload}
            aria-label={game.title}
          >
            <GridMenuItem
              title={game.title}
              description={game.description}
              color={game.color}
              preview={game.preview}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
