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
