"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: React.ReactNode;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  repeatInterval?: number; // بالمللي ثانية — يعيد الأنيميشن كل N ms
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      repeatInterval,
      ...props
    },
    ref
  ) => {
    const [animKey, setAnimKey] = React.useState(0);

    React.useEffect(() => {
      if (!repeatInterval) return;
      const id = setInterval(() => setAnimKey(k => k + 1), repeatInterval);
      return () => clearInterval(id);
    }, [repeatInterval]);

    const pathVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: underlineDuration, ease: "easeInOut" },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center", props.className)}
      >
        <div className="relative pb-5" key={animKey}>
          <motion.p
            className={cn("text-center", textClassName)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.p>

          <motion.svg
            width="100%"
            height="28"
            viewBox="0 0 300 28"
            className={cn("absolute -bottom-1 left-0", underlineClassName)}
            style={{ transform: "scaleX(-1)" }}
          >
            <defs>
              <filter id="neon-glow" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* طبقة التوهج الخارجي */}
            <motion.path
              d={underlinePath}
              stroke="#00a651"
              strokeWidth="6"
              fill="none"
              strokeOpacity={0.3}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              style={{ filter: "blur(6px)" }}
            />
            {/* الخط الرئيسي بالتوهج */}
            <motion.path
              d={underlinePath}
              stroke="#00ff88"
              strokeWidth="2.5"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              filter="url(#neon-glow)"
              whileHover={{ d: underlineHoverPath, transition: { duration: 0.8 } }}
            />
          </motion.svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
