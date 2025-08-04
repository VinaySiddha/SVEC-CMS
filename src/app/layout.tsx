import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatWidgets from "@/components/FloatingChatWidgets";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sri Vasavi Engineering College",
  description: "Official website of Sri Vasavi Engineering College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex-grow bg-[#FFF8F0]">
          {children}
        </main>
        <Footer />
        <FloatingChatWidgets />
      </body>
    </html>
  );
}
