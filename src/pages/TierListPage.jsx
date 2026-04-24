import { useState } from 'react'

const TIERS = ['S', 'A', 'B', 'C', 'D']

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
  'Платина - Сан Ларан',
]

export default function TierListPage() {
  const [tierState, setTierState] = useState(() => ({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    Pool: tracks,
  }))

  const onDropTrack = (targetTier, track) => {
    setTierState((prev) => {
      const next = Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, v.filter((t) => t !== track)]))
      next[targetTier] = [...next[targetTier], track]
      return next
    })
  }

  return (
    <section className="tier-layout animate-in">
      <div className="tiers-left">
        {TIERS.map((tier) => (
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
            <div className="tier-label">{tier}</div>
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
      </div>

      <aside
        className="tracks-right"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const track = e.dataTransfer.getData('text/plain')
          if (track) onDropTrack('Pool', track)
        }}
      >
        <h3>Треки (13)</h3>
        <div className="tracks-pool">
          {tierState.Pool.map((track) => (
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
      </aside>
    </section>
  )
}
