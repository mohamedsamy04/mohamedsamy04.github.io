import type { Metadata } from "next"

export const metadata: Metadata = {
  title: " Mohamed Samy - Frontend Developer",
  description:
    "محمد سامي - مطور واجهات أمامية (Frontend Developer) محترف. خبرة في React, Next.js, JavaScript, HTML, CSS, TypeScript, Tailwind CSS. معرض أعمال احترافي، خدمات تصميم وتطوير مواقع وتطبيقات ويب عصرية وسريعة. تواصل معي عبر LinkedIn, GitHub, Email. | Mohamed Samy, professional Frontend Developer portfolio, expert in modern web technologies.",
  keywords: "محمد سامي, Mohamed Samy, فرونت اند, Frontend, مطور واجهات, Frontend Developer, React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, UI/UX, Portfolio, بورتفوليو, معرض أعمال, تطوير مواقع, تصميم مواقع, مطور مواقع, مطور تطبيقات, واجهات مستخدم, خبرة, مشاريع, خدمات, تواصل, LinkedIn, GitHub, سيرة ذاتية, CV, Egypt, مصر, مطور مصري, أفضل مطور, أفضل بورتفوليو, web developer, web designer, modern web, professional portfolio, hire frontend developer, contact Mohamed Samy, سامي محمد, سامي فرونت اند, سامي مطور, سامي واجهات, سامي مواقع, سامي تطبيقات",
  authors: [{ name: "Mohamed Samy", url: "https://linkedin.com/in/your-linkedin" }],
  creator: "Mohamed Samy",
  publisher: "Mohamed Samy",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
      notranslate: false,
    },
  },
  alternates: {
    canonical: "https://your-portfolio-url.com",
    languages: {
      'en-US': 'https://your-portfolio-url.com/en',
      'ar': 'https://your-portfolio-url.com/ar',
    },
    media: {
      'only screen and (max-width: 640px)': 'https://your-portfolio-url.com/mobile',
    },
  },
  icons: {
    icon: [
      {
        url: "/logo.svg",
        sizes: "32x32",
        type: "image/svg",
      },
      {
        url: "/logo.svg",
        sizes: "192x192",
        type: "image/svg",
      },
    ],
    shortcut: [
      {
        url: "/logo.svg",
        sizes: "196x196",
        type: "image/svg",
      },
    ],
    apple: [
      {
        url: "/logo.svg",
        sizes: "180x180",
        type: "image/svg",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://your-portfolio-url.com",
    title: "محمد سامي | Mohamed Samy - Frontend Developer",
    description: "محمد سامي - مطور واجهات أمامية محترف. معرض أعمال وخدمات تطوير مواقع وتطبيقات ويب عصرية وسريعة.",
    siteName: "Mohamed Samy Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Samy - Frontend Developer Portfolio",
      },
    ],
    emails: ["your-email@example.com"],
    phoneNumbers: ["+201234567890"],
    countryName: "Egypt",
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد سامي | Mohamed Samy - Frontend Developer | مطور واجهات أمامية",
    description: "محمد سامي - مطور واجهات أمامية محترف. معرض أعمال وخدمات تطوير مواقع وتطبيقات ويب عصرية وسريعة.",
    images: ["/og-image.jpg"],
    creator: "@your_twitter_handle",
    site: "@your_twitter_handle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Mohamed Samy Portfolio",
    "application-name": "Mohamed Samy Portfolio",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
    "bing-verification": "your-bing-verification",
    "google-site-verification": "your-google-site-verification",
    "yandex-verification": "your-yandex-verification",
    "alexaVerifyID": "your-alexa-verification",
    "norton-safeweb-site-verification": "your-norton-verification",
    "facebook-domain-verification": "your-facebook-verification",
    "pinterest-site-verification": "your-pinterest-verification",
  },
}
