import { useMemo, useState } from 'react'

const rubric = [
  { id: 'rhyme', label: 'Рифмы / Образы', color: 'blue', max: 10, defaultValue: 5, weight: 2 },
  { id: 'rhythm', label: 'Структура / Ритмика', color: 'blue', max: 10, defaultValue: 5, weight: 2 },
  { id: 'style', label: 'Реализация стиля', color: 'blue', max: 10, defaultValue: 9, weight: 2 },
  {
    id: 'charisma',
    label: 'Индивидуальность / Харизма',
    color: 'blue',
    max: 10,
    defaultValue: 10,
    weight: 2,
  },
  { id: 'vibe', label: 'Атмосфера / Вайб', color: 'purple', max: 10, defaultValue: 10, weight: 1 },
]

const tracks = [
  'OG Buda - SZN',
  'MAYOT - Тони',
  'BUSHIDO ZHO - Ревность',
  'SEEMEE - Jungle',
  'Friendly Thug - Diamond Tears',
  'Kizaru - Хоть куда-то',
  'LIL KRYSTALLL - Crystal Cave',
  'JEEMBO - BRAT',
  'SODA LUV - SAKURA',
  'SALUKI - Тёмный рыцарь',
  'OBLADAET - CANDY SHOP',
  'Big Baby Tape - Gimme the Loot',
  'MORGENSHTERN - Cristal & МОЁТ',
  'Платина - Сан Ларан',
]

const TIERS = ['S', 'A', 'B', 'C', 'D']

function App() {
  const [page, setPage] = useState('score')
  const [selectedTrack, setSelectedTrack] = useState(tracks[0])
  const [values, setValues] = useState(() =>
    rubric.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultValue }), {}),
  )
  const [tierState, setTierState] = useState(() => ({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    Pool: tracks,
  }))

  const total = useMemo(
    () => rubric.reduce((sum, item) => sum + values[item.id] * item.weight, 0),
    [values],
  )

  const onDropTrack = (targetTier, track) => {
    setTierState((prev) => {
      const next = Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, v.filter((t) => t !== track)]))
      next[targetTier] = [...next[targetTier], track]
      return next
    })
  }

  return (
    <div className="app-shell">
      <div className="noise-layer" />
      <div className="app-content">
        <header className="topbar">
          <h1>RZT Review Board</h1>
          <div className="page-switch">
            <button className={page === 'score' ? 'active' : ''} onClick={() => setPage('score')}>
              Оценка трека
            </button>
            <button className={page === 'tier' ? 'active' : ''} onClick={() => setPage('tier')}>
              Тир лист
            </button>
          </div>
        </header>

        {page === 'score' ? (
          <section className="card animate-in">
            <div className="track-row">
              <div className="cover">◉</div>
              <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)}>
                {tracks.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            <div className="scores-grid">
              {rubric.map((item) => (
                <label key={item.id} className={`metric ${item.color}`}>
                  <div className="metric-head">
                    <span>{item.label}</span>
                    <b>{values[item.id]}</b>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={item.max}
                    value={values[item.id]}
                    onChange={(e) => setValues((prev) => ({ ...prev, [item.id]: Number(e.target.value) }))}
                  />
                </label>
              ))}
            </div>

            <div className="total-row">
              <div className="check">✓</div>
              <div>
                <div className="total-value">{total} <small>/ 90</small></div>
                <div className="parts">{rubric.map((item) => values[item.id]).join('  ')}</div>
              </div>
            </div>
          </section>
        ) : (
          <section className="tier-page animate-in">
            {['Pool', ...TIERS].map((tier) => (
              <div
                key={tier}
                className={`tier-row ${tier}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const track = e.dataTransfer.getData('text/plain')
                  if (track) onDropTrack(tier, track)
                }}
              >
                <div className="tier-label">{tier === 'Pool' ? 'Треки' : `${tier} Tier`}</div>
                <div className="tier-items">
                  {tierState[tier].map((track) => (
                    <button
                      key={track}
                      className="tier-item"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', track)}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default App
