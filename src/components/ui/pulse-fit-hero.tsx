"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonCta } from "@/components/ui/button-shiny";
import ShaderBackground from "@/components/ui/shader-background";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { Text } from "@/components/ui/text";

interface NavigationItem {
  label: string;
  hasDropdown?: boolean;
  onClick?: () => void;
}

interface ProgramCard {
  image: string;
  category: string;
  title: string;
  onClick?: () => void;
}

interface PulseFitHeroProps {
  logo?: string;
  navigation?: NavigationItem[];
  ctaButton?: {
    label: string;
    onClick: () => void;
  };
  title: string;
  subtitle?: React.ReactNode[];
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  disclaimer?: string;
  socialProof?: {
    avatars: string[];
    text: string;
  };
  programs?: ProgramCard[];
  className?: string;
  children?: React.ReactNode;
}

const ibmArabic = "'IBM Plex Sans Arabic', Arial, sans-serif";

const COLORS = {
  bgDark: "#050f09",
  teal: "#00a651",
  tealDim: "#006039",
  tealGlow: "rgba(0, 166, 81, 0.16)",
  tealBorder: "rgba(0, 166, 81, 0.28)",
  white: "#FFFFFF",
  whiteAlpha80: "rgba(255,255,255,0.80)",
  whiteAlpha50: "rgba(255,255,255,0.50)",
  whiteAlpha20: "rgba(255,255,255,0.18)",
};

const CARD_W_DESKTOP = 200;
const CARD_W_MOBILE  = 300;
const CARD_H_DESKTOP = 270;
const CARD_H_MOBILE  = 400;
const CARD_GAP_DESKTOP = 16;
const CARD_GAP_MOBILE  = 10;

