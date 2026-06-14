"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import HebCal from "@/lib/hebcal";

const HEB_MONTHS = [
  { v: 7, label: "Tishrei" }, { v: 8, label: "Cheshvan" }, { v: 9, label: "Kislev" },
  { v: 10, label: "Teves" }, { v: 11, label: "Shevat" }, { v: 12, label: "Adar / Adar I" },
  { v: 13, label: "Adar II" }, { v: 1, label: "Nisan" }, { v: 2, label: "Iyar" },
  { v: 3, label: "Sivan" }, { v: 4, label: "Tammuz" }, { v: 5, label: "Av" }, { v: 6, label: "Elul" },
];

function fmtGreg(g) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${months[g.month - 1]} ${g.day}, ${g.year}`;
}
function weekday(abs) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Shabbos"];
  return days[((abs % 7) + 7) % 7];
}

export default function ToolsPage() {
  const [mode, setMode] = useState("greg"); // greg | heb
  const [pname, setPname] = useState("");
  const [gdate, setGdate] = useState("");
  const [afterSunset, setAfterSunset] = useState(false);
  const [hday, setHday] = useState(1);
  const [hmonth, setHmonth] = useState(7);
  const [hyear, setHyear] = useState(5784);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("nz_saved") || "[]");
      setSaved(s);
    } catch {}
  }, []);

  function getDeathHebrew() {
    if (mode === "greg") {
      if (!gdate) return null;
      const [y, m, d] = gdate.split("-").map(Number);
      let abs = HebCal.gregToAbs(y, m, d);
      if (afterSunset) abs += 1; // halachic day starts at nightfall
      return HebCal.absToHebrew(abs);
    }
    return { year: Number(hyear), month: Number(hmonth), day: Number(hday) };
  }

  function calculate() {
    const death = getDeathHebrew();
    if (!death) return;
    const deathAbs = HebCal.hebrewToAbs(death.year, death.month, death.day);
    const deathGreg = HebCal.absToGreg(deathAbs);

    const todayAbs = (() => {
      const n = new Date();
      return HebCal.gregToAbs(n.getFullYear(), n.getMonth() + 1, n.getDate());
    })();
    const todayHeb = HebCal.absToHebrew(todayAbs);

    const upcoming = [];
    let startYear = todayHeb.year;
    // ensure first yahrzeit is after death
    while (startYear <= death.year) startYear++;
    let y = startYear;
    while (upcoming.length < 20) {
      const yz = HebCal.yahrzeit(y, death);
      if (yz) {
        const abs = HebCal.hebrewToAbs(yz.year, yz.month, yz.day);
        if (abs >= todayAbs) {
          const g = HebCal.absToGreg(abs);
          const evening = HebCal.absToGreg(abs - 1); // candle lit the evening before
          upcoming.push({
            hebLabel: `${yz.day} ${HebCal.monthName(yz.month, yz.year)} ${yz.year}`,
            hebHe: `${yz.day} ${HebCal.monthNameHe(yz.month, yz.year)}`,
            greg: fmtGreg(g),
            weekday: weekday(abs),
            eveBefore: fmtGreg(evening),
            special: yz.special,
            daysAway: abs - todayAbs,
          });
        }
      }
      y++;
      if (y > startYear + 60) break;
    }

    setResult({
      death,
      deathGreg,
      deathLabel: `${death.day} ${HebCal.monthName(death.month, death.year)} ${death.year}`,
      deathHe: `${death.day} ${HebCal.monthNameHe(death.month, death.year)}`,
      upcoming,
    });
  }

  function saveName() {
    if (!result) return;
    const entry = {
      id: Date.now(),
      name: pname.trim() || "—",
      death: result.death,
      deathLabel: result.deathLabel,
    };
    const next = [...saved, entry];
    setSaved(next);
    localStorage.setItem("nz_saved", JSON.stringify(next));
  }
  function removeSaved(id) {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    localStorage.setItem("nz_saved", JSON.stringify(next));
  }

  const inputCls =
    "w-full rounded-lg border border-ember/25 bg-white/5 px-4 py-3 text-parchment outline-none transition focus:border-ember/60";

  return (
    <PageShell
      title="Tools"
      hebrew="כְּלֵי עֵזֶר"
      kicker="Find the date · save names · reminders"
    >
      <p className="mb-8 text-lg text-stone">
        Enter the date of passing and we’ll find the Hebrew date and the next
        twenty years of yahrzeit dates — with the evening each candle is lit.
      </p>

      {/* mode toggle */}
      <div className="mb-6 inline-flex rounded-full border border-ember/25 p-1">
        {[["greg", "I know the English date"], ["heb", "I know the Hebrew date"]].map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-5 py-2 text-sm transition ${
              mode === m ? "bg-ember/20 text-ember" : "text-stone hover:text-parchment"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <input
          value={pname}
          onChange={(e) => setPname(e.target.value)}
          placeholder="Name (optional)"
          className={inputCls}
        />

        {mode === "greg" ? (
          <>
            <input type="date" value={gdate} onChange={(e) => setGdate(e.target.value)} className={inputCls} />
            <label className="flex items-center gap-3 text-stone">
              <input
                type="checkbox"
                checked={afterSunset}
                onChange={(e) => setAfterSunset(e.target.checked)}
                className="h-4 w-4 accent-amber-400"
              />
              The passing was after nightfall (sunset)
            </label>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            <input type="number" min="1" max="30" value={hday} onChange={(e) => setHday(e.target.value)} placeholder="Day" className={inputCls} />
            <select value={hmonth} onChange={(e) => setHmonth(e.target.value)} className={inputCls}>
              {HEB_MONTHS.map((m) => (
                <option key={m.v} value={m.v} className="bg-night">{m.label}</option>
              ))}
            </select>
            <input type="number" value={hyear} onChange={(e) => setHyear(e.target.value)} placeholder="Year (e.g. 5784)" className={inputCls} />
          </div>
        )}

        <button
          onClick={calculate}
          className="rounded-full border border-ember/40 bg-ember/10 px-8 py-3 text-lg text-ember transition hover:bg-ember/20"
        >
          Find the yahrzeit
        </button>
      </div>

      {/* result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-ember/15 bg-white/[0.03] p-6"
        >
          <p className="text-stone">Date of passing (Hebrew):</p>
          <p className="text-2xl text-parchment">
            {result.deathLabel} <span className="he text-ember/80">{result.deathHe}</span>
          </p>
          <p className="mt-1 text-sm text-stone/70">English: {fmtGreg(result.deathGreg)}</p>

          <div className="goldrule my-5" />
          <p className="mb-3 text-stone">Upcoming yahrzeit dates:</p>
          <ul className="space-y-3">
            {result.upcoming.slice(0, 12).map((u, i) => (
              <li key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-lg text-parchment">
                    {u.hebLabel} <span className="he text-ember/70">{u.hebHe}</span>
                  </span>
                  <span className="text-sm text-stone">
                    {i === 0 ? `in ${u.daysAway} days` : ""}
                  </span>
                </div>
                <div className="mt-1 text-stone">
                  {u.weekday}, {u.greg}
                </div>
                <div className="text-sm text-ember/70">🕯 Candle lit the evening of {u.eveBefore}</div>
                {u.special && (
                  <div className="mt-2 rounded-lg bg-ember/5 p-2 text-sm text-stone/80">{u.special}</div>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={saveName}
            className="mt-5 rounded-full border border-ember/30 px-6 py-2 text-sm text-ember transition hover:bg-ember/10"
          >
            Save this name
          </button>
        </motion.div>
      )}

      {/* saved names */}
      {saved.length > 0 && (
        <div className="mt-10">
          <p className="mb-3 text-stone uppercase tracking-widest text-sm">Saved names</p>
          <ul className="space-y-2">
            {saved.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-parchment">
                  {s.name} <span className="text-stone/70">· {s.deathLabel}</span>
                </span>
                <button onClick={() => removeSaved(s.id)} className="text-sm text-stone/60 hover:text-ember">
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-10 text-sm text-stone/60">
        Note: customs vary for unusual cases (Adar in a leap year, 30 Cheshvan,
        30 Kislev, a delayed burial). Where these apply, a note appears above —
        and your rav is the final word.
      </p>
    </PageShell>
  );
}
