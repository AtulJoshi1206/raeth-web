import { motion } from 'framer-motion'
import './Products.css'

const products = [
  {
    num: '01',
    title: 'SFT Training Pairs',
    tag: 'Expert reasoning traces with verified P&L',
    desc: 'Models learn how experienced traders interpret signals, manage risk, and act under uncertainty — from real decisions, not synthetic data.',
  },
  {
    num: '02',
    title: 'Trading Evaluations',
    tag: 'Benchmarks designed by professional traders',
    desc: 'Measure what actually matters: risk management, drawdown control, and alpha generation across market regimes.',
  },
  {
    num: '03',
    title: 'RL Trading Gym',
    tag: 'Production-grade reinforcement learning',
    desc: 'Order book simulation, market impact modeling, slippage, and regime changes — realistic environments for training agents.',
  },
  {
    num: '04',
    title: 'Expert RLHF',
    tag: 'Human feedback from experienced traders',
    desc: 'Fine-tuning models to align with profitable trading behavior through feedback from professionals with verified track records.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Products() {
  return (
    <section id="products" className="products-section">
      <motion.div
        className="products-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="products-header-bg">
          <img src="/assets/tech-grid.png" alt="" className="animate-bg-pan" />
        </div>
        <div className="products-header-text">
          <div className="label">What We Build</div>
          <h2>Training Infrastructure<br />for AI Trading</h2>
          <p>From supervised learning to reinforcement learning environments — the full pipeline for training trading intelligence.</p>
        </div>
      </motion.div>

      <div className="products-cards">
        {products.map((p, i) => (
          <motion.div
            key={p.num}
            className="product-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <span className="product-num">{p.num}</span>
            <h3>{p.title}</h3>
            <span className="product-tag">{p.tag}</span>
            <p>{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
