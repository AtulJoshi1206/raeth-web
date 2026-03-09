import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import './Metrics.css'

const metrics = [
  { value: '$30M+', desc: 'Founder trading track record', gradient: true },
  { value: '8', unit: 'Yrs', desc: 'Market data history', gradient: false },
  { value: 'Elite', desc: 'Professional trading background', gradient: false },
  { value: '4', desc: 'Trading domains covered', gradient: false },
]

export default function Metrics() {
  return (
    <motion.div
      className="metrics-grid"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="metrics-bg">
        <img src="/assets/metrics-particles.png" alt="" className="animate-bg-drift" />
      </div>
      <div className="metrics-label">TRACK RECORD</div>
      {metrics.map((m, i) => (
        <div key={i} className="metric">
          <div className="metric-val">
            {m.gradient ? (
              <AnimatedCounter target={m.value} className="grad" />
            ) : (
              <>
                {m.value}
                {m.unit && <span className="unit"> {m.unit}</span>}
              </>
            )}
          </div>
          <div className="metric-desc">{m.desc}</div>
        </div>
      ))}
    </motion.div>
  )
}
