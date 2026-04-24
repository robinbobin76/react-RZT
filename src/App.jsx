import { useState } from 'react'
import AlbumRatingPage from './pages/AlbumRatingPage'
import TierListPage from './pages/TierListPage'

function App() {
  const [page, setPage] = useState('album')

  return (
    <div className="app-shell">
      <div className="noise-layer" />
      <div className="app-content">
        <header className="topbar">
          <h1>RZT Review Board</h1>
          <div className="page-switch">
            <button className={page === 'album' ? 'active' : ''} onClick={() => setPage('album')}>
              Оценка альбома
            </button>
            <button className={page === 'tier' ? 'active' : ''} onClick={() => setPage('tier')}>
              Тир лист
            </button>
          </div>
        </header>

        {page === 'album' ? <AlbumRatingPage /> : <TierListPage />}
      </div>
    </div>
  )
}

export default App
