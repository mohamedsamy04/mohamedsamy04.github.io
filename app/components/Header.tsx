"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Linkedin, GitlabIcon as GitHub, Instagram, Facebook, Link } from "lucide-react"
import Head from "next/head"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    })

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [lastScrollY])

  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mohamed Samy",
          "alternateName": "محمد سامي",
          "jobTitle": "Frontend Developer",
          "url": "https://your-portfolio-url.com/",
          "sameAs": [
            "http://www.linkedin.com/in/mo72medsamy",
            "https://github.com/mohamedsamy04",
            "https://www.instagram.com/mo72med_samy/profilecard/?igsh=cXQwZThnam50N2dz",
            "https://www.facebook.com/share/19oJ1ucsB8/?mibextid=wwXIfr",
            "https://social-links-six-psi.vercel.app/"
          ],
          "email": "mailto:mohamedsamy25411@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Baltim",
            "addressRegion": "Kafr El Sheikh",
            "addressCountry": "EG"
          },
          "image": "https://your-portfolio-url.com/me.jpg",
          "description": "محمد سامي - مطور واجهات أمامية (Frontend Developer) محترف. خبرة في React, Next.js, JavaScript, HTML, CSS, TypeScript, Tailwind CSS. معرض أعمال احترافي، خدمات تصميم وتطوير مواقع وتطبيقات ويب عصرية وسريعة."
        }` }} />
      </Head>
      <header
        className={`
          fixed w-full z-50 transition-all duration-300
          ${isVisible ? "top-0" : "-top-20"}
          ${theme === "dark" ? "bg-gray-900/95" : "bg-white/95"}
          backdrop-blur-sm shadow-md
        `}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <ul className="flex justify-center space-x-6">
            {[
              ["about", "About"],
              ["experience", "Experience"],
              ["skills", "Skills"],
              ["services", "Services"],
              ["education", "Education"],
              ["projects", "Projects"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`
                    transition-colors duration-300
                    ${
                      activeSection === id
                        ? "text-blue-600 dark:text-blue-400"
                        : theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-800 hover:text-blue-600"
                    }
                  `}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          {/* Social Media Links */}
          <div className="flex justify-center mt-4 md:mt-0 space-x-3 sm:space-x-4">
            <a
              href="http://www.linkedin.com/in/mo72medsamy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/mohamedsamy04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700/70 transition-colors duration-300"
            >
              <GitHub className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/mo72med_samy/profilecard/?igsh=cXQwZThnam50N2dz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-700/50 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/share/19oJ1ucsB8/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://social-links-six-psi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="All Social Links"
              className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors duration-300"
            >
              <Link className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}

