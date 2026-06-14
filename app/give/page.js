"use client";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { GivingHands } from "@/components/Art";

const ORGS = [
  { name: "Colel Chabad", desc: "Israel’s longest-running tzedakah — food, widows, and orphans.", url: "https://www.colelchabad.org/" },
  { name: "Yad Sarah", desc: "Medical equipment lending and home care across Israel.", url: "https://yadsarah.org/" },
  { name: "Leket Israel", desc: "Rescues surplus food for those in need.", url: "https://www.leket.org/en/" },
  { name: "Misaskim", desc: "Aid to mourners and families in their hardest hours.", url: "https://misaskim.org/" },
  { name: "JNF", desc: "Building and sustaining the land of Israel.", url: "https://www.jnf.org/" },
];

export default function GivePage() {
  return (
    <PageShell title="Learn & Give" hebrew="צְדָקָה לְעִלּוּי נִשְׁמָה" kicker="An elevation that lasts">
      <GivingHands className="mx-auto mb-6 w-64 opacity-90" />
      <p className="text-lg text-stone">
        Tzedakah given in their memory becomes an ongoing merit for the neshama —
        an aliyah that keeps rising. Many give on the yahrzeit with the person’s
        name in mind; even a small amount, given with intention, connects your
        deed to their soul.
      </p>

      <div className="mt-8 grid gap-4">
        {ORGS.map((o, i) => (
          <motion.a
            key={o.name}
            href={o.url}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="block rounded-xl border border-ember/15 bg-white/[0.03] p-5 transition hover:border-ember/40"
          >
            <div className="text-xl text-parchment">{o.name}</div>
            <div className="mt-1 text-stone">{o.desc}</div>
            <div className="mt-2 text-sm text-ember/70">Give →</div>
          </motion.a>
        ))}
      </div>

      <p className="mt-8 text-sm text-stone/60">
        These links are offered as a starting point and are not endorsements; give
        wherever your heart and your community direct you.
      </p>
    </PageShell>
  );
}
