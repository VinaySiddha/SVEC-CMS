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
});

export const metadata: Metadata = {
  title: "Sri Vasavi Engineering College",
  description: "Official website of Sri Vasavi Engineering College",
};

export default function RootLayout(props: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.className} h-full m-0 p-0`}>
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
