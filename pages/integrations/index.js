import React from 'react'
import Integrations from '@/components/Integrations'
import HeroSection from '@/components/HeroSection'
import StepSection from '@/components/StepsSection'
import Team from '@/components/Team'
import Testemonial from '@/components/Testemonials'
import PredictionsTable from '@/components/PredictionTable'
import Pricing from '@/components/Procing'
import Contact from '@/components/Contact'

const index = () => {
  return (
    <>
    <HeroSection/>
    <StepSection/>
    <PredictionsTable/>
    {/* <Integrations/> */}
    <Testemonial/>
    <Team/>
    <Pricing/>
    <Contact/>
    </>
  )
}

export default index