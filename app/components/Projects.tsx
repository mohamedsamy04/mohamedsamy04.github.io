"use client"

import React from 'react'
import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ExternalLink, X, ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

type Project = {
  title: string
  description: string
  link: string
  image: string
  category: string
}

type ProjectCardProps = {
  project: Project
  onOpenDetails: (project: Project) => void
  isFirstCard?: boolean
}

// Update the project cards with more subtle animations
const ProjectCard = React.memo(({ project, onOpenDetails, isFirstCard }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Safety check for undefined project
  if (!project) {
    return null
  }

  // إعداد خصائص الصورة بشكل آمن
  let imageProps: any = {
    src: imageError ? "/placeholder.svg" : project.image,
    alt: project.title,
    fill: true,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className: `object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? '' : 'opacity-0'}`,
    placeholder: "blur",
    blurDataURL: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZGRkZCIvPjwvc3ZnPg==",
    onError: () => setImageError(true),
    onLoadingComplete: () => setImageLoaded(true),
  }
  if (isFirstCard) {
    imageProps.priority = true
  } else {
    imageProps.loading = "lazy"
  }

  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 transition-all duration-500">
      <div className="flex flex-col h-full">
        <div className="relative h-64 sm:h-72 overflow-hidden">
          {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full z-10" />}
          <Image {...imageProps} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <div className="px-4 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-sm font-medium">
              {project.category}
            </div>
          </div>
        </div>

        <div className="relative p-6 flex flex-col flex-grow">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow">
            {project.description}
          </p>

          <div className="flex gap-3 mt-auto">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300"
              onClick={() => window.open(project.link, "_blank")}
            >
              Visit Project
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
              onClick={() => onOpenDetails(project)}
            >
              Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

const ProjectSkeleton = () => (
  <div className="rounded-[2rem] bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg overflow-hidden">
    <div className="flex flex-col">
      <Skeleton className="h-64 sm:h-72 w-full" />
      <div className="p-6">
        <Skeleton className="h-8 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/5 mb-6" />
        <div className="flex gap-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  </div>
)

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dragDirection, setDragDirection] = useState(0)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [selectedCategory])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleCloseModal = () => {
    setIsClosing(true)
    // Keep the dialog open during the exit animation, but make it faster
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedProject(null)
      setIsClosing(false)
    }, 400) // Reduced from 800ms to 400ms for faster closing
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevSlide()
    } else if (info.offset.x < -threshold) {
      nextSlide()
    }
    setDragDirection(0)
  }

  const handleDrag = (event: any, info: PanInfo) => {
    setDragDirection(info.offset.x)
  }

  const projects: Project[] = [
    {
      title: "Heba Oil",
      description:
        "A comprehensive e-commerce platform for natural hair oils with a complete admin dashboard featuring product analytics, order management, customer insights, and reviews. Full CRUD operations for products, orders, customers, and complete website management. Built for a natural hair oil company with advanced admin controls.",
      link: "https://hebaoil.com",
      image: "/project15.png",
      category: "e-commerce",
    },
    {
      title: "Rakaiz Center",
      description:
        "A comprehensive physical therapy clinic website in Saudi Arabia featuring stunning animations and a complete admin dashboard for managing all website content. Built with modern web technologies for optimal performance and user experience.",
      link: "https://rakaizcenter.com/",
      image: "/project14.png",
      category: "healthcare",
    },
    {
      title: "HYDRA TECH",
      description:
        "Dynamic web and mobile development company delivering innovative digital solutions with a focus on creativity and technical excellence.",
      link: "https://hydratech-tawny.vercel.app/",
      image: "/project12.png",
      category: "organization",
    },
    {
      title: "ProductHub",
      description:
        "Full-featured e-commerce platform with user auth, product browsing, cart, order tracking, and admin dashboard. Built with Next.js and React.",
      link: "https://product-hub-mohamed-samys-projects-4b4fde72.vercel.app/",
      image: "/project13.png",
      category: "e-commerce",
    },
    {
      title: "IEEE Kafrelsheikh Student Branch",
      description:
        "Official website for the IEEE Kafrelsheikh Student Branch, featuring information about events, workshops, team members, and activities. Built with modern web technologies for optimal performance and user experience.",
      link: "https://ieee-ksb.com",
      image: "/project.png",
      category: "organization",
    },
    {
      title: "Pizza Restaurant",
      description:
        "An interactive website for a pizza restaurant with online ordering capabilities, real-time order tracking, and a dynamic menu system. Built with modern web technologies for optimal performance.",
      link: "https://pizza-one-gray.vercel.app/",
      image: "/projects2.png",
      category: "food",
    },
    {
      title: "Coffee Shop",
      description:
        "A sophisticated coffee shop website featuring an elegant design, online menu, and booking system. Includes features like product showcase, blog section, and customer reviews.",
      link: "https://coffee-shop-red-nine.vercel.app/",
      image: "/project3.png",
      category: "food",
    },
    {
      title: "Team Store",
      description:
        "A modern e-commerce platform built with React and Commerce.js. Features include product filtering, cart management, secure checkout with Stripe, and responsive design for optimal viewing across all devices.",
      link: "https://store-jade-six.vercel.app/",
      image: "/project1.png",
      category: "e-commerce",
    },
    {
      title: "MrGreen",
      description:
        "An e-commerce store developed for a Saudi Arabian company selling effective ant and cockroach control products. Features product listings, shopping cart, and secure checkout process.",
      link: "https://mr-green.vercel.app/",
      image: "/project7.png",
      category: "e-commerce",
    },
    {
      title: "Thresholding",
      description:
        "Transform your images with powerful thresholding techniques. Upload an image and convert it to a high-contrast black and white version in seconds. Perfect for artistic projects and image processing.",
      link: "https://thresholding-one.vercel.app/",
      image: "project10.png",
      category: "utility",
    },
    {
      title: "LinkMini",
      description:
        "A URL shortener application that converts long URLs into compact, shareable links. Also generates QR codes for easy mobile sharing and access. Built with modern web technologies for speed and reliability.",
      link: "https://url-shortener-sooty-tau.vercel.app/",
      image: "/project6.png",
      category: "utility",
    },
    {
      title: "Imaginote",
      description:
        "A task management and note-taking application that allows users to create, organize, and track tasks. Users can also write personal notes and access them anytime from anywhere.",
      link: "https://imaginote-phi.vercel.app/",
      image: "/project8.png",
      category: "utility",
    },
    {
      title: "X-O Game",
      description:
        "An interactive Tic-Tac-Toe game with a modern UI, player registration, and real-time gameplay. Features include custom player names, score tracking, and responsive design for both desktop and mobile play.",
      link: "https://x-o-green.vercel.app/",
      image: "/project9.png",
      category: "game",
    },
    {
      title: "SECURIFY",
      description:
        "A secure password management tool that helps users create, store, and manage strong passwords. Features include password generation, encryption, and secure storage for enhanced digital security.",
      link: "https://securify-beta.vercel.app/",
      image: "/project11.png",
      category: "utility",
    },
    {
      title: "Sales Management System",
      description:
        "A comprehensive sales management solution with features including inventory tracking, customer relationship management, sales analytics, and automated reporting systems.",
      link: "https://sales-project-five.vercel.app/",
      image: "/project4.png",
      category: "business",
    },
    {
      title: "Caring Bridge",
      description:
        "A charitable platform connecting donors with orphanages. Features secure payment processing, donor dashboard, and impact tracking. Built with modern web technologies for reliability and scalability.",
      link: "https://www.linkedin.com/posts/mo72medsamy_orphanagesupport-donations-charity-activity-7196536727321116673-h8Xy",
      image: "/project5.png",
      category: "charity",
    },
  ].map(p => ({ ...p, image: p.image.startsWith('/') ? p.image : '/' + p.image }))

  const categories = ["all", ...new Set(projects.map((project) => project.category))]

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => selectedCategory === "all" || project.category === selectedCategory)
  }, [selectedCategory, projects])

  // Animation variants for better organization - with improved exit animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }, // Faster exit
  }

  // Update the project modal with more subtle animations
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: -15,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  }

  // Update the close button with more subtle animations
  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotate: 45,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  }

  const imageContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: -20, // Less movement for more elegant exit
      transition: { duration: 0.3 }, // Faster exit
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: 10, // Less movement for more elegant exit
      transition: { duration: 0.3 }, // Faster exit
    },
  }

  useEffect(() => {
    const nextIdx = (currentSlide + 1) % filteredProjects.length
    const nextImg = filteredProjects[nextIdx]?.image
    if (nextImg) {
      const img = new window.Image()
      img.src = nextImg
    }
  }, [currentSlide, filteredProjects])

  return (
    <section
      className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
      id="projects"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader title="Projects" />

        {/* Dropdown on mobile, horizontal buttons on desktop */}
        <div className="flex justify-center mb-4 sm:mb-12">
          {/* Dropdown for mobile */}
          <div className="relative w-full max-w-xs block md:hidden">
            <button
              className="w-full flex items-center justify-between bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-base font-medium text-gray-700 dark:text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onClick={() => setShowDropdown((v) => !v)}
            >
              <span className="capitalize">{selectedCategory}</span>
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className="absolute left-0 right-0 mt-2 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-t border-gray-200 dark:border-gray-700 py-1 transition-all duration-200 origin-top animate-fade-in"
                style={{ opacity: showDropdown ? 1 : 0, transform: showDropdown ? 'translateY(0)' : 'translateY(10px)' }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setShowDropdown(false)
                    }}
                    className={`w-full flex items-center justify-between text-left px-4 py-2 capitalize text-sm rounded-lg transition hover:bg-blue-100/80 dark:hover:bg-blue-900/40 ${selectedCategory === category ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold' : ''}`}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && <Check className="w-4 h-4 ml-2 text-white dark:text-blue-300" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Horizontal buttons for desktop */}
          <div className="hidden md:flex flex-wrap gap-1 p-1 sm:gap-2 sm:p-2 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize rounded-xl text-xs px-3 py-1 sm:text-sm sm:px-4 sm:py-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Comfortable Mobile Slider */}
              <div className="block md:hidden">
                <div className="relative px-4">
                  {/* Main Slider Container */}
                  <div className="relative overflow-hidden rounded-[2rem] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentSlide}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.1}
                        onDragEnd={handleDragEnd}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.09, ease: "easeInOut" }}
                        className="w-full transition-opacity duration-150 cursor-grab active:cursor-grabbing"
                      >
                        <ProjectCard 
                          project={filteredProjects[currentSlide]} 
                          onOpenDetails={setSelectedProject} 
                          isFirstCard={currentSlide === 0}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Modern Progress Indicator with Animated Arrows and Counter */}
                  {filteredProjects.length > 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="flex items-center space-x-4">
                        {/* Modern Glass Arrow Left */}
                        <motion.button
                          onClick={prevSlide}
                          whileTap={{ scale: 0.85, rotate: -20 }}
                          whileHover={{ scale: 1.1, boxShadow: "0 4px 24px 0 rgba(80,80,255,0.15)" }}
                          className="w-12 h-12 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/30 dark:border-gray-700/40 flex items-center justify-center shadow-xl transition-all duration-300 group relative overflow-hidden"
                          style={{ boxShadow: "0 2px 16px 0 rgba(80,80,255,0.10)" }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0" />
                          <ChevronLeft className="w-6 h-6 text-blue-600 dark:text-purple-400 z-10 transition-transform duration-300 group-hover:-translate-x-1" />
                        </motion.button>

                        {/* Animated Digital Counter above Progress Bar */}
                        <div className="flex flex-col items-center min-w-[48px]">
                          <motion.span
                            key={currentSlide}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="text-base md:text-lg font-mono font-bold text-blue-700 dark:text-purple-300 tracking-widest select-none mb-1"
                            style={{ background: 'none', boxShadow: 'none', padding: 0 }}
                          >
                            {String(currentSlide + 1).padStart(2, '0')}
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-normal tracking-normal">/{String(filteredProjects.length).padStart(2, '0')}</span>
                          </motion.span>
                          {/* Slim Progress Bar */}
                          <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${((currentSlide + 1) / filteredProjects.length) * 100}%` }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Modern Glass Arrow Right */}
                        <motion.button
                          onClick={nextSlide}
                          whileTap={{ scale: 0.85, rotate: 20 }}
                          whileHover={{ scale: 1.1, boxShadow: "0 4px 24px 0 rgba(120,80,255,0.15)" }}
                          className="w-12 h-12 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/30 dark:border-gray-700/40 flex items-center justify-center shadow-xl transition-all duration-300 group relative overflow-hidden"
                          style={{ boxShadow: "0 2px 16px 0 rgba(120,80,255,0.10)" }}
                        >
                          <span className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-0" />
                          <ChevronRight className="w-6 h-6 text-purple-600 dark:text-blue-400 z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* Comfortable Navigation Hint */}
                  {filteredProjects.length > 1 && (
                    <motion.div 
                      className="mt-4 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-gray-400 dark:to-gray-500" />
                        <span className="font-medium">Swipe or use arrows</span>
                        <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-gray-400 dark:to-gray-500" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Desktop Grid */}
              <motion.div layout className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} onOpenDetails={setSelectedProject} />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Custom modal implementation with improved animations */}
        <AnimatePresence>
          {(selectedProject || isClosing) && (
            <>
              <motion.div
                key="backdrop"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={handleCloseModal}
              />

              {/* Update the project modal content with more subtle animations */}
              <motion.div
                key="modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
              >
                <div className="w-[95%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-[1400px] max-h-[95vh] overflow-hidden">
                  <motion.div
                    className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 h-auto"
                    initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                    animate={{
                      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-600/3 dark:to-purple-600/3 pointer-events-none"
                    />

                    <motion.button
                      variants={closeButtonVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300"
                      onClick={handleCloseModal}
                    >
                      <X className="w-6 h-6" strokeWidth={2.5} />
                    </motion.button>

                    <div className="flex flex-col md:flex-row max-h-[85vh] overflow-auto">
                      <motion.div
                        variants={imageContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-auto overflow-hidden"
                      >
                        {selectedProject && (
                          <Image
                            src={selectedProject.image || "/placeholder.svg"}
                            alt={selectedProject.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                          />
                        )}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                          exit={{ opacity: 0, transition: { duration: 0.2 } }}
                          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"
                        />
                      </motion.div>

                      <div className="relative p-4 md:p-8 flex flex-col w-full md:w-1/2">
                        {selectedProject && (
                          <>
                            <motion.div
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mb-6"
                            >
                              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {selectedProject.title}
                              </h2>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.3 } }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium"
                              >
                                {selectedProject.category}
                              </motion.div>
                            </motion.div>

                            <motion.p
                              variants={contentVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 flex-grow"
                            >
                              {selectedProject.description}
                            </motion.p>

                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                              <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => window.open(selectedProject.link, "_blank")}
                              >
                                <motion.span
                                  className="flex items-center justify-center"
                                  initial={{ x: -5 }}
                                  animate={{ x: 0 }}
                                  whileHover={{
                                    x: 5,
                                    transition: {
                                      repeat: Number.POSITIVE_INFINITY,
                                      repeatType: "mirror",
                                      duration: 0.5,
                                    },
                                  }}
                                >
                                  Visit Project
                                  <ExternalLink className="w-5 h-5 ml-2" />
                                </motion.span>
                              </Button>
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
