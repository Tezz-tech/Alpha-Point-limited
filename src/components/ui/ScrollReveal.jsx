import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

/**
 * Wraps children in a scroll-triggered reveal animation.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 50,
  x = 0,
  once = true,
  threshold = 0.2,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y, x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
