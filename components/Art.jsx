"use client";
import { motion } from "framer-motion";

/* A quiet matzevah (gravestone) with a remembrance stone resting on top. */
export function StoneOnGrave({ className = "" }) {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewBox="0 0 260 180"
      className={className}
      aria-label="A remembrance stone on a matzevah"
    >
      {/* ground */}
      <ellipse cx="130" cy="160" rx="110" ry="14" fill="#1a1a24" />
      <ellipse cx="130" cy="158" rx="90" ry="9" fill="#222" opacity="0.6" />
      {/* matzevah */}
      <path d="M88 158 V70 a42 42 0 0 1 84 0 V158 Z" fill="url(#stoneGrad)" stroke="#3a3a48" strokeWidth="1.5" />
      {/* engraved lines */}
      <line x1="106" y1="86" x2="154" y2="86" stroke="#5a5a68" strokeWidth="2" />
      <line x1="100" y1="104" x2="160" y2="104" stroke="#4a4a58" strokeWidth="1.5" />
      <line x1="104" y1="118" x2="156" y2="118" stroke="#4a4a58" strokeWidth="1.5" />
      {/* small remembrance stones on top */}
      <ellipse cx="124" cy="64" rx="13" ry="6" fill="#6b6456" />
      <ellipse cx="120" cy="58" rx="9" ry="5" fill="#857c69" />
      <ellipse cx="135" cy="60" rx="7" ry="4" fill="#9a9079" />
      {/* faint glow above, the neshama rising */}
      <circle cx="130" cy="40" r="26" fill="url(#soulGlow)" opacity="0.5" />
      <defs>
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#33333f" />
          <stop offset="100%" stopColor="#22222c" />
        </linearGradient>
        <radialGradient id="soulGlow">
          <stop offset="0%" stopColor="#f5b942" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f5b942" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

/* Two cupped hands releasing light — for the Give page. */
export function GivingHands({ className = "" }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      viewBox="0 0 260 160"
      className={className}
      aria-label="Cupped hands releasing light"
    >
      <circle cx="130" cy="58" r="34" fill="url(#giveGlow)" />
      {/* rising light particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={108 + i * 11}
          cy={70 - (i % 2) * 14}
          r={2.4 - (i % 2) * 0.8}
          fill="#f6c96b"
          opacity="0.85"
        />
      ))}
      {/* left hand */}
      <path d="M70 150 q6 -46 40 -58 q14 -5 22 2 l-2 10 q-26 2 -36 24 q-6 14 -6 22 Z" fill="#2b2b36" stroke="#3c3c4a" />
      {/* right hand */}
      <path d="M190 150 q-6 -46 -40 -58 q-14 -5 -22 2 l2 10 q26 2 36 24 q6 14 6 22 Z" fill="#2b2b36" stroke="#3c3c4a" />
      <defs>
        <radialGradient id="giveGlow">
          <stop offset="0%" stopColor="#f5b942" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f5b942" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
