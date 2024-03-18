
import React from 'react'
import HeroSection from "./site/HeroSection"
import Navbar from "./site/Navbar"
import AchievementsSection from "./site/AchievementsSection"
import AboutSection from '../app/site/AboutSection'
import ProjectsSection from '../app/site/ProjectsSection'
import EmailSection from "./site/EmailSection"
import Footer  from '../app/site/Footer'


export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col container mx-auto px-12 py-4">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  )
}
