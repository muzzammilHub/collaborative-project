import React from 'react'
import Heading from './Heading'
import Hero from './HeroSection'
import FeatureSection from './FeaturesSection'
import OurServices from './OurServices'
import BottomSection from './Bottom'

const Home = () => {
  return (
    <div>
        
            <Heading/>
            <Hero/>
            <h1 className="text-center font-bold text-4xl mb-1 mt-8">Why HealthChartMD</h1>
            <FeatureSection/>
            <h1 className="text-center font-bold text-4xl mb-8 mt-4">Services Offered</h1>
            <OurServices/>
            <BottomSection/>
    </div>

    
  )
}

export default Home