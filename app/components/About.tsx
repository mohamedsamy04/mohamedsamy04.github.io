"use client"

import { motion, useInView } from "framer-motion"
import { Laptop, Layers, Smartphone, Zap } from "lucide-react"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const skills = [
    {
      icon: <Laptop className="w-8 h-8 text-blue-500" />,
      title: "Frontend",
      description: "HTML, CSS, JavaScript, React, Next.js",
    },
    {
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      title: "UI Frameworks",
      description: "Bootstrap, Tailwind CSS",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      title: "Responsive Design",
      description: "Mobile-first, Flexbox, Grid",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Performance",
      description: "Optimizing Performance, Lazy Loading",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 sm:mb-16 text-center dark:text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          About{" "}
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Me
          </span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-12">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="glass-effect p-8 rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm{" "}
                <span className="font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Mohamed Samy
                </span>
                , a passionate Frontend Developer focused on creating beautiful and functional web applications. I
                specialize in HTML, CSS, JavaScript, React, and Next.js, building fast, responsive, and accessible user
                interfaces.
              </p>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                I also work with popular frameworks like Bootstrap and Tailwind CSS, ensuring consistent design across
                various devices and screen sizes. I focus on performance optimization to deliver an optimal user
                experience.
              </p>
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="lg:w-1/2 w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:z-10 overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.div
                    className="relative z-10"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white relative z-10">{skill.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 relative z-10 text-sm sm:text-base">
                    {skill.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
