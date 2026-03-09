import { motion } from 'framer-motion'
import Button from '../ui/Button'
import './CTA.css'

export default function CTA() {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-glow" />
      <motion.div
        className="cta-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Teach Your Model To Trade <span className="text-gradient">Real Markets</span></h2>
        <p>We partner with AI labs building the next generation of decision-making systems. Training data. Evaluation frameworks. Market environments.</p>
        <div className="cta-actions">
          <Button variant="white" href="mailto:vihan@raeth.ai">Partner With Us <span className="arrow">&rarr;</span></Button>
          <Button variant="ghost" href="mailto:vihan@raeth.ai">Contact Research Team</Button>
        </div>
        <a href="mailto:vihan@raeth.ai" className="cta-email">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          vihan@raeth.ai
        </a>
      </motion.div>
      <div className="cta-visual">
        <img src="/assets/hero-neural-network.png" alt="" className="animate-bg-drift" />
      </div>
    </section>
  )
}
