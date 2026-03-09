import { motion } from 'framer-motion'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import './Methodology.css'

export default function Methodology() {
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault()
        window.history.pushState({}, '', '/')
        window.dispatchEvent(new Event('popstate'))
    }

    const sections = [
        {
            id: '01',
            title: 'Contributor Verification',
            content: [
                'Every data contributor goes through a rigorous verification process.',
                'We require:',
            ],
            bullets: [
                'Minimum 5 years of professional trading experience',
                'Independently verifiable P&L statements',
                'Domain-specific competency assessment',
            ],
            footnote: 'No exceptions.',
        },
        {
            id: '02',
            title: 'Data Quality Standards',
            content: [
                'Our SFT training pairs come from real trading decisions with documented outcomes.',
            ],
            bullets: [
                'The context evaluated by the trader',
                'The decision made and its rationale',
                'The resulting outcome and market response',
            ],
        },
        {
            id: '03',
            title: 'Evaluation Rubrics',
            content: [
                'Trading evals are designed by professionals who have made money in live markets.',
                'Our rubrics test for the specific reasoning patterns that separate profitable traders from unprofitable ones.',
            ],
        },
        {
            id: '04',
            title: 'RL Environment Fidelity',
            content: [
                'Our gym environments are production-grade simulators built on real market data.',
            ],
            bullets: [
                'Realistic order books and market impact',
                'Slippage modeling and regime changes',
                'Dynamic adversarial conditions',
            ],
            footnote: 'Not toy environments with simplified dynamics.',
        },
        {
            id: '05',
            title: 'Domain Coverage',
            content: [
                'We cover four core domains of trading, each with dedicated contributors and domain-specific quality checks.',
            ],
            bullets: [
                'High-frequency trading',
                'Statistical arbitrage',
                'Macro strategy',
                'Fundamental analysis',
            ],
        },
    ]

    const processSteps = [
        'Expert Trader',
        'Decision Trace',
        'Training Pair',
        'Evaluation Benchmark',
        'RL Environment',
    ]

    return (
        <div className="methodology-page">
            <Navbar />

            <div className="methodology-hero">
                <div className="methodology-hero-bg">
                    <img src="/assets/methodology-bg.png" alt="Background" className="animate-bg-slow" />
                </div>

                <div className="methodology-hero-content">
                    <div className="methodology-container">
                        <motion.a
                            href="/"
                            onClick={handleBack}
                            className="back-link"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            ← Back
                        </motion.a>

                        <motion.div
                            className="methodology-label"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            OUR PROCESS
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Our Methodology
                        </motion.h1>

                        <motion.p
                            className="methodology-subtitle"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            How we collect, verify, and structure market intelligence for training trading-capable models.
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="methodology-content">
                <div className="methodology-container">
                    <div className="methodology-timeline">
                        {sections.map((section, index) => (
                            <motion.div
                                className="methodology-step"
                                key={section.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                <div className="step-indicator">
                                    <div className="timeline-node" />
                                    <span className="step-number">{section.id}</span>
                                    {index < sections.length - 1 && <div className="step-line" />}
                                </div>

                                <div className="step-card">
                                    <h2>{section.title}</h2>
                                    {section.content.map((paragraph, i) => (
                                        <p key={i} className="step-text">{paragraph}</p>
                                    ))}
                                    {section.bullets && (
                                        <ul className="step-bullets">
                                            {section.bullets.map((bullet, i) => (
                                                <li key={i}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.footnote && (
                                        <p className="step-footnote">{section.footnote}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Process Flow Diagram */}
            <div className="methodology-process">
                <div className="methodology-container">
                    <motion.div
                        className="process-diagram"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="process-title">Data Pipeline</h3>
                        <div className="process-flow">
                            {processSteps.map((step, index) => (
                                <div className="process-step" key={step}>
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                    >
                                        {step}
                                    </motion.span>
                                    {index < processSteps.length - 1 && (
                                        <div className="process-arrow">↓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Section Divider */}
            <div className="methodology-container">
                <div className="section-divider" />
            </div>

            {/* Why It Matters */}
            <div className="methodology-why">
                <div className="methodology-container">
                    <motion.div
                        className="why-block"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Why This Matters</h3>
                        <p>Most AI models are trained on synthetic benchmarks.</p>
                        <p>Markets are not benchmarks.</p>
                        <p>They are dynamic, adversarial systems.</p>
                        <p className="why-highlight">
                            RAETH builds the infrastructure required to train models that can operate in real market environments.
                        </p>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
