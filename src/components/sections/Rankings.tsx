import { motion } from 'framer-motion'
import './Rankings.css'

export default function Rankings() {
    return (
        <section id="rankings" className="rankings-section">
            <div className="rankings-inner">
                <motion.div
                    className="rankings-visual"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src="/raeth-assets/raeth-rankings.png" alt="Model Rankings" />
                </motion.div>

                <motion.div
                    className="rankings-text"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="label">Evaluations</div>
                    <h2>Model Rankings</h2>
                    <div className="rankings-body">
                        <p>RAETH continuously evaluates frontier models.</p>
                        <p>Agents run thousands of tasks across trading environments.</p>
                        <p>Signals accumulate.<br />Rankings emerge.</p>
                        <p className="rankings-em">The strongest models rise.</p>
                    </div>
                    <a href="#" className="section-link">View Rankings →</a>
                </motion.div>
            </div>
        </section>
    )
}
