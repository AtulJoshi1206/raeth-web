import { motion } from 'framer-motion'
import './Problem.css'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Problem() {
  return (
    <section id="problem" className="problem-section">
      <div className="problem-bg" aria-hidden="true">
        <img src="/assets/tech-grid.png" alt="" className="animate-bg-pan" />
      </div>
      <div className="problem-inner">
        <motion.div
          className="problem-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="label">The Problem</div>
          <h2>AI can reason about math.<br /><span className="accent">It cannot trade.</span></h2>
          <p>GPT-4, Claude, and Gemini dominate reasoning benchmarks. But markets are adversarial, dynamic systems where information is incomplete and every decision changes the environment.</p>
        </motion.div>

        <motion.div
          className="comparison"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="comparison-col">
            <div className="comparison-col-label">Static Reasoning</div>
            {['Single correct answer', 'Full information', 'No consequences'].map((item) => (
              <motion.div key={item} className="comparison-item" variants={fadeUp}>
                <span className="dot dot--muted" /> {item}
              </motion.div>
            ))}
          </div>
          <div className="comparison-col">
            <div className="comparison-col-label active">Trading</div>
            {['Probabilistic outcomes', 'Incomplete signals', 'Capital at risk'].map((item) => (
              <motion.div key={item} className="comparison-item bright" variants={fadeUp}>
                <span className="dot dot--blue" /> {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="problem-bottom">
          <div className="problem-callout">
            <p>Alpha Arena experiments showed frontier models losing over <span className="stat">80%</span> of capital in live trading environments.</p>
          </div>
          <div className="problem-quote">
            "Soros didn't solve equations. He reasoned about political pressure, market psychology, and the sustainability of economic systems."
          </div>
        </div>
      </div>
    </section>
  )
}
