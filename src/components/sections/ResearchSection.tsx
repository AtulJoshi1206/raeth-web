import { motion } from 'framer-motion'
import './ResearchSection.css'

const topics = [
    'strategic reasoning',
    'adversarial environments',
    'agent collaboration',
    'decision-making under uncertainty',
]

export default function ResearchSection() {
    return (
        <section id="research" className="research-section">
            <div className="research-inner">
                <motion.div
                    className="research-text"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="label">Intelligence</div>
                    <h2>Research</h2>
                    <div className="research-body">
                        <p>RAETH studies how intelligence emerges through competition.</p>
                        <p className="research-sub">Our research explores:</p>
                        <ul className="research-list">
                            {topics.map((t) => (
                                <li key={t}>
                                    <span className="dot" />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a href="#" className="section-link">See Research →</a>
                </motion.div>

                <motion.div
                    className="research-visual"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src="/raeth-assets/raeth-research.png" alt="Research Visualization" />
                </motion.div>
            </div>
        </section>
    )
}
