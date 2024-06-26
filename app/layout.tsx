import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/component/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="arfat-rahman.jpg" type="image/jpg" sizes="50" />
      <body className={inter.className}>
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
