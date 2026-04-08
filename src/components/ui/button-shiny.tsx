import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
}

function ButtonCta({ label = "أطلق متجرك الآن", className, ...props }: ButtonCtaProps) {
  return (
    <>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow:
              0 0 6px 1px rgba(0,166,81,0.18),
              0 0 16px 4px rgba(0,166,81,0.08),
              0 0 32px 8px rgba(0,166,81,0.04);
          }
          50% {
            box-shadow:
              0 0 10px 2px rgba(0,166,81,0.28),
              0 0 24px 6px rgba(0,166,81,0.14),
              0 0 44px 12px rgba(0,166,81,0.07);
          }
        }

        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(350%) skewX(-15deg); opacity: 0; }
        }

        .btn-cta-glow {
          animation: glow-pulse 2.4s ease-in-out infinite;
        }

        .btn-cta-glow:hover {
          animation: glow-pulse 1.2s ease-in-out infinite;
        }

        .btn-cta-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(77,219,143,0.25) 50%,
            transparent 100%
          );
          animation: shimmer-sweep 2.8s ease-in-out infinite;
          border-radius: inherit;
        }
      `}</style>

      <button
        className={cn(
          "btn-cta-glow btn-cta-shimmer",
          "group relative h-12 px-6 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer",
          "hover:scale-105 active:scale-95",
          className
        )}
        {...props}
      >
        {/* الحد الخارجي */}
        <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-b from-[#00a651] via-[#050f09] to-[#006039]">
          <div className="absolute inset-0 bg-[#050f09] rounded-lg opacity-90" />
        </div>

        {/* الخلفية الداكنة */}
        <div className="absolute inset-[2px] bg-[#050f09] rounded-lg opacity-95" />

        {/* تدرج أفقي */}
        <div className="absolute inset-[2px] bg-gradient-to-r from-[#050f09] via-[#0a1f12] to-[#050f09] rounded-lg opacity-90" />

        {/* تدرج رأسي */}
        <div className="absolute inset-[2px] bg-gradient-to-b from-[#00a651]/30 via-[#0a1f12] to-[#006039]/20 rounded-lg opacity-80" />

        {/* توهج داخلي */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-[#00a651]/10 via-[#0a1f12] to-[#004d2e]/50 rounded-lg" />

        {/* ظل داخلي */}
        <div className="absolute inset-[2px] shadow-[inset_0_0_15px_rgba(0,166,81,0.2)] rounded-lg" />

        {/* توهج سفلي يتنفس */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            width: "80%",
            height: "12px",
            background: "radial-gradient(ellipse, rgba(0,166,81,0.7) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* النص */}
        <div className="relative flex items-center justify-center gap-2">
          <span
            className="text-base font-semibold bg-gradient-to-b from-[#4ddb8f] to-[#00a651] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,166,81,0.5)] tracking-tight"
            style={{ fontFamily: "'IBM Plex Sans Arabic', Arial, sans-serif" }}
          >
            {label}
          </span>
        </div>

        {/* hover overlay */}
        <div className="absolute inset-[2px] opacity-0 transition-opacity duration-300 bg-gradient-to-r from-[#004d2e]/20 via-[#00a651]/15 to-[#004d2e]/20 group-hover:opacity-100 rounded-lg" />
      </button>
    </>
  );
}

export { ButtonCta }
