import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApiKeysProvider } from "@/contexts/ApiKeysContext";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youssef AI - AI Website Builder",
  description: "Transform any website into a modern, responsive web application with AI. Open-source alternative to Lovable.dev. Clone websites instantly with React, TypeScript, and Tailwind CSS.",
  keywords: [
    "website cloning",
    "AI website builder",
    "React code generator",
    "open source",
    "web scraping",
    "TypeScript",
    "Tailwind CSS",
    "Next.js",
    "website recreation"
  ],
  authors: [{ name: "Youssef AI" }],
  creator: "Youssef AI",
  publisher: "Youssef AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://youssef.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Youssef AI - AI Website Builder",
    description: "Transform any website into a modern, responsive web application with AI. Open-source alternative to Lovable.dev.",
    url: "https://youssef.ai",
    siteName: "Youssef AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Youssef AI - AI Website Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef AI - AI Website Builder",
    description: "Transform any website into a modern, responsive web application with AI.",
    images: ["/og-image.png"],
    creator: "@youssefai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ApiKeysProvider>
            {children}
          </ApiKeysProvider>
        </AuthProvider>
      </body>
    </html>
  );
}