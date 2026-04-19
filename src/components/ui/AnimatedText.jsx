import { motion } from 'framer-motion'

/**
 * Animates text word by word or character by character.
 * mode: 'words' | 'chars'
 */
export default function AnimatedText({
  text,
  mode = 'words',
  className = '',
  stagger = 0.15,
  delay = 0,
  y = 60,
  as: Tag = 'span',
}) {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
        style={{ overflow: 'hidden' }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span variants={child} style={{ display: 'inline-block' }}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    )
  }

  // chars mode
  const chars = text.split('')
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {chars.map((char, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span variants={child} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
