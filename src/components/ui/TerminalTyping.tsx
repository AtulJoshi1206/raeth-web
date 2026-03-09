import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'
import './TerminalTyping.css'

const BLOCKS = [
  `> analyzing EUR/USD regime shift...
  volatility_cluster: EXPANDING
  correlation_break: treasury_yield ↔ fx
  signal_confidence: 0.847
  position: SHORT 2.4x leverage
  stop_loss: -0.3% portfolio
> reasoning: central_bank_divergence
  detected via: fed_minutes + ecb_forward
  historical_analog: 2018-Q4 regime`,

  `> training epoch 847/2000
  loss: 0.0234 | sharpe: 2.41
  max_drawdown: -4.2%
  win_rate: 0.634
  evaluating on crisis_regime...
  crisis_alpha: +12.3% (vs benchmark -8.1%)
> model checkpoint saved
> deploying to paper_trading...`,

  `> new signal detected: AAPL
  earnings_surprise: +2.3σ
  options_flow: unusual call volume
  sentiment_shift: institutional
  risk_budget_remaining: 34.2%
> decision: ENTER_LONG
  size: 1.8% portfolio
  confidence: HIGH
  reasoning_trace: saved to sft_dataset`,
]

export default function TerminalTyping() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayText, setDisplayText] = useState('')
  const [blockIndex, setBlockIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true)
    }
  }, [isInView, isTyping])

  useEffect(() => {
    if (!isTyping) return

    const currentBlock = BLOCKS[blockIndex]

    if (charIndex < currentBlock.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentBlock.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, currentBlock[charIndex] === '\n' ? 80 : 25)
      return () => clearTimeout(timeout)
    } else {
      // Block finished, wait then move to next
      const timeout = setTimeout(() => {
        const nextBlock = (blockIndex + 1) % BLOCKS.length
        setBlockIndex(nextBlock)
        setCharIndex(0)
        setDisplayText('')
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [isTyping, charIndex, blockIndex])

  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <span className="terminal-title">raeth_analysis.py</span>
      </div>
      <div className="terminal-body">
        <pre className="terminal-text">
          {displayText}
          <span className="terminal-cursor">_</span>
        </pre>
      </div>
    </div>
  )
}
