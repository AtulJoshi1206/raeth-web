import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Pipeline.css'

const steps = [
  {
    num: '01',
    title: 'Market Data Collection',
    desc: '8 years of multi-asset tick data, order books, and macro indicators across global markets.',
    detail: 'forex · equities · futures · crypto',
    image: '/assets/market-chaos.png',
  },
  {
    num: '02',
    title: 'Expert Trade Annotation',
    desc: 'Professional traders annotate reasoning traces on real historical scenarios with full context.',
    detail: 'reasoning · risk · conviction · timing',
    code: '{\n  "signal": "EUR/USD divergence",\n  "action": "SHORT",\n  "reasoning": "ECB hawkish pivot"\n}',
  },
  {
    num: '03',
    title: 'SFT Dataset Construction',
    desc: 'Structured input-output pairs: market state mapped to expert decision with full rationale chain.',
    detail: 'state → decision → rationale → P&L',
    image: '/assets/training-pipeline.png',
  },
  {
    num: '04',
    title: 'Evaluation & Benchmarking',
    desc: 'Custom benchmarks measuring risk management, drawdown control, and alpha generation across regimes.',
    detail: 'sharpe · sortino · max_dd · calmar',
    image: '/assets/metrics-particles.png',
  },
  {
    num: '05',
    title: 'RL Environment Training',
    desc: 'Order book simulation with market impact, slippage modeling, regime changes, and adversarial agents.',
    detail: 'gym · reward_shaping · curriculum',
    image: '/assets/ai-compute-cluster.png',
  },
  {
    num: '06',
    title: 'Production Trading Agent',
    desc: 'Deployed model with live market integration, real-time risk management, and continuous learning loop.',
    detail: 'live · monitored · adaptive',
  },
]

const cardVariants = {
  hidden: (side: 'left' | 'right') => ({
    opacity: 0,
    x: side === 'left' ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="pipeline" className="pipeline-section" ref={containerRef}>
      <motion.div
        className="pipeline-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="label">How It Works</div>
        <h2>Training Pipeline</h2>
        <p>The entire stack required to transform generalized reasoning into specialized market execution.</p>
      </motion.div>

      <div className="pipeline-timeline">
        {/* Animated spine line */}
        <div className="pipeline-spine">
          <motion.div className="pipeline-spine-fill" style={{ height: lineHeight }} />
        </div>

        {steps.map((step, i) => {
          const side = i % 2 === 0 ? 'left' : 'right'
          return (
            <motion.div
              key={step.num}
              className={`pipeline-card pipeline-card--${side}`}
              custom={side}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="pipeline-card-dot" />
              <div className="pipeline-card-content">
                <span className="pipeline-card-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <span className="pipeline-card-detail">{step.detail}</span>
                {step.code && (
                  <pre className="pipeline-card-code">{step.code}</pre>
                )}
                {step.image && (
                  <div className="pipeline-card-image">
                    <img src={step.image} alt={step.title} className="animate-bg-pan" />
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
