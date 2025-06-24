"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { VerticalNav } from "@/components/vertical-nav"
import { motion } from "framer-motion"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {!isLoading && (
        <div className="fixed right-4 z-50 flex flex-col items-end gap-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4"
          >
            <ModeToggle />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <VerticalNav />
          </motion.div>
        </div>
      )}
      {children}
    </>
  )
}
