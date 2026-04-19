import { useCounter } from '../../hooks/useCounter'

/**
 * Animated counter that counts from 0 to `target` on scroll entry.
 * suffix: string appended after number (e.g. "+" or "%")
 */
export default function Counter({ target, suffix = '', label, className = '' }) {
  const { count, ref } = useCounter(target)

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="counter-number">
        {count}
        <span style={{ color: 'var(--color-primary)' }}>{suffix}</span>
      </div>
      {label && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '0.4rem',
          }}
        >
          {label}
        </p>
      )}
    </div>
  )
}
