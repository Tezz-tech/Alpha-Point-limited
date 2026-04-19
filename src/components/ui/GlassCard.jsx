import { motion } from 'framer-motion'

/**
 * Glassmorphism card on dark navy backgrounds.
 * variant: 'default' | 'light'
 */
export default function GlassCard({
  children,
  className = '',
  hover = true,
  variant = 'default',
  style = {},
  ...props
}) {
  const baseStyle = {
    background: variant === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(200,75,17,0.15)',
    borderRadius: '8px',
    ...style,
  }

  if (hover) {
    return (
      <motion.div
        className={`overflow-hidden ${className}`}
        style={baseStyle}
        whileHover={{
          y: -8,
          boxShadow: '0 20px 60px rgba(200,75,17,0.25)',
          borderColor: 'rgba(200,75,17,0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} style={baseStyle} {...props}>
      {children}
    </div>
  )
}
