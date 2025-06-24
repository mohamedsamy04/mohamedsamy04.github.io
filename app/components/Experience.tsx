"use client"

import { Briefcase, Calendar, MapPin, Globe } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const experiences = [
    {
      company: "HYDRATECH",
      location: "Kafr El Sheikh, Egypt",
      period: "22/4/2025",
      role: "Co-founder and Frontend Developer",
      responsibilities: [
        "Powering Ideas Into Digital Reality",
        "Developing web & mobile solutions",
        "Leading frontend development initiatives",
        "Collaborating with cross-functional teams to deliver digital products",
      ],
    },
    {
      company: "IEEE Kafrelshiekh Student Branch",
      location: "Kafr El Sheikh, Egypt",
      period: "October 2024",
      role: "Head of Frontend Committee",
      responsibilities: [
        "Led and mentored a team of students in frontend development",
        "Organized workshops and tutorials on modern web technologies",
        "Taught HTML, CSS, JavaScript",
        "Developed teaching materials and guided hands-on projects",
      ],
    },
    {
      company: "Information Technology Institute (ITI)",
      location: "Suez Canal Branch, Egypt",
      period: "August 2024",
      role: "Frontend Web Development Trainee",
      responsibilities: [
        "Completed an intensive training program in Frontend Web Development",
        "Acquired solid knowledge in HTML, HTML5, CSS, SASS, Bootstrap, and Responsive Design",
        "Built multiple real-world projects applying modern web technologies",
        "Practiced JavaScript and jQuery for dynamic and interactive web interfaces",
        "Worked with best practices in UI/UX to improve user experience",
      ],
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
      id="experience"
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-600 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-indigo-400 dark:bg-indigo-600 blur-3xl animate-float"
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
          Professional <span className="text-gradient">Experience</span>
        </motion.h2>

        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect p-8 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              whileHover={{ y: -10 }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700 rounded-bl-full z-0 opacity-50 
                transition-transform duration-300 group-hover:scale-110"
              ></div>

              <div className="relative z-10">
                <motion.h3
                  className="text-xl sm:text-2xl font-semibold mb-2 dark:text-white flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  {exp.company === "Freelance" ? <Globe className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" /> : null}
                  <span className="text-gradient">{exp.company}</span>
                </motion.h3>

                <motion.div
                  className="flex flex-wrap gap-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-gray-600 dark:text-gray-300 flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {exp.location}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    {exp.period}
                  </p>
                </motion.div>

                <motion.p
                  className="text-lg sm:text-xl font-medium mb-6 dark:text-gray-200 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                  {exp.role}
                </motion.p>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {exp.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      className="text-base sm:text-lg dark:text-gray-300 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + idx * 0.05 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <span className="text-blue-500 mr-2 text-xl">•</span>
                      {resp}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
