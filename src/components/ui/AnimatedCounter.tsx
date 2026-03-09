import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target: string
  className?: string
}

export default function AnimatedCounter({ target, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (!isInView) return

    // Extract numeric value and prefix/suffix
    const match = target.match(/^([^0-9]*)(\d+)(.*)$/)
    if (!match) {
      setDisplay(target)
      return
    }

    const [, prefix, numStr, suffix] = match
    const end = parseInt(numStr, 10)
    const duration = 1200
    const steps = 30
    const stepTime = duration / steps

    let current = 0
    const increment = end / steps

    const interval = setInterval(() => {
      current += increment
      if (current >= end) {
        current = end
        clearInterval(interval)
      }
      setDisplay(`${prefix}${Math.round(current)}${suffix}`)
    }, stepTime)

    return () => clearInterval(interval)
  }, [isInView, target])

  return <span ref={ref} className={className}>{display}</span>
}
