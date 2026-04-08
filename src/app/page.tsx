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
        subtitle={<>
          <span>كل يوم بدون متجر يعني مبيعات راحت عليك</span>
          <span>نبني لك متجر احترافي جاهز و يبيع خلال 7 أيام</span>
          <span>نجهزلك متجرك بشكل صحيح وانت تركز على ادارته</span>
        </>}
        primaryAction={{
          label: "أطلق متجرك الآن",
          onClick: () => window.open(
            "https://wa.me/966537311886?text=السلام عليكم، أبغى أطلق متجري الإلكتروني على سلة 👋",
            "_blank"
          ),
        }}
        socialProof={{
          avatars: [
            "https://i.pravatar.cc/150?img=11",
            "https://i.pravatar.cc/150?img=22",
            "https://i.pravatar.cc/150?img=33",
            "https://i.pravatar.cc/150?img=44",
          ],
          text: "انضم لأكثر من 500+ عميل معنا",
        }}
        programs={[
          {
            image: "/projects/nilofer.jpg",
            category: "فاشون وأكسسوارات",
            title: "متجر نيلوفر",
            onClick: () => {},
          },
          {
            image: "/projects/vintage.jpg",  /* ضع الصورة في public/projects/vintage.jpg */
            category: "تراث وهدايا",
            title: "متجر عاشق للماضي",
            onClick: () => {},
          },
          {
            image: "/projects/متجر-خطوتي.jpg",
            category: "أحذية ورياضة",
            title: "متجر خطوتي",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=500&fit=crop",
            category: "تجارة إلكترونية",
            title: "متجر أزياء عصري",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=500&fit=crop",
            category: "منتجات رقمية",
            title: "متجر كتب وكورسات",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop",
            category: "بوتيك",
            title: "متجر إكسسوارات فاخرة",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=500&fit=crop",
            category: "فوتوغرافي",
            title: "متجر مستلزمات تصوير",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop",
            category: "إلكترونيات",
            title: "متجر أجهزة تقنية",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
            category: "رياضة",
            title: "متجر معدات رياضية",
            onClick: () => {},
          },
          {
            image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=500&fit=crop",
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
