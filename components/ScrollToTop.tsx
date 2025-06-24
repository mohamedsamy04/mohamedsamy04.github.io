"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-50 bottom-4 right-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: isHovered ? [-2, -4, -2] : [0, -2, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronUp className="h-5 w-5 text-white" strokeWidth={3} />
              </motion.div>
            </div>

            <AnimatePresence>
              <motion.span
                key="pulse"
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
            </AnimatePresence>

            {isHovered && (
              <AnimatePresence>
                <motion.span
                  key="hover-ripple"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-blue-400"
                />
              </AnimatePresence>
            )}

            {isHovered && (
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 rounded-full bg-white/80"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0.8,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 20,
                      y: Math.random() * -25,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 0.2,
                    }}
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}