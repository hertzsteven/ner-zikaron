"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PageShell({ title, hebrew, kicker, children }) {
  return (
    <main className="nightfield min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-stone/70 underline-offset-4 hover:text-ember hover:underline"
        >
          ← Back to the candle
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          {kicker && (
            <p className="text-sm uppercase tracking-[0.2em] text-ember/70">{kicker}</p>
          )}
          <h1 className="mt-2 text-4xl font-medium text-parchment md:text-5xl">{title}</h1>
          {hebrew && <p className="he mt-1 text-2xl text-ember/80">{hebrew}</p>}
          <div className="goldrule mt-6 max-w-xs" />
        </motion.div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
