"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Briefcase, Code, GraduationCapIcon as Graduation, Layers, Mail, X, Menu } from "lucide-react"

export function VerticalNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => setMounted(true), [])

  const navItems = [
    { id: "about", icon: <User className="h-5 w-5" />, label: "About" },
    { id: "experience", icon: <Briefcase className="h-5 w-5" />, label: "Experience" },
    { id: "skills", icon: <Code className="h-5 w-5" />, label: "Skills" },
    { id: "services", icon: <Layers className="h-5 w-5" />, label: "Services" },
    { id: "education", icon: <Graduation className="h-5 w-5" />, label: "Education" },
    { id: "projects", icon: <Briefcase className="h-5 w-5" />, label: "Projects" },
    { id: "contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setTimeout(() => setIsOpen(false), 300)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Toggle navigation"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.div>

        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0.7, scale: 0.95 }}
              animate={{ opacity: 0, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full border-2 border-blue-400/50"
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 mt-2 z-50"
          >
            <div className="flex flex-col items-center gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 hover:shadow-xl"
                    }`}
                    aria-label={item.label}
                  >
                    {item.icon}

                    {/* Tooltip */}
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs rounded-md py-1 px-2 whitespace-nowrap pointer-events-none shadow-lg">
                      {item.label}
                      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
