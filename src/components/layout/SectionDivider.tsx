import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './SectionDivider.css'

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-20px' })

  return (
    <div className="section-divider" ref={ref}>
      <motion.div
        className="section-divider-line"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
