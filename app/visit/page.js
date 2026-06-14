"use client";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { StoneOnGrave } from "@/components/Art";
import Link from "next/link";

const STEPS = [
  "Wash, daven, or simply pause before approaching — come with a settled heart.",
  "At the kever, say a few kapitlach of Tehillim (many say 119 by the letters of the name).",
  "Say Kel Malei Rachamim, or ask the attendant to say it.",
  "Speak — daven for yourself and your family in their merit.",
  "Place a small stone on the matzevah: a sign that someone came and remembered.",
  "On leaving, wash your hands (without drying on the same towel, per the custom).",
];

const DO = [
  "Dress and act with the gravity of the place (kavod).",
  "Daven to Hashem alone — we ask Him to act in the niftar’s merit.",
  "Place a stone, not flowers, in the customary way.",
];
const DONT = [
  "Don’t eat, drink, or treat the area lightly (lo’eg larash — YD 367:3).",
  "Don’t step on or over graves.",
  "Kohanim do not enter — they remain at a distance (YD 369–371).",
];

export default function VisitPage() {
  return (
    <PageShell title="Visiting the Kever" hebrew="עֲלִיָּה לַקֶּבֶר" kicker="If you are able">
      <StoneOnGrave className="mx-auto mb-6 w-64 opacity-90" />
      <p className="text-lg text-stone">
        Many visit the resting place on the yahrzeit — and on Erev Rosh Hashanah,
        Erev Yom Kippur, and during Elul (Rema, OC 581:4). There is a quiet order
        to a visit, and a few halachos worth knowing.
      </p>

      {/* stepper */}
      <div className="mt-10 space-y-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4 rounded-xl border border-ember/10 bg-white/[0.02] p-4"
          >
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ember/40 text-ember">
              {i + 1}
            </span>
            <p className="text-stone">{s}</p>
          </motion.div>
        ))}
      </div>

      {/* do / don't */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-700/30 bg-emerald-900/10 p-5">
          <h3 className="mb-3 text-lg text-emerald-300">Do ✓</h3>
          <ul className="space-y-2 text-stone">
            {DO.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-800/30 bg-rose-900/10 p-5">
          <h3 className="mb-3 text-lg text-rose-300">Take care ✗</h3>
          <ul className="space-y-2 text-stone">
            {DONT.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-stone">
        The words to say at the kever — Kel Malei and the bracha on seeing Jewish
        graves — are on the{" "}
        <Link href="/words" className="text-ember underline-offset-4 hover:underline">
          Words page
        </Link>
        .
      </p>
    </PageShell>
  );
}
