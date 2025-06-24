"use client"

import { useState, useCallback, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true)
      try {
        const telegramResponse = await sendToTelegram(data)
        if (telegramResponse.ok) {
          setSubmitSuccess(true)
          reset()
          setTimeout(() => setSubmitSuccess(false), 5000)
        } else {
          throw new Error("Failed to send message to Telegram")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        setSubmitError("Failed to send message. Please try again.")
        setTimeout(() => setSubmitError(null), 5000)
      } finally {
        setIsSubmitting(false)
      }
    },
    [reset],
  )

  const sendToTelegram = async (data: FormData) => {
    const botToken = "7973735099:AAE-MYlf-dsAKXPyklTxzGwZ_hB-oDG82wA"
    const chatId = "948393191"
    const text = `
*🌟 New Contact Form Submission 🌟*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📌 *Subject:* ${data.subject}

💬 *Message:*
\`\`\`
${data.message}
\`\`\`

📅 *Submitted on:* ${new Date().toLocaleString()}

[View Portfolio](https://your-portfolio-url.com)
`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    })

    return response
  }

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
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-600 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-400 dark:bg-purple-600 blur-3xl animate-float"
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
          Get in <span className="text-gradient">Touch</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="glass-effect p-8 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 dark:text-white">Contact Information</h3>
              <div className="space-y-6">
                <motion.a
                  href="mailto:mohamedsamy25411@gmail.com"
                  className="flex items-center text-base sm:text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-200 dark:border-blue-800/30">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <span>mohamedsamy25411@gmail.com</span>
                </motion.a>

                <motion.a
                  href="tel:+201000342166"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4 border border-green-200 dark:border-green-800/30">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <span>01000342166</span>
                </motion.a>

                <motion.div
                  className="flex items-center text-gray-600 dark:text-gray-300"
                  variants={itemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 border border-purple-200 dark:border-purple-800/30">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <span>Baltim, Kafr El Sheikh, Egypt</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-effect p-8 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("name")}
                      type="text"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border ${
                        errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 text-sm sm:text-base`}
                    />
                  </motion.div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 text-sm sm:text-base`}
                    />
                  </motion.div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                  <input
                    {...register("subject")}
                    type="text"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border ${
                      errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 text-sm sm:text-base`}
                  />
                </motion.div>
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border ${
                      errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 text-sm sm:text-base`}
                  ></textarea>
                </motion.div>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              <div className="mt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-primary text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.div
                    className="mt-4 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {submitError}
                  </motion.div>
                )}

                {submitSuccess && (
                  <motion.div
                    className="mt-4 p-4 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md border border-green-200 dark:border-green-800/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
