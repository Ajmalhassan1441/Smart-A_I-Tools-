import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GeistSans, GeistMono } from "geist/font";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Best AI tools directory",
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="flex-grew">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}