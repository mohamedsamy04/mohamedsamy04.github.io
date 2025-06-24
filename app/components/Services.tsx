"use client"

import { motion, useInView } from "framer-motion"
import { Code, Layout, Smartphone, Square } from "lucide-react"
import { useRef } from "react"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Layout className="w-12 h-12 text-blue-500" />,
      title: "Web Application Development",
      description:
        "Building fast and interactive web applications using React, Next.js, and modern frontend technologies.",
    },
    {
      icon: <Code className="w-12 h-12 text-purple-500" />,
      title: "Responsive Design",
      description:
        "Creating mobile-first, responsive websites that adapt perfectly to all screen sizes and devices using HTML, CSS, and Tailwind.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-yellow-500" />,
      title: "UI/UX Design",
      description:
        "Designing sleek, user-friendly interfaces that provide an intuitive experience using modern frontend frameworks and design principles.",
    },
    {
      icon: <Square className="w-12 h-12 text-orange-500" />,
      title: "Animations & Interactivity",
      description:
        "Adding engaging animations and interactive elements to websites for enhanced user experience using libraries like Framer Motion, GSAP",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-600 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-400 dark:bg-indigo-600 blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-gradient">Services</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-6 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 transition-all duration-300 group"
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="flex flex-col items-center mb-4 text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 mb-3"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
              </motion.div>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">{service.description}</p>

              <motion.div
                className="mt-6 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
