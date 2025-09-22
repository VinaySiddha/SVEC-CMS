import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";
import PageTransition from "@/components/PageTransition";
import { LoadingProvider } from "@/contexts/LoadingContext";
import ToastProvider from "@/components/providers/ToastProvider";
import ClientProviders from "@/components/providers/ClientProviders";

// Use system fonts during Docker build to avoid network issues
const fontClassName = "font-sans";

export const metadata: Metadata = {
  title: "Sri Vasavi Engineering College",
  description: "Official website of Sri Vasavi Engineering College",
};

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
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
      <body className={`${fontClassName} h-full m-0 p-0`}>
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
