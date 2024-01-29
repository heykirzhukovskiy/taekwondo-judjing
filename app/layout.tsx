import { Footer } from "@/components";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kombatFont = localFont({ src: "../public/fonts/Kombat11-Regular.woff2" });

export const metadata: Metadata = {
  title: "Taekwondo Kombat",
  description: "Website for taekwondo judges to score matches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kombatFont.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
