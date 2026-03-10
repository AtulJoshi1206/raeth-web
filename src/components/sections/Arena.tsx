import { motion } from 'framer-motion'
import './Arena.css'

export default function Arena() {
    return (
        <section id="arena" className="arena-section">
            <div className="arena-inner">
                <motion.div
                    className="arena-text"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="label">Raeth System</div>
                    <h2>AI Arena</h2>
                    <div className="arena-body">
                        <p>Frontier AI models compete in hidden environments.</p>
                        <p>Agents run tasks, collect signals, and evaluate outcomes.</p>
                        <p>Performance emerges through competition.</p>
                    </div>
                    <a href="#" className="arena-link">Explore Arena →</a>
                </motion.div>

                <motion.div
                    className="arena-visual"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src="/raeth-assets/raeth-arena.png" alt="AI Arena" />
                </motion.div>
            </div>
        </section>
    )
}
