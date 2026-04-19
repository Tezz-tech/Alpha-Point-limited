import { motion } from 'framer-motion'

/**
 * Primary brand button component.
 * variant: 'primary' | 'outline' | 'white'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  type = 'button',
  className = '',
  external = false,
  ...props
}) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  }

  const variantStyles = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: '2px solid var(--color-primary)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-white)',
      border: '2px solid var(--color-white)',
    },
    white: {
      background: 'var(--color-white)',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-white)',
    },
    'outline-orange': {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
  }

  const baseClass = `
    btn-shimmer inline-flex items-center justify-center gap-2
    font-body font-600 tracking-wide uppercase
    transition-all duration-300 rounded-sm
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `

  const style = variantStyles[variant] || variantStyles.primary

  const motionProps = {
    whileHover: {
      scale: 1.03,
      backgroundColor:
        variant === 'primary'
          ? 'var(--color-primary-light)'
          : variant === 'outline'
          ? 'rgba(255,255,255,0.08)'
          : undefined,
    },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseClass}
        style={style}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClass}
      style={style}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}
