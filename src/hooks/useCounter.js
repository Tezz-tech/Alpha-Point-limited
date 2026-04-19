import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `target` over `duration` ms
 * when the element enters the viewport.
 */
export function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const numericTarget = parseInt(target, 10)
    if (isNaN(numericTarget)) {
      setCount(target)
      return
    }

    let startTime = null
    const startValue = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quad
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * (numericTarget - startValue) + startValue)
      setCount(current)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(numericTarget)
      }
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [hasStarted, target, duration])

  return { count, ref }
}
