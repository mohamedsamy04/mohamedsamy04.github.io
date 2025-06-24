"use client"

import {
  Linkedin,
  GitlabIcon as GitHub,
  Instagram,
  Facebook,
  Link,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Footer() {
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
    <footer
      ref={ref}
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 py-16 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg sm:text-xl font-semibold mb-6 text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h3>

            <motion.div className="space-y-4">
              <motion.div
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-200 dark:border-blue-800/30">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  01000342166
                </p>
              </motion.div>

              <motion.div
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-200 dark:border-blue-800/30">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <p className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  mohamedsamy25411@gmail.com
                </p>
              </motion.div>

              <motion.div
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 border border-blue-200 dark:border-blue-800/30">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <p className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Baltim, Kafr El Sheikh, Egypt
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-semibold mb-6 text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quick Links
            </motion.h3>

            <ul className="space-y-3">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  className="group flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="inline-block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-semibold mb-6 text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect
            </motion.h3>

            <motion.p
              className="text-sm sm:text-base mb-6 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              Follow me on social media for updates and tech insights.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {[
                {
                  href: "http://www.linkedin.com/in/mo72medsamy",
                  Icon: Linkedin,
                  color: "text-blue-700 dark:text-blue-400",
                  bgColor: "bg-blue-100 dark:bg-blue-900/30",
                  hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
                  borderColor: "border-blue-200 dark:border-blue-700/50",
                },
                {
                  href: "https://github.com/mohamedsamy04",
                  Icon: GitHub,
                  color: "text-gray-800 dark:text-gray-200",
                  bgColor: "bg-gray-100 dark:bg-gray-800/50",
                  hoverColor: "hover:bg-gray-200 dark:hover:bg-gray-700/70",
                  borderColor: "border-gray-200 dark:border-gray-700/50",
                },
                {
                  href: "https://www.instagram.com/mo72med_samy/profilecard/?igsh=cXQwZThnam50N2dz",
                  Icon: Instagram,
                  color: "text-pink-600 dark:text-pink-400",
                  bgColor: "bg-pink-100 dark:bg-pink-900/30",
                  hoverColor: "hover:bg-pink-200 dark:hover:bg-pink-800/50",
                  borderColor: "border-pink-200 dark:border-pink-700/50",
                },
                {
                  href: "https://www.facebook.com/share/19oJ1ucsB8/?mibextid=wwXIfr",
                  Icon: Facebook,
                  color: "text-blue-600 dark:text-blue-400",
                  bgColor: "bg-blue-100 dark:bg-blue-900/30",
                  hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
                  borderColor: "border-blue-200 dark:border-blue-700/50",
                },
                {
                  href: "https://social-links-six-psi.vercel.app/",
                  Icon: Link,
                  color: "text-purple-600 dark:text-purple-400",
                  bgColor: "bg-purple-100 dark:bg-purple-900/30",
                  hoverColor: "hover:bg-purple-200 dark:hover:bg-purple-800/50",
                  borderColor: "border-purple-200 dark:border-purple-700/50",
                },
              ].map(({ href, Icon, color, bgColor, hoverColor, borderColor }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className={`relative p-2.5 sm:p-3 md:p-3.5 rounded-full ${bgColor} backdrop-blur-sm ${hoverColor} transition-all duration-300 border ${borderColor} group overflow-hidden`}
                  whileHover={{
                    scale: 1.08,
                    rotate: 3,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  aria-label={href.split("/").pop() || "Social Link"}
                >
                  {/* Icon */}
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${color} relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  />

                  {/* Animated circle background */}
                  <span className="absolute inset-0 rounded-full bg-white dark:bg-gray-800 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>
            &copy; {new Date().getFullYear()}
            <span className="text-blue-600"> Mohamed Samy</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
