"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ibmArabic = "'IBM Plex Sans Arabic', Arial, sans-serif";

const DURATION = 3000; // 3 ثواني
const STEP = 30;       // تحديث كل 30ms

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalSteps = DURATION / STEP;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      const pct = Math.min(Math.round((current / totalSteps) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onDone, 700); // بعد انتهاء الـ exit animation
        }, 200);
      }
    }, STEP);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: `radial-gradient(ellipse 80% 55% at 50% 100%, #006039 -20%, #050f09 60%)`,
            fontFamily: ibmArabic,
            gap: "32px",
          }}
        >
          {/* نقاط ضوئية خلفية */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(circle, rgba(0,166,81,0.06) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }} />

          {/* توهج سفلي */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 40% at 50% 105%, rgba(0,96,57,0.45) 0%, transparent 70%)",
          }} />

          {/* اللوغو */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ position: "relative", textAlign: "center" }}
          >
            {/* توهج خلف اللوغو */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "160px", height: "60px",
              background: "radial-gradient(ellipse, rgba(0,166,81,0.25) 0%, transparent 70%)",
              filter: "blur(12px)",
              pointerEvents: "none",
            }} />

            <div style={{
              fontSize: "21px", fontWeight: 800,
              color: "#00a651",
              textShadow: "0 0 24px rgba(0,166,81,0.6), 0 0 48px rgba(0,166,81,0.3)",
              letterSpacing: "-0.5px",
              position: "relative",
            }}>
              اطلق متجرك الإلكتروني على سلة
            </div>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ width: "220px", display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}
          >
            {/* النسبة */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
                جاري التحميل...
              </span>
              <span style={{
                fontSize: "12px", fontWeight: 700,
                color: "#00a651",
                textShadow: "0 0 8px rgba(0,166,81,0.5)",
              }}>
                {progress}%
              </span>
            </div>

            {/* شريط التقدم */}
            <div style={{
              width: "100%", height: "3px", borderRadius: "99px",
              background: "rgba(0,166,81,0.12)",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* التعبئة */}
              <motion.div
                style={{
                  height: "100%", borderRadius: "99px",
                  background: "linear-gradient(90deg, #006039, #00a651, #4ddb8f)",
                  boxShadow: "0 0 8px rgba(0,166,81,0.7), 0 0 20px rgba(0,166,81,0.4)",
                  width: `${progress}%`,
                  transition: `width ${STEP}ms linear`,
                }}
              />
              {/* shimmer */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, transparent 0%, rgba(77,219,143,0.4) 50%, transparent 100%)",
                animation: "shimmer-splash 1.5s ease-in-out infinite",
              }} />
            </div>

          </motion.div>

          <style>{`
            @keyframes shimmer-splash {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
