import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";

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
        <Header />
        <main className="flex-grow bg-secondary/50">
          {props.children}
        </main>
        <Footer />
        <FloatingChatWidgets />
      </body>
    </html>
  );
}
