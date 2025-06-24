"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { GitlabIcon as GitHub, Linkedin, Facebook, Instagram, Download, ChevronDown, ExternalLink } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

const Particles = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; size: number; color: string; duration: number; tx: number }>
  >([])

  useEffect(() => {
    // Reduce number of particles on mobile
    const particleCount = window.innerWidth < 768 ? 30 : 50

    const colors = ["#4f46e5", "#8b5cf6", "#3b82f6", "#6366f1"]
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2, // Slightly smaller particles
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
      tx: Math.random() * 400 - 200,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={
            {
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${Math.random() * 100}%`,
              animationDuration: `${particle.duration}s`,
              "--tx": `${particle.tx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [imageError, setImageError] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/19oJ1ucsB8/?mibextid=wwXIfr",
      icon: Facebook,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
      borderColor: "border-blue-200 dark:border-blue-700/50",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mo72med_samy/profilecard/?igsh=cXQwZThnam50N2dz",
      icon: Instagram,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      hoverColor: "hover:bg-pink-200 dark:hover:bg-pink-800/50",
      borderColor: "border-pink-200 dark:border-pink-700/50",
    },
    {
      name: "GitHub",
      url: "https://github.com/mohamedsamy04",
      icon: GitHub,
      color: "text-gray-800 dark:text-gray-200",
      bgColor: "bg-gray-100 dark:bg-gray-800/50",
      hoverColor: "hover:bg-gray-200 dark:hover:bg-gray-700/70",
      borderColor: "border-gray-200 dark:border-gray-700/50",
    },
    {
      name: "LinkedIn",
      url: "http://www.linkedin.com/in/mo72medsamy",
      icon: Linkedin,
      color: "text-blue-700 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
      borderColor: "border-blue-200 dark:border-blue-700/50",
    },
  ]

  return (
    <section
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-gray-900/90 dark:via-indigo-950/90 dark:to-purple-950/90"
      id="hero"
    >
      {/* Enhanced particles with better opacity */}
      <Particles />

      {/* Subtle light effect in background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12">
          {/* Professional Image section - First on mobile, Second on desktop */}
          <motion.div
            className="lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Clean and professional image container */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto">
              
              {/* Subtle background glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40 dark:from-blue-900/10 dark:via-indigo-900/15 dark:to-purple-900/10 rounded-3xl blur-2xl"></div>
              
              {/* Main image container */}
              <motion.div
                className="relative rounded-3xl overflow-hidden w-full h-full border-2 border-white/90 dark:border-gray-700/90 shadow-[0_20px_40px_rgba(8,_25,_68,_0.12)] dark:shadow-[0_20px_40px_rgba(0,_0,_0,_0.3)] z-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600">
                    <Image
                      src="/me.jpg"
                      alt="Mohamed Samy"
                      width={384}
                      height={384}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      priority
                      quality={100}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzg0IiBoZWlnaHQ9IjM4NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDMzOENBIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg=="
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full group">
                    <Image
                      src="/placeholder.svg?height=384&width=384"
                      alt="Mohamed Samy"
                      width={384}
                      height={384}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      priority
                      quality={100}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzg0IiBoZWlnaHQ9IjM4NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDMzOENBIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg=="
                      onError={() => {
                        console.error("Error loading image: Image not found")
                        setImageError(true)
                      }}
                    />
                    
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
              </motion.div>

              {/* Clean corner indicators */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400/60 dark:border-blue-300/60 rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400/60 dark:border-purple-300/60 rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-400/60 dark:border-indigo-300/60 rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-pink-400/60 dark:border-pink-300/60 rounded-br-lg"></div>
            </div>
          </motion.div>

          {/* Text content - Second on mobile, First on desktop */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium border border-blue-200/50 dark:border-blue-700/30 shadow-sm"
            >
              Frontend Developer
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 leading-tight">
              Mohamed Samy
            </h1>

            <div className="h-10 sm:h-12 md:h-14 mb-4 sm:mb-6 md:mb-8">
              <TypeAnimation
                sequence={[
                  "Building beautiful interfaces",
                  2000,
                  "Creating responsive websites",
                  2000,
                  "Crafting user experiences",
                  2000,
                  "Developing web applications",
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"
              />
            </div>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Frontend developer skilled in building responsive, user-friendly interfaces using HTML, CSS, JavaScript,
              and Tailwind CSS. Experienced in React, Next.js, and TypeScript to create dynamic and scalable web
              applications.
            </motion.p>

            {/* Enhanced buttons with better styling */}
            <motion.div
              className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start mb-6 sm:mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="/My-Cv.pdf"
                download="Mohamed-Samy-CV.pdf"
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full border border-blue-700/30 text-sm sm:text-base font-medium group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated background */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                {/* Content */}
                <span className="relative flex items-center gap-2">
                  Download CV
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce-slow" />
                </span>
                {/* Glow effect */}
                <span className="absolute -inset-px bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></span>
              </motion.a>

              <motion.a
                href="https://social-links-six-psi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-700 text-sm sm:text-base font-medium group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated background */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                {/* Content */}
                <span className="relative flex items-center gap-2">
                  My Social
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                {/* Subtle border glow */}
                <span className="absolute -inset-px bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></span>
              </motion.a>
            </motion.div>

            {/* Enhanced social media icons */}
            <motion.div
              className="flex justify-center lg:justify-start space-x-3 sm:space-x-4 md:space-x-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative p-2.5 sm:p-3 md:p-3.5 rounded-full ${link.bgColor} backdrop-blur-sm ${link.hoverColor} transition-all duration-300 border ${link.borderColor} group overflow-hidden`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  aria-label={link.name}
                >
                  {/* Icon */}
                  <link.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${link.color} relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  />

                  {/* Animated circle background */}
                  <span className="absolute inset-0 rounded-full bg-white dark:bg-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>

                  {/* Subtle glow effect */}
                  <span
                    className={`absolute -inset-px rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${link.bgColor}`}
                  ></span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile (below lg screens) */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 lg:flex flex-col items-center cursor-pointer hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <motion.div
          animate={controls}
          className="text-blue-600 dark:text-blue-400 mb-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </motion.div>
        <div className="w-0.5 sm:w-1 h-10 sm:h-12 md:h-16 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full shadow-md"></div>
      </motion.div>
    </section>
  )
}