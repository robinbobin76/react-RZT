import { useEffect, useRef, useState } from 'react'

export default function SmoothSlider({ value, max = 10, color = 'blue', onChange }) {
  const [animatedValue, setAnimatedValue] = useState(value)
  const rafRef = useRef()

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)

    const animate = () => {
      setAnimatedValue((prev) => {
        const delta = value - prev
        if (Math.abs(delta) < 0.02) {
          return value
        }
        rafRef.current = requestAnimationFrame(animate)
        return prev + delta * 0.18
      })
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  const progress = `${(animatedValue / max) * 100}%`

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
