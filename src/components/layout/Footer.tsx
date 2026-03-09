import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/favicon.png" alt="RAETH" className="footer-logo-img" />
            </div>
            <p>Training infrastructure for AI trading.<br />Your LLM cannot trade. We're fixing that.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Products</h5>
              <ul>
                <li><a href="#products">SFT Training Pairs</a></li>
                <li><a href="#products">Trading Evals</a></li>
                <li><a href="#products">RL Trading Gym</a></li>
                <li><a href="#products">Expert RLHF</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Domains</h5>
              <ul>
                <li><a href="#domains">HFT</a></li>
                <li><a href="#domains">Statistical Arbitrage</a></li>
                <li><a href="#domains">Macro Trading</a></li>
                <li><a href="#domains">Fundamental Investing</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Connect</h5>
              <ul>
                <li><a href="#">X / Twitter</a></li>
                <li><a href="mailto:vihan@raeth.ai">vihan@raeth.ai</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>RAETH &copy; 2026</span>
          <span className="footer-tagline">YOUR LLM CANNOT TRADE</span>
        </div>
      </div>
    </footer>
  )
}
