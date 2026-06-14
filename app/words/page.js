"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import { PRAYERS } from "@/lib/prayers";
import { TEHILLIM } from "@/lib/tehillim";

const PSALM_ORDER = [
  ["33", "Said for the neshama"],
  ["16", "“You will not abandon my soul”"],
  ["17", "A prayer of David"],
  ["72", "Of peace and blessing"],
  ["91", "Of divine shelter"],
  ["104", "“Bless Hashem, my soul”"],
  ["130", "From the depths I call"],
  ["23", "Hashem is my shepherd"],
];

function Accordion({ title, hebrew, note, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-ember/15 bg-white/[0.02]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span>
          <span className="text-lg text-parchment">{title}</span>{" "}
          {hebrew && <span className="he text-ember/70">{hebrew}</span>}
          {note && <span className="block text-sm text-stone/70">{note}</span>}
        </span>
        <span className="text-ember">{open ? "–" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WordsPage() {
  const [openPsalms, setOpenPsalms] = useState(false);

  return (
    <PageShell title="The Words" hebrew="הַתְּפִלּוֹת" kicker="Kaddish · Kel Malei · Yizkor · Tehillim">
      <div className="space-y-4">
        <Accordion
          title="Mourner's Kaddish"
          hebrew="קַדִּישׁ יָתוֹם"
          note="Said standing, with a minyan, at each tefillah"
          body={
            <p className="he text-right text-xl leading-loose text-parchment">
              {PRAYERS.kaddish.replace("קדיש יתום", "").trim()}
            </p>
          }
        />
        <Accordion
          title="Kel Malei Rachamim"
          hebrew="אֵל מָלֵא רַחֲמִים"
          note="At the kever · on the yahrzeit · at Yizkor"
          body={
            <p className="he text-right text-xl leading-loose text-parchment">
              {PRAYERS.kelMaleiMan.replace("אֵ-ל מָלֵא רַחֲמִים", "").replace(/^.*?רַחֲמִים/, "").trim() || PRAYERS.kelMaleiMan}
            </p>
          }
        />
        <Accordion
          title="Yizkor"
          hebrew="יִזְכּוֹר"
          note="Yom Kippur · Shemini Atzeres · last day of Pesach · 2nd day of Shavuos"
          body={
            <p className="he text-right text-xl leading-loose text-parchment">
              {PRAYERS.yizkor.replace("יזכור", "").trim()}
            </p>
          }
        />
        <Accordion
          title="The Bracha on Seeing Jewish Graves"
          hebrew="אֲשֶׁר יָצַר אֶתְכֶם בַּדִּין"
          note="On entering a cemetery after 30 days · SA, OC 224:12"
          body={
            <p className="he text-right text-xl leading-loose text-parchment">
              {PRAYERS.graveBracha.replace("אֲשֶׁר יָצַר אֶתְכֶם בַּדִּין", "").trim()}
            </p>
          }
        />
      </div>

      {/* Tehillim */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-parchment">Tehillim for the neshama</h2>
          <button
            onClick={() => setOpenPsalms((o) => !o)}
            className="rounded-full border border-ember/30 px-5 py-2 text-sm text-ember hover:bg-ember/10"
          >
            {openPsalms ? "Collapse all" : "Open all"}
          </button>
        </div>
        <p className="mt-2 text-stone">
          The eight perakim customarily said for an elevation of the neshama.
        </p>

        <div className="mt-6 space-y-4">
          {PSALM_ORDER.map(([num, label]) => (
            <Accordion
              key={num}
              title={`Tehillim ${num}`}
              note={label}
              body={
                <div className="he space-y-1 text-right text-xl leading-loose text-parchment">
                  {(TEHILLIM[num] || []).map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
