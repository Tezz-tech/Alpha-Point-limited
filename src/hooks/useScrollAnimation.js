import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Applies a GSAP ScrollTrigger reveal to all `.reveal` children
 * inside the returned containerRef.
 */
export function useScrollAnimation(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal')
    if (!elements.length) return

    const animations = []

    elements.forEach((el, i) => {
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.8,
          delay: options.stagger ? i * options.stagger : 0,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
      animations.push(anim)
    })

    return () => {
      animations.forEach((anim) => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill()
        anim.kill()
      })
    }
  }, [options.y, options.duration, options.stagger, options.ease, options.start])

  return containerRef
}

/**
 * Single-element reveal hook.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
      anim.kill()
    }
  }, [])

  return ref
}
