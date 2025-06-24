"use client"

import { useState, useEffect } from "react"
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Services from "./components/Services"
import Education from "./components/Education"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ScrollToTop from "@/components/ScrollToTop"

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="spinner"></div>
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ScrollToTop />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

