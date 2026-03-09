import { motion } from 'framer-motion'
import Button from '../ui/Button'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/assets/hero-neural-network.png" alt="" className="animate-bg-drift" />
      </div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="label hero-label">Training Infrastructure for AI Trading</div>
        <h1>Training Intelligence <span className="text-gradient">That Can Trade</span></h1>
        <p className="hero-sub">
          Your model solves reasoning benchmarks. It cannot survive real markets.
          RAETH builds the <strong>training infrastructure that turns language models into trading agents.</strong>
        </p>
        <div className="hero-actions">
          <Button variant="white" href="#contact">Partner With Us <span className="arrow">&rarr;</span></Button>
          <Button variant="ghost" href="#problem">Explore The Problem</Button>
        </div>
      </motion.div>
    </section>
  )
}
