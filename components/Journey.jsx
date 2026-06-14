"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { PRAYERS } from "@/lib/prayers";

/* A single revealed step in the journey */
function Step({ index, kicker, title, hebrew, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="relative mx-auto max-w-2xl px-6 py-20"
    >
      <div className="mb-3 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-ember/70">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ember/40 text-ember">
          {index}
        </span>
        {kicker}
      </div>
      <h2 className="text-3xl font-medium text-parchment md:text-4xl">{title}</h2>
      {hebrew && <p className="he mt-1 text-2xl text-ember/80">{hebrew}</p>}
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-stone">{children}</div>
    </motion.section>
  );
}

function Divider() {
  return <div className="goldrule mx-auto max-w-md" />;
}

export default function Journey({ name }) {
  const [showKaddish, setShowKaddish] = useState(false);

  return (
    <div className="relative">
      {/* transition heading into the journey */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="mx-auto max-w-2xl px-6 pt-24 pb-6 text-center"
      >
        <p className="text-xl text-stone md:text-2xl">
          {name ? (
            <>
              Today we draw close to the neshama of{" "}
              <span className="text-ember">{name}</span>.
            </>
          ) : (
            <>Today we draw close to the neshama of the one we love.</>
          )}
        </p>
        <p className="mt-3 text-stone/70">
          There are four ways we reach toward them. Move through them gently.
        </p>
      </motion.div>

      <Divider />

      {/* STEP 1 — LIGHT */}
      <Step
        index="1"
        kicker="As the day begins"
        title="Light the candle"
        hebrew="הַדְלָקַת נֵר נְשָׁמָה"
      >
        <p>
          At nightfall, when the yahrzeit begins, kindle a candle that will burn
          for the full day — a <span className="text-parchment">ner neshama</span>.
          The flame is a quiet symbol of the soul: “The candle of Hashem is the
          neshama of a person” (Mishlei 20:27).
        </p>
        <p className="text-stone/80">
          No bracha is said over it. Simply light it, and let it accompany you
          through the day. Many place it where it can be seen at meals.
        </p>
      </Step>

      <Divider />

      {/* STEP 2 — SAY THE WORDS */}
      <Step
        index="2"
        kicker="With a minyan, through the day"
        title="Say the words"
        hebrew="קַדִּישׁ וְאֵל מָלֵא"
      >
        <p>
          The central act of the day is Kaddish, said standing with a minyan at
          each tefillah. When there is no minyan, having someone say it for the
          neshama, or saying Kel Malei at the kever, carries great merit.
        </p>

        <button
          onClick={() => setShowKaddish((s) => !s)}
          className="rounded-full border border-ember/40 px-6 py-2 text-base text-ember transition hover:bg-ember/10"
        >
          {showKaddish ? "Hide the Kaddish" : "Show the Mourner's Kaddish"}
        </button>

        {showKaddish && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden rounded-xl border border-ember/15 bg-white/[0.03] p-6"
          >
            <p className="he text-right text-xl leading-loose text-parchment">
              {PRAYERS.kaddish.replace("קדיש יתום", "").trim()}
            </p>
          </motion.div>
        )}

        <p className="text-stone/80">
          Many also lead the davening (to be the shliach tzibbur), receive an
          aliyah, and learn Mishnayos for the neshama — the letters of{" "}
          <span className="he">מִשְׁנָה</span> rearrange to{" "}
          <span className="he">נְשָׁמָה</span>.
        </p>

        <Link
          href="/words"
          className="inline-block text-ember underline-offset-4 hover:underline"
        >
          All the tefillos — Kaddish, Kel Malei, Yizkor, Tehillim →
        </Link>
      </Step>

      <Divider />

      {/* STEP 3 — LEARN & GIVE */}
      <Step
        index="3"
        kicker="An elevation that lasts"
        title="Learn & give"
        hebrew="לִמּוּד וּצְדָקָה לְעִלּוּי נִשְׁמָה"
      >
        <p>
          Tzedakah given in their memory, and Torah learned in their name, become
          an ongoing aliyah for the neshama — merit that keeps rising long after
          the day has passed.
        </p>
        <p className="text-stone/80">
          Even a small amount, given with their name in mind, connects your deed
          to their soul. Some give the numerical value of the person’s name, or
          simply what their heart moves them to.
        </p>
        <Link
          href="/give"
          className="inline-block text-ember underline-offset-4 hover:underline"
        >
          Ways to give in their memory →
        </Link>
      </Step>

      <Divider />

      {/* STEP 4 — VISIT */}
      <Step
        index="4"
        kicker="If you are able"
        title="Visit the kever"
        hebrew="עֲלִיָּה לַקֶּבֶר"
      >
        <p>
          Many visit the resting place on the yahrzeit — to daven, to say
          Tehillim and Kel Malei, and to place a small stone upon the matzevah as
          a sign that someone came, and remembered.
        </p>
        <p className="text-stone/80">
          There is a quiet order to a visit, and a few halachos worth knowing
          before you go.
        </p>
        <Link
          href="/visit"
          className="inline-block text-ember underline-offset-4 hover:underline"
        >
          The guide to visiting the kever →
        </Link>
      </Step>

      {/* closing */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
        className="mx-auto max-w-xl px-6 py-28 text-center"
      >
        <p className="he text-2xl text-ember/80">תְּהֵא נִשְׁמָתוֹ צְרוּרָה בִּצְרוֹר הַחַיִּים</p>
        <p className="mt-3 text-lg text-stone">
          May their neshama be bound up in the bond of life.
        </p>
        <div className="mt-10 text-sm text-stone/60">
          <Link href="/tools" className="hover:text-ember">
            Tools: find a yahrzeit date · save names · reminders
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
