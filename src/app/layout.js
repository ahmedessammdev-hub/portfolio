import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ahmed Essam Ahmed - Full Stack Developer Portfolio",
  description:
    "Full Stack Developer from Cairo specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and experience.",
  keywords: [
    "Ahmed Essam",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Cairo",
  ],
  authors: [{ name: "Ahmed Essam Ahmed" }],
  creator: "Ahmed Essam Ahmed",
  icons: {
    icon: "/me.png",
    apple: "/me.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedessam.dev",
    title: "Ahmed Essam Ahmed - Full Stack Developer",
    description:
      "Full Stack Developer from Cairo specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Ahmed Essam Portfolio",
    images: [
      {
        url: "/me.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Essam Ahmed - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Essam Ahmed - Full Stack Developer",
    description:
      "Full Stack Developer from Cairo specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/me.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
