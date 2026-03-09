import { motion } from 'framer-motion'
import IntelligenceAnimation from '../ui/IntelligenceAnimation'
import './Philosophy.css'

export default function Philosophy() {
  return (
    <section className="philosophy">
      <div className="philosophy-inner">
        <motion.div
          className="philosophy-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="philosophy-q">Where does intelligence come from?</p>
          <div className="philosophy-body">
            <p className="em">Experience.</p>
            <motion.p
              className="accent-block text-gradient"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              Markets collapsing. Currencies breaking.<br />
              Billions moving in minutes.
            </motion.p>
            <p>Thousands of decisions under uncertainty.</p>
            <p>Patterns emerging from chaos.</p>
            <p className="spacer em">
              Data does for artificial intelligence<br />
              what life does for humans.
            </p>
            <p className="em">It turns capability into judgment.</p>
          </div>
        </motion.div>
        <motion.div
          className="philosophy-terminal"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <IntelligenceAnimation />
        </motion.div>
      </div>
    </section>
  )
}
