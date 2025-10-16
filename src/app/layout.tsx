import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";
import PageTransition from "@/components/PageTransition";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ToastProvider from "@/components/providers/ToastProvider";
import { ClientProviders } from "@/components/providers/ClientProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Sri Vasavi Engineering College - SVEC CMS | Excellence in Engineering Education",
    template: "%s | Sri Vasavi Engineering College"
  },
  description: "Official Content Management System of Sri Vasavi Engineering College, Tadepalligudem. Access department information, faculty profiles, student achievements, academic resources, and institutional updates. Premier engineering education since 1981.",
  keywords: [
    "Sri Vasavi Engineering College",
    "SVEC",
    "Engineering College",
    "Tadepalligudem",
    "Andhra Pradesh",
    "Technical Education",
    "Engineering Courses",
    "Computer Science Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "MBA",
    "Faculty Profiles",
    "Student Achievements",
    "Academic Excellence",
    "CMS",
    "Content Management System"
  ],
  authors: [{ name: "Sri Vasavi Engineering College" }],
  creator: "Sri Vasavi Engineering College",
  publisher: "Sri Vasavi Engineering College",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://srivasaviengg.ac.in',
    siteName: 'Sri Vasavi Engineering College',
    title: 'Sri Vasavi Engineering College - Excellence in Engineering Education',
    description: 'Official website of Sri Vasavi Engineering College, Tadepalligudem. Premier engineering institution offering quality technical education and fostering innovation.',
    images: [
      {
        url: '/vasavi_logo.png',
        width: 1200,
        height: 630,
        alt: 'Sri Vasavi Engineering College Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@svecollege',
    creator: '@svecollege',
    title: 'Sri Vasavi Engineering College - Excellence in Engineering Education',
    description: 'Official website of Sri Vasavi Engineering College, Tadepalligudem. Premier engineering institution offering quality technical education.',
    images: ['/vasavi_logo.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'Educational Institution',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/vasavi_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/vasavi_logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#2563eb',
    'color-scheme': 'light',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <head>
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          as="style"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.className} h-full m-0 p-0`} suppressHydrationWarning={true}>
        <ClientProviders>
          <LoadingProvider>
            <ToastProvider />
            <div className="min-h-screen flex flex-col">
              <Header />
              <PageTransition>
                <main className="flex-1 w-full">
                  {props.children}
                </main>
              </PageTransition>
              <Footer />
            </div>
            <FloatingChatWidgets />
          </LoadingProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
