"use client";
import { useMemo } from "react";

// A hand-drawn, living memorial candle. Pure SVG + CSS animation.
export default function Candle({ size = 220, lit = true }) {
  // Pre-compute a few rising sparks with staggered timing
  const sparks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        cx: 50 + (Math.random() * 16 - 8),
        delay: (i * 0.9).toFixed(2),
        dur: (3 + Math.random() * 2).toFixed(2),
        r: 0.8 + Math.random() * 0.9,
      })),
    []
  );

  return (
    <div style={{ width: size }} className="relative mx-auto select-none">
      {/* ambient glow behind everything */}
      {lit && (
        <div
          className="glow absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full"
          style={{
            width: size * 1.4,
            height: size * 1.4,
            background:
              "radial-gradient(circle, rgba(245,185,66,0.35) 0%, rgba(245,150,40,0.12) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      <svg viewBox="0 0 100 160" className="relative w-full" aria-label="Memorial candle">
        {/* rising sparks */}
        {lit &&
          sparks.map((s, i) => (
            <circle
              key={i}
              className="spark"
              cx={s.cx}
              cy="44"
              r={s.r}
              fill="#f6c96b"
              style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
            />
          ))}

        {/* flame */}
        {lit && (
          <g className="flame">
            <path
              d="M50 18 C 60 32, 66 42, 60 54 C 56 62, 44 62, 40 54 C 34 42, 40 30, 50 18 Z"
              fill="url(#flameGrad)"
            />
            <path
              className="flame-inner"
              d="M50 30 C 56 40, 57 46, 53 53 C 50 58, 45 57, 44 51 C 42 43, 46 37, 50 30 Z"
              fill="#fff4d6"
            />
          </g>
        )}

        {/* wick */}
        <rect x="49" y="54" width="2" height="8" rx="1" fill={lit ? "#2a1c0c" : "#444"} />

        {/* candle body */}
        <rect x="38" y="62" width="24" height="78" rx="5" fill="url(#waxGrad)" />
        {/* wax drip */}
        <path d="M38 80 q-4 14 2 22 q3 -10 0 -22 Z" fill="#efe3c8" opacity="0.7" />
        {/* base */}
        <ellipse cx="50" cy="140" rx="20" ry="5" fill="#cdbfa0" />
        <ellipse cx="50" cy="138" rx="24" ry="6" fill="#b8a987" opacity="0.5" />

        <defs>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff1c2" />
            <stop offset="45%" stopColor="#f5b942" />
            <stop offset="100%" stopColor="#e8761f" />
          </linearGradient>
          <linearGradient id="waxGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f6efe0" />
            <stop offset="50%" stopColor="#fbf7ee" />
            <stop offset="100%" stopColor="#e4d8bf" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
