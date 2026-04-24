export default function SmoothSlider({ value, max = 10, color = 'blue', onChange }) {
  const progress = `${(value / max) * 100}%`

  return (
    <input
      className={`smooth-slider ${color}`}
      type="range"
      min={0}
      max={max}
      value={value}
      onChange={onChange}
      style={{ '--progress': progress }}
    />
  )
}
