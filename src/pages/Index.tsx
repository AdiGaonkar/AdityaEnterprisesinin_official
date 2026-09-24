import AboutAdityaEnt from '@/components/AboutAdityaEnt'
import CircularText from '@/components/CircularText'
import Collaborate from '@/components/Collaborate'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import Testimonial from '@/components/Testimonial'
import TestimonialCard from '@/components/TestimonialCard'
import Whoweare from '@/components/Whoweare'
import AboutSection from '@/components/Whoweare'
import React from 'react'

const Index = () => {
  return (
    <div className='font-stacksansnotch'>
        <HeroSection/>
        <AboutAdityaEnt/>
        <ServiceCard/>
        <Whoweare/>
        <Testimonial/>
        <Collaborate/>
    </div>
  )
}

export default Index