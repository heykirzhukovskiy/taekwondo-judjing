import { Footer } from "@/components";
import { author } from "@/const";
import OGImage from "@/public/og-image.jpg";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kombatFont = localFont({ src: "../public/fonts/Kombat11-Regular.woff2" });
const title = "Taekwondo Kombat";
const description = "Website for taekwondo judges to score matches.";
const homeUrl = new URL("https://taekwondo-kombat.vercel.app/");

export const metadata: Metadata = {
  title,
  description,
  authors: author,
  metadataBase: homeUrl,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: homeUrl.href,
    title,
    description,
    images: [
      {
        url: OGImage.src,
        width: OGImage.width,
        height: OGImage.height,
        alt: title,
      },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ru">
    <body className={kombatFont.className + " relative"}>
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
