"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0, rotate: 90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* Ripple effect on theme change */}
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.span
            key={isDark ? "dark" : "light"}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 rounded-full ${isDark ? "bg-blue-400" : "bg-yellow-300"}`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
