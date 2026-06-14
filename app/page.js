"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Candle from "@/components/Candle";
import Journey from "@/components/Journey";
import Link from "next/link";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState("");
  const journeyRef = useRef(null);

  const enter = () => {
    setEntered(true);
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };

  return (
    <main className="nightfield min-h-screen">
      {/* ---------- INTRO: candle in the dark ---------- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Candle size={210} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.6 }}
          className="mt-10 max-w-2xl"
        >
          <p className="he text-2xl text-ember/90">נֵר ה׳ נִשְׁמַת אָדָם</p>
          <h1 className="mt-3 text-4xl font-medium tracking-wide text-parchment md:text-5xl">
            Ner Zikaron
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone md:text-xl">
            There is one day each year when the gates feel a little closer — when
            the neshama of the one we love is lifted higher by what we do below.
            This is a quiet companion for that day.
          </p>

          {/* optional name personalization */}
          <div className="mx-auto mt-8 max-w-sm">
            <label className="mb-2 block text-sm uppercase tracking-widest text-stone/70">
              In whose memory? <span className="opacity-50">(optional)</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="A name to carry with you…"
              className="w-full rounded-lg border border-ember/25 bg-white/5 px-4 py-3 text-center text-lg text-parchment placeholder-stone/50 outline-none transition focus:border-ember/60"
            />
          </div>

          <motion.button
            onClick={enter}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 rounded-full border border-ember/40 bg-ember/10 px-9 py-3 text-lg tracking-wide text-ember transition hover:bg-ember/20"
          >
            Enter
          </motion.button>

          <div className="mt-6 text-sm text-stone/60">
            <Link href="/tools" className="underline-offset-4 hover:text-ember hover:underline">
              Need to find the date? Open the Tools →
            </Link>
          </div>
        </motion.div>

        {/* scroll hint */}
        <AnimatePresence>
          {entered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute bottom-8 text-stone"
            >
              ↓
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ---------- THE GUIDED JOURNEY ---------- */}
      <div ref={journeyRef}>
        <Journey name={name.trim()} />
      </div>
    </main>
  );
}
