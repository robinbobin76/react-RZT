import { useMemo, useState } from 'react'
import SmoothSlider from '../components/SmoothSlider'

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

export default function AlbumRatingPage() {
  const [values, setValues] = useState(() =>
    rubric.reduce((acc, item) => ({ ...acc, [item.id]: item.defaultValue }), {}),
  )

  const total = useMemo(
    () => rubric.reduce((sum, item) => sum + values[item.id] * item.weight, 0),
    [values],
  )

  return (
    <section className="card animate-in">
      <div className="album-header">
        <img className="album-cover" src="/whln-cover.svg" alt="As Arrial Damn - What Happens LN? cover" />
        <div>
          <p className="album-caption">Оценка альбома</p>
          <h2>As Arrial Damn - What Happens LN?</h2>
        </div>
      </div>

      <div className="scores-grid">
        {rubric.map((item) => (
          <label key={item.id} className={`metric ${item.color}`}>
            <div className="metric-head">
              <span>{item.label}</span>
              <b>{values[item.id]}</b>
            </div>
            <SmoothSlider
              value={values[item.id]}
              max={item.max}
              color={item.color}
              onChange={(e) => setValues((prev) => ({ ...prev, [item.id]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <div className="total-row">
        <div className="check">✓</div>
        <div>
          <div className="total-value">
            {total} <small>/ 90</small>
          </div>
          <div className="parts">{rubric.map((item) => values[item.id]).join('  ')}</div>
        </div>
      </div>
    </section>
  )
}
