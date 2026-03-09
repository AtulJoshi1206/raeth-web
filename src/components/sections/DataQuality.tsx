import { motion } from 'framer-motion'
import './DataQuality.css'

const cards = [
  { icon: '✓', title: 'Verified Track Records', desc: 'All contributors have documented trading performance and multi-year market experience across asset classes.' },
  { icon: '◆', title: 'Production-Grade Data', desc: 'Real market dynamics captured accurately — order books, slippage modeling, volatility regime shifts.' },
  { icon: '■', title: 'Multi-Domain Coverage', desc: 'Comprehensive datasets spanning HFT, statistical arbitrage, macro, and fundamental trading strategies.' },
]

export default function DataQuality() {
  return (
    <section className="quality-section">
      <div className="quality-bg">
        <img src="/assets/ai-compute-cluster.png" alt="" className="animate-bg-pan" />
      </div>
      <div className="quality-inner">
        <motion.div
          className="quality-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label">Data Integrity</div>
          <h2>Built on real trades.<br />Validated by real P&L.</h2>
          <p>High-performance AI requires robust, verifiable, production-grade data.</p>
        </motion.div>

        <div className="quality-cards">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="quality-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="quality-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="quality-footer">
          <p><strong>Every contributor has a verified multi-year trading record.</strong><br />Every dataset reflects real market conditions.</p>
          <a href="/methodology" className="methodology-cta" onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/methodology');
            window.dispatchEvent(new Event('popstate'));
          }}>
            See our methodology <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
