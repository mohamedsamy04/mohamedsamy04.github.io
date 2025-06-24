"use client"

import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const education = [
    {
      degree: "Bachelor of Science in Information System",
      institution: "Faculty of Computers and Information, Kafr El Sheikh University",
      period: "Expected 2026",
      achievements: ["Current GPA: 3.3/4.00", "Location: Kafr El Sheikh, Egypt"],
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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="education"
      ref={ref}
      className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-purple-400 dark:bg-purple-600 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-indigo-400 dark:bg-indigo-600 blur-3xl animate-float"
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
          My <span className="text-gradient">Education</span>
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-8 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 dark:bg-purple-700 rounded-br-full z-0 opacity-50 transition-transform duration-300 group-hover:scale-110"></div>

              <div className="relative z-10">
                <motion.div
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 border border-purple-200 dark:border-purple-700/50">
                    <GraduationCap className="w-8 h-8 text-purple-600" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold dark:text-white text-gradient">{edu.degree}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                      {edu.institution}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-6 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-gray-700 dark:text-gray-300 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="font-medium">Timeline:</span>
                    <span className="ml-2">{edu.period}</span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="text-base sm:text-lg font-medium mb-4 dark:text-gray-200 flex items-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                    Key Achievements:
                  </h4>

                  <ul className="space-y-3">
                    {edu.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300 flex items-center p-3 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
