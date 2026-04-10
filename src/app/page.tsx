"use client";

import { useState } from "react";
import { PulseFitHero } from "@/components/ui/pulse-fit-hero";
import { AIChatbot } from "@/components/ui/ai-chatbot";
import { SplashScreen } from "@/components/ui/splash-screen";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <PulseFitHero
        logo=""
        navigation={[]}
        title="متجرك الإلكتروني الناجح يبدأ معنا"
        subtitle={[
          "كل يوم بدون متجر يعني مبيعات راحت عليك",
          "نبني لك متجر احترافي جاهز و يبيع خلال 7 أيام",
        ]}
        primaryAction={{
          label: "أطلق متجرك الآن",
          onClick: () => window.open(
            "https://wa.me/966537311886?text=السلام عليكم، أبغى أطلق متجري الإلكتروني على سلة 👋",
            "_blank"
          ),
        }}
        socialProof={{
          avatars: [
            "/client-1.jpg",
            "/client-2.jpg",
            "/client-3.jpg",
            "/client-4.jpg",
          ],
          text: "انضم لأكثر من 500+ عميل معنا",
        }}
        programs={[
          {
            image: "/projects/p1.jpg",
            category: "فاشون وأكسسوارات",
            title: "متجر نيلوفر",
            onClick: () => {},
          },
          {
            image: "/projects/p2.jpg",
            category: "تراث وهدايا",
            title: "متجر عاشق للماضي",
            onClick: () => {},
          },
          {
            image: "/projects/p3.jpg",
            category: "أحذية ورياضة",
            title: "متجر خطوتي",
            onClick: () => {},
          },
          {
            image: "/projects/p4.jpg",
            category: "تجارة إلكترونية",
            title: "متجر أزياء عصري",
            onClick: () => {},
          },
          {
            image: "/projects/p5.jpg",
            category: "منتجات رقمية",
            title: "متجر كتب وكورسات",
            onClick: () => {},
          },
          {
            image: "/projects/p6.jpg",
            category: "بوتيك",
            title: "متجر إكسسوارات فاخرة",
            onClick: () => {},
          },
          {
            image: "/projects/p7.jpg",
            category: "فوتوغرافي",
            title: "متجر مستلزمات تصوير",
            onClick: () => {},
          },
          {
            image: "/projects/p8.jpg",
            category: "إلكترونيات",
            title: "متجر أجهزة تقنية",
            onClick: () => {},
          },
          {
            image: "/projects/p9.jpg",
            category: "رياضة",
            title: "متجر معدات رياضية",
            onClick: () => {},
          },
          {
            image: "/projects/p10.jpg",
            category: "عطور وعناية",
            title: "متجر عطور فاخرة",
            onClick: () => {},
          },
        ]}
      />

      <AIChatbot />
    </>
  );
}
