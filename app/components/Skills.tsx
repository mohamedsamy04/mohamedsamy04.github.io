"use client"

import { motion, useInView } from "framer-motion"
import { Code, Database, Layout, Terminal, Layers, Globe } from "lucide-react"
import { useRef } from "react"

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <motion.div
    className={`p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700`}
    whileHover={{ scale: 1.15, rotate: 3 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <Icon className={`w-6 h-6 ${color}`} />
  </motion.div>
)

const ProgressBar = ({ value, color }: { value: number; color: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
      <motion.div
        className={`h-2 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }} // Custom spring-like easing
      />
    </div>
  )
}

const skills = [
  {
    icon: Code,
    name: "Frontend Development",
    tech: "HTML5, CSS3, JavaScript, TypeScript, React, Next.js",
    description: "Building fast, modern, and responsive user interfaces with cutting-edge technologies.",
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    value: 95,
  },
  {
    icon: Layout,
    name: "UI & Styling",
    tech: "Bootstrap, Tailwind CSS, Sass",
    description: "Crafting beautiful, scalable, and consistent UI components with modern styling frameworks.",
    color: "text-pink-500",
    bgColor: "bg-pink-500",
    value: 90,
  },
  {
    icon: Terminal,
    name: "Programming",
    tech: "JavaScript, TypeScript, C#, Python",
    description: "Developing efficient and maintainable code with multiple programming languages.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    value: 85,
  },
  {
    icon: Database,
    name: "Database",
    tech: "SQL",
    description: "Managing and querying structured data with SQL databases.",
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    value: 75,
  },
  {
    icon: Layers,
    name: "Libraries & Frameworks",
    tech: "jQuery, React, Next.js",
    description: "Enhancing functionality and interactivity using modern libraries and frameworks.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500",
    value: 90,
  },
  {
    icon: Globe,
    name: "Web Technologies",
    tech: "Responsive Design, Performance Optimization",
    description: "Ensuring seamless web experiences across all devices with a focus on accessibility and speed.",
    color: "text-teal-500",
    bgColor: "bg-teal-500",
    value: 85,
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"></div>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skill-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#skill-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Skills & <span className="text-gradient">Expertise</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-6 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 transition-all duration-300 group"
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="flex items-center mb-4">
                <SkillIcon icon={skill.icon} color={skill.color} />
                <div className="ml-4">
                  <h3 className="text-base sm:text-lg font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{skill.tech}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">{skill.description}</p>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.value}%</span>
                </div>
                <ProgressBar value={skill.value} color={skill.bgColor} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
