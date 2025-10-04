import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";
import PageTransition from "@/components/PageTransition";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ToastProvider from "@/components/providers/ToastProvider";
import ClientProviders from "@/components/providers/ClientProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Sri Vasavi Engineering College",
  description: "Official website of Sri Vasavi Engineering College",
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
