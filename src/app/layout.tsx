import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
// import Nav from "@/components/Nav/Nav";

const lb = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--lb",
});

const pretendard = localFont({
  src: "../../public/fonts/Pretendard.woff2",
  variable: "--pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fonts & Footers",
    template: "%s - Fonts & Footers",
  },
  description:
    "Fonts & Footers empowers business owners with e-commerce stores, business websites, and direct booking platforms. Elevate your online presence with our web development and design expertise!",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${pretendard.variable} ${lb.variable}`}>
        {children}
      </body>
    </html>
  );
}
