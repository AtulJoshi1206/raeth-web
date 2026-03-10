import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import SectionDivider from './components/layout/SectionDivider'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Philosophy from './components/sections/Philosophy'
import Markets from './components/sections/Markets'
import Problem from './components/sections/Problem'
import Metrics from './components/sections/Metrics'
import Products from './components/sections/Products'
import Pipeline from './components/sections/Pipeline'
import CoreSections from './components/sections/CoreSections'
import Domains from './components/sections/Domains'
import DataQuality from './components/sections/DataQuality'
import CTA from './components/sections/CTA'
import Methodology from './components/pages/Methodology'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo(0, 0)
    }

    // Since we're pushing state manually, we listen to popstate
    window.addEventListener('popstate', onLocationChange)

    // Initial mount also set to 0,0 if it's not root /
    if (window.location.pathname !== '/') {
      window.scrollTo(0, 0)
    }

    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  if (currentPath === '/methodology') {
    return <Methodology />
  }

  return (
    <>
      <Navbar />
      <div className="site-wrapper">
        <Hero />
        <SectionDivider />
        <Philosophy />
        <SectionDivider />
        <Markets />
        <SectionDivider />
        <Problem />
        <Metrics />
        <SectionDivider />
        <Products />
        <SectionDivider />
        <Pipeline />
        <SectionDivider />
        <CoreSections />
        <SectionDivider />
        <Domains />
        <SectionDivider />
        <DataQuality />
        <SectionDivider />
        <CTA />
      </div>
      <Footer />
    </>
  )
}
