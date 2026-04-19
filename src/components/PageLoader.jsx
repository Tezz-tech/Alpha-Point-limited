import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALPHA = ['A', 'L', 'P', 'H', 'A']
const POINT = [' ', 'P', 'O', 'I', 'N', 'T']

export default function PageLoader() {
  const [show, setShow] = useState(false)
  const [slideUp, setSlideUp] = useState(false)

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('alpha_loader_seen')
    if (!alreadySeen) {
      setShow(true)
      // After 2.8s start slide-up
      const timer1 = setTimeout(() => setSlideUp(true), 2800)
      // After 3.4s remove from DOM
      const timer2 = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('alpha_loader_seen', '1')
      }, 3400)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [])

  const letterVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const lineVariant = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 1.0,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const limitedVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.5, duration: 0.6 },
    },
  }

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader-wrap"
          animate={slideUp ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(200,75,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,75,17,0.04) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              pointerEvents: 'none',
            }}
          />

          {/* Logo text */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 0,
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '0.05em',
              }}
            >
              {ALPHA.map((letter, i) => (
                <motion.span
                  key={`alpha-${i}`}
                  custom={i}
                  variants={letterVariant}
                  initial="hidden"
                  animate="visible"
                  style={{ color: 'var(--color-white)', display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
              {POINT.map((letter, i) => (
                <motion.span
                  key={`point-${i}`}
                  custom={ALPHA.length + i}
                  variants={letterVariant}
                  initial="hidden"
                  animate="visible"
                  style={{
                    color: i === POINT.length - 1 ? 'var(--color-primary)' : 'var(--color-primary)',
                    display: 'inline-block',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* "LIMITED" */}
            <motion.div
              variants={limitedVariant}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                letterSpacing: '0.5em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
              }}
            >
              LIMITED
            </motion.div>

            {/* Orange sweep line */}
            <motion.div
              variants={lineVariant}
              initial="hidden"
              animate="visible"
              style={{
                height: '2px',
                background: 'var(--color-primary)',
                marginTop: '1.5rem',
                borderRadius: '1px',
              }}
            />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                color: 'var(--color-text-muted)',
                marginTop: '1rem',
                textTransform: 'uppercase',
              }}
            >
              Building Beyond Boundaries
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