export function PulseFitHero({
  logo = "متجرك ✦",
  navigation = [
    { label: "المميزات" },
    { label: "الباقات", hasDropdown: true },
    { label: "أعمالنا" },
    { label: "الأسعار" },
    { label: "تواصل معنا" },
  ],
  ctaButton,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  disclaimer,
  socialProof,
  programs = [],
  className,
  children,
}: PulseFitHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardW    = isMobile ? CARD_W_MOBILE    : CARD_W_DESKTOP;
  const cardH    = isMobile ? CARD_H_MOBILE    : CARD_H_DESKTOP;
  const cardGap  = isMobile ? CARD_GAP_MOBILE  : CARD_GAP_DESKTOP;
  const cardSlot = cardW + cardGap;

  return (
    <section
      dir="rtl"
      className={cn("relative w-full min-h-screen flex flex-col overflow-hidden", className)}
      style={{
        background: `radial-gradient(ellipse 80% 55% at 50% 100%, #006039 -20%, #050f09 60%)`,
        fontFamily: ibmArabic,
      }}
      role="banner"
    >
      {/* توهج سفلي */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
        background: "radial-gradient(ellipse 70% 40% at 50% 105%, rgba(0,96,57,0.45) 0%, transparent 70%)" }} />

      {/* تموجات شيدر — خلف كل شيء، أسفل الصفحة */}
      <div className="absolute inset-x-0 pointer-events-none" style={{ zIndex: 0, bottom: isMobile ? "38%" : "0%", height: isMobile ? "36%" : "105%", transform: isMobile ? "scaleY(1.6)" : "none", transformOrigin: "center" }}>
        <ShaderBackground opacity={isMobile ? 0.45 : 0.15} className="w-full h-full" />
      </div>

      {/* نقاط ضوئية */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1,
        backgroundImage: `radial-gradient(circle, rgba(0,166,81,0.06) 1px, transparent 1px)`,
        backgroundSize: "36px 36px" }} />

      {/* ─── Header ─── */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-20 flex flex-row justify-between items-center px-4 md:px-8 lg:px-12"
        style={{ paddingTop: "16px", paddingBottom: "16px" }}
      >
        {/* Logo */}
        <div style={{ fontFamily: ibmArabic, fontWeight: 700, fontSize: "18px",
          color: COLORS.teal, textShadow: "0 0 16px rgba(0,166,81,0.5)" }}>
          {logo}
        </div>

        {/* Nav — مخفي على الجوال */}
        <nav className="hidden lg:flex flex-row items-center gap-6">
          {navigation.map((item, i) => (
            <button key={i} onClick={item.onClick}
              className="flex items-center gap-1 transition-all hover:text-white"
              style={{ fontFamily: ibmArabic, fontSize: "13px", fontWeight: 400, color: COLORS.whiteAlpha80 }}>
              {item.label}
              {item.hasDropdown && (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        {ctaButton && (
          <button onClick={ctaButton.onClick}
            className="hidden lg:block px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ background: COLORS.tealGlow, border: `1px solid ${COLORS.tealBorder}`,
              fontFamily: ibmArabic, fontSize: "13px", fontWeight: 500, color: COLORS.teal }}>
            {ctaButton.label}
          </button>
        )}
      </motion.header>

      {/* ─── Main Content ─── */}
      {children ? (
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">{children}</div>
      ) : (
        <div className={`relative z-10 flex flex-col items-center justify-center px-4 ${isMobile ? "pt-14 pb-6" : "flex-1"}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hero-content flex flex-col items-center text-center w-full max-w-xl lg:max-w-4xl"
            style={{
              gap: isMobile ? "12px" : "14px",
              transform: isMobile ? "none" : "scale(0.72)",
              transformOrigin: "center top",
            }}
          >
            {/* Title */}
            <Text
              variant={{ sm: "heading-24", md: "heading-32", lg: "heading-48" }}
              color="white"
              align="center"
              className="font-bold [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]"
            >
              {title}
            </Text>

            {/* Subtitle */}
            {subtitle && subtitle.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {subtitle.map((line, i) => (
                  <Text
                    key={i}
                    variant={i === 0
                      ? { sm: "heading-16", md: "heading-20", lg: "heading-24" }
                      : { sm: "copy-14", md: "copy-16", lg: "copy-20" }
                    }
                    color="white-80"
                    align="center"
                    className="font-normal"
                  >
                    {line}
                  </Text>
                ))}
              </div>
            )}

            {/* Buttons */}
            {(primaryAction || secondaryAction) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-3 w-auto"
                style={{ marginTop: isMobile ? "24px" : "0", marginBottom: isMobile ? "4px" : "0" }}
              >
                {primaryAction && (
                  <ButtonCta
                    label={primaryAction.label}
                    onClick={primaryAction.onClick}
                  />
                )}
                {secondaryAction && (
                  <button onClick={secondaryAction.onClick}
                    className="h-12 px-6 rounded-lg transition-all duration-500 hover:scale-105"
                    style={{ background: "transparent", border: `1.5px solid ${COLORS.whiteAlpha20}`,
                      fontFamily: ibmArabic, fontSize: "14px", fontWeight: 600, color: COLORS.white }}>
                    {secondaryAction.label}
                  </button>
                )}
              </motion.div>
            )}

            {/* Disclaimer */}
            {disclaimer && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                style={{ fontFamily: ibmArabic, fontSize: "11px", color: COLORS.whiteAlpha50 }}>
                {disclaimer}
              </motion.p>
            )}

            {/* Social Proof */}
            {socialProof && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                dir="rtl"
                style={{
                  marginTop: isMobile ? "6px" : "0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 14px 6px 8px",
                  borderRadius: "999px",
                  background: "rgba(5,15,9,0.7)",
                  border: `1px solid ${COLORS.tealBorder}`,
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(0,166,81,0.08)",
                }}
              >
                {/* النص أولاً (RTL) */}
                <span style={{
                  fontFamily: ibmArabic,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: COLORS.whiteAlpha80,
                  whiteSpace: "nowrap",
                  paddingRight: "4px",
                }}>
                  {socialProof.text}
                </span>

                {/* فاصل */}
                <div style={{
                  width: "1px",
                  height: "18px",
                  background: COLORS.tealBorder,
                  flexShrink: 0,
                }} />

                {/* الصور — تتداخل من اليمين */}
                <div style={{ display: "flex", flexDirection: "row", gap: "0px" }} dir="ltr">
                  {socialProof.avatars.map((avatar, i) => (
                    <img
                      key={i}
                      src={avatar}
                      alt={`عميل ${i + 1}`}
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid #050f09`,
                        marginLeft: i === 0 ? "0" : "-8px",
                        boxShadow: `0 0 0 1px ${COLORS.teal}`,
                        position: "relative",
                        zIndex: socialProof.avatars.length - i,
                      }}
                    />
                  ))}
                </div>

                {/* نقطة خضراء نشاط */}
                <div style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: COLORS.teal,
                  boxShadow: "0 0 6px rgba(0,166,81,0.8)",
                  flexShrink: 0,
                }} />
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* ─── Carousel ─── */}
      {programs.length > 0 && (
        /* dir="ltr" هنا ضروري: يخلي overflow:hidden يقطع من اليمين لا اليسار */
        <div dir="ltr" className="relative z-10 w-full overflow-hidden"
          style={{ paddingTop: isMobile ? "28px" : "36px", paddingBottom: isMobile ? "48px" : "36px", marginTop: isMobile ? "6px" : "0" }}>

          <style>{`
            @keyframes marquee-roll {
              from { transform: translate3d(calc(-${cardSlot}px * ${programs.length}), 0, 0); }
              to   { transform: translate3d(0, 0, 0); }
            }
            .marquee-track {
              animation: marquee-roll ${programs.length * 7.5}s linear infinite;
              will-change: transform;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
          `}</style>

          {/* 5 نسخ: نبدأ من النسخة 2 وننتهي عند النسخة 3 — لا فراغ أبداً */}
          <div className="marquee-track flex items-center"
            dir="ltr"
            style={{ gap: `${cardGap}px`, width: "max-content" }}>
            {[...programs, ...programs, ...programs, ...programs, ...programs].map((program, i) => (
              <div key={i} onClick={program.onClick}
                className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                style={{ width: `${cardW}px`, height: `${cardH}px`, borderRadius: "16px",
                  boxShadow: `0 6px 24px rgba(0,0,0,0.5), 0 0 0 1px ${COLORS.tealBorder}`,
                  transition: "transform 0.25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05) translateY(-6px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1) translateY(0)"; }}
              >
                <img src={program.image} alt={program.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3"
                  style={{
                    display: "flex", flexDirection: "column", gap: "4px",
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
                    paddingTop: "32px",
                  }} dir="rtl">
                  <span style={{ fontFamily: ibmArabic, fontSize: isMobile ? "11px" : "10px", fontWeight: 600,
                    color: COLORS.teal, letterSpacing: "0.06em" }}>
                    {program.category}
                  </span>
                  <h3 style={{ fontFamily: ibmArabic, fontSize: isMobile ? "14px" : "13px", fontWeight: 600,
                    color: COLORS.white, lineHeight: "1.35" }}>
                    {program.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── جملة تحت السلايدر ─── */}
      <div
        dir="rtl"
        className="relative z-10 w-full flex justify-center"
        style={{ paddingTop: isMobile ? "12px" : "20px", paddingBottom: isMobile ? "28px" : "28px", paddingInline: "24px" }}
      >
        <AnimatedText
          repeatInterval={10000}
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={1.8}
          text={
            <span style={{
              fontFamily: ibmArabic,
              fontWeight: 600,
              fontSize: isMobile ? "14px" : "clamp(14px, 1.4vw, 18px)",
              lineHeight: "1.5",
              color: COLORS.whiteAlpha80,
              maxWidth: "480px",
              display: "block",
            }}>
              شكل متجرك يأثر بنسبة{" "}
              <span style={{ color: COLORS.teal, fontWeight: 700 }}>90%</span>{" "}
              على قرار الشراء من عملائك
            </span>
          }
        />
      </div>
    </section>
  );
}
