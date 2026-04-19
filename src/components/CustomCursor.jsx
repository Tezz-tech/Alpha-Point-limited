import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animateRing = () => {
      const lerp = (a, b, n) => a + (b - a) * n
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12)
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12)
      if (ring) {
        ring.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }

    const onEnterLink = () => {
      if (ring) {
        ring.style.width = '50px'
        ring.style.height = '50px'
        ring.style.borderColor = 'var(--color-primary-light)'
        ring.style.backgroundColor = 'rgba(200,75,17,0.1)'
      }
    }

    const onLeaveLink = () => {
      if (ring) {
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'var(--color-primary)'
        ring.style.backgroundColor = 'transparent'
      }
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animateRing)

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    // Re-attach when DOM mutates (for dynamic content)
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')
      els.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Small filled dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'none',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid var(--color-primary)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  )
}
