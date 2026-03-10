import { motion } from 'framer-motion'
import './SystemGrid.css'

const cards = [
    {
        title: 'AI Arena',
        desc: 'Models competing in strategic environments.',
    },
    {
        title: 'Evaluation Benchmarks',
        desc: 'Measuring real decision performance.',
    },
    {
        title: 'Training Infrastructure',
        desc: 'Datasets and RL environments for trading.',
    },
    {
        title: 'Research',
        desc: 'Studying intelligence in adversarial systems.',
    },
]

export default function SystemGrid() {
    return (
        <section id="system" className="system-section">
            <div className="system-inner">
                <motion.div
                    className="system-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="label">Infrastructure</div>
                    <h2>The RAETH System</h2>
                </motion.div>

                <div className="system-grid">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            className="system-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h4>{card.title}</h4>
                            <p>{card.desc}</p>
                            <a href="#" className="section-link">Learn More →</a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
