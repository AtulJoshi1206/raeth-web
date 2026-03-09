import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    const href = e.currentTarget.getAttribute('href')
    if (href && href.startsWith('/#') && window.location.pathname !== '/') {
      e.preventDefault()
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
      setTimeout(() => {
        const id = href.replace('/#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="/" className="nav-logo" onClick={(e) => {
          if (window.location.pathname !== '/') {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('popstate'));
          }
        }}>
          <img src="/assets/favicon.png" alt="RAETH" className="nav-logo-img" />
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="/#products" className="nav-link" onClick={handleLinkClick}>Products</a>
          <a href="/#pipeline" className="nav-link" onClick={handleLinkClick}>Research</a>
          <a href="/#domains" className="nav-link" onClick={handleLinkClick}>Domains</a>
          <a href="/#contact" className="nav-cta" onClick={handleLinkClick}>Get in Touch</a>
        </div>
        <button
          type="button"
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
