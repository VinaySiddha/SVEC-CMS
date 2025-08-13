import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";
import PageTransition from "@/components/PageTransition";
import { LoadingProvider } from "@/contexts/LoadingContext";
// import GlobalLoader from "@/components/GlobalLoader";

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
    <html lang="en">
      <body className={poppins.className}>
        <LoadingProvider>
          {/* <GlobalLoader /> */}
          <Header />
          <PageTransition>
            <main className="flex-grow bg-secondary/50">
              {props.children}
            </main>
          </PageTransition>

          <Footer />

          <FloatingChatWidgets />
        </LoadingProvider>
      </body>
    </html>
  );
}
