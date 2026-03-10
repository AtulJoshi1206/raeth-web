import { motion } from 'framer-motion'
import './Domains.css'

const domains = [
  { icon: '⚡', title: 'HFT', desc: 'Sub-second signals. Market microstructure reasoning. Latency-sensitive decision making.' },
  { icon: '🕸', title: 'Statistical Arbitrage', desc: 'Factor models, cross-asset signals, mean-reversion strategies across correlated instruments.' },
  { icon: '🌍', title: 'Macro Trading', desc: 'Geopolitics, interest rates, global capital flows. Multi-horizon directional positioning.' },
  { icon: '▲', title: 'Fundamental', desc: 'Valuation, earnings analysis, long-term capital allocation based on company fundamentals.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Domains() {
  return (
    <section id="domains" className="domains-section">
      <motion.div
        className="domains-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="label">Coverage</div>
        <h2>Four Market Domains.<br />Four Styles of Intelligence.</h2>
      </motion.div>

      <div className="domains-grid">
        {domains.map((d, i) => (
          <motion.div
            key={d.title}
            className="domain-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <span className="domain-icon">{d.icon}</span>
            <h4>{d.title}</h4>
            <p>{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
