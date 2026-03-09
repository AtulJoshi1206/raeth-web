import { motion } from 'framer-motion'
import './Markets.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Markets() {
  return (
    <section className="markets-section">
      <div className="markets-inner">
        <motion.div
          className="markets-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="label" custom={0} variants={fadeUp}>The Reality</motion.div>
          <motion.h2 custom={1} variants={fadeUp}>
            Markets are not problems.<br />
            <span className="accent">They are ecosystems.</span>
          </motion.h2>
          <div className="markets-body">
            <motion.p custom={2} variants={fadeUp}>Every trade changes the environment.</motion.p>
            <motion.p className="market-list" custom={3} variants={fadeUp}>
              Signals are incomplete.<br />
              Information is asymmetric.<br />
              Capital is at risk.
            </motion.p>
            <motion.p custom={4} variants={fadeUp}>
              Millions of agents compete simultaneously,<br />
              each reacting to the actions of others.
            </motion.p>
            <motion.p className="market-emphasis" custom={5} variants={fadeUp}>This is not a benchmark.</motion.p>
            <motion.p className="market-emphasis" custom={6} variants={fadeUp}>This is a living system.</motion.p>
          </div>
        </motion.div>
        <div className="markets-visual">
          <img src="/assets/market-chaos.png" alt="Market ecosystem" className="animate-bg-pan" />
        </div>
      </div>
    </section>
  )
}
