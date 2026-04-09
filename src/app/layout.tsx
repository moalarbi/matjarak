import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "متجرك — تصميم وإطلاق متاجر إلكترونية احترافية",
  description: "نصمم ونطلق متجرك الإلكتروني الاحترافي خلال 7 أيام. تصميم عصري، واجهة سهلة، وخدمة متكاملة.",
  openGraph: {
    title: "متجرك — تصميم وإطلاق متاجر إلكترونية احترافية",
    description: "نصمم ونطلق متجرك الإلكتروني الاحترافي خلال 7 أيام.",
    url: "https://matjarak.vercel.app",
    siteName: "متجرك",
    images: [
      {
        url: "https://matjarak.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "اطلق متجرك بكل احترافية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "متجرك — تصميم وإطلاق متاجر إلكترونية احترافية",
    description: "نصمم ونطلق متجرك الإلكتروني الاحترافي خلال 7 أيام.",
    images: ["https://matjarak.vercel.app/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-ibm-arabic), Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
