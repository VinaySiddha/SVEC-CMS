import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DynamicFloatingChatWidgets } from "@/components/DynamicComponents";
import PageTransition from "@/components/PageTransition";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ToastProvider from "@/components/providers/ToastProvider";
import { ClientProviders } from "@/components/providers/ClientProviders";
import GlobalLoader from "@/components/GlobalLoader";
import { defaultSEO, getOrganizationSchema } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

// Enhanced SEO metadata
export const metadata: Metadata = {
  ...defaultSEO,
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SVEC',
  },
};

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Preload critical images */}
        <link rel="preload" href="/vasavi_logo.png" as="image" />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#B22222" />
        <meta name="msapplication-TileColor" content="#B22222" />

        {/* Viewport optimization for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className={`${poppins.className} h-full m-0 p-0`} suppressHydrationWarning={true}>
        <ClientProviders>
          <LoadingProvider>
            <ToastProvider />
            <GlobalLoader />
            <div className="min-h-screen flex flex-col">
              <Header />
              <PageTransition>
                <main className="flex-1 w-full">
                  {props.children}
                </main>
              </PageTransition>
              <Footer />
            </div>
            <DynamicFloatingChatWidgets />
          </LoadingProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
