// Verified Hebrew calendar engine (Dershowitz-Reingold).
// Ported verbatim from the original Ner Zikaron build; cross-checked against Hebcal.
// Months: Nisan=1..Elul=6, Tishrei=7..Shevat=11, Adar/AdarI=12, AdarII=13

export const HebCal = (() => {
  const leap = (y) => ((7 * y + 1) % 19) < 7;
  const monthsInYear = (y) => (leap(y) ? 13 : 12);
  function elapsedDays(y) {
    const me = 235 * Math.floor((y - 1) / 19) + 12 * ((y - 1) % 19) + Math.floor((7 * ((y - 1) % 19) + 1) / 19);
    const pe = 204 + 793 * (me % 1080);
    const he = 5 + 12 * me + 793 * Math.floor(me / 1080) + Math.floor(pe / 1080);
    let day = 1 + 29 * me + Math.floor(he / 24);
    const parts = (he % 24) * 1080 + (pe % 1080);
    if (parts >= 19440 || (day % 7 === 2 && parts >= 9924 && !leap(y)) || (day % 7 === 1 && parts >= 16789 && leap(y - 1))) day += 1;
    if ([0, 3, 5].includes(day % 7)) day += 1;
    return day;
  }
  const daysInYear = (y) => elapsedDays(y + 1) - elapsedDays(y);
  const longCheshvan = (y) => daysInYear(y) % 10 === 5;
  const shortKislev = (y) => daysInYear(y) % 10 === 3;
  function daysInMonth(m, y) {
    if (m === 2 || m === 4 || m === 6 || (m === 8 && !longCheshvan(y)) || (m === 9 && shortKislev(y)) || m === 10 || (m === 12 && !leap(y)) || m === 13) return 29;
    return 30;
  }
  const EPOCH = -1373429;
  function hebrewToAbs(year, month, day) {
    let d = day;
    if (month < 7) {
      for (let m = 7; m <= monthsInYear(year); m++) d += daysInMonth(m, year);
      for (let m = 1; m < month; m++) d += daysInMonth(m, year);
    } else {
      for (let m = 7; m < month; m++) d += daysInMonth(m, year);
    }
    return d + elapsedDays(year) + EPOCH;
  }
  function absToHebrew(abs) {
    let year = Math.floor((abs - EPOCH) / 366) + 1;
    while (abs >= hebrewToAbs(year + 1, 7, 1)) year++;
    let month = abs < hebrewToAbs(year, 1, 1) ? 7 : 1;
    while (abs > hebrewToAbs(year, month, daysInMonth(month, year))) month++;
    return { year, month, day: abs - hebrewToAbs(year, month, 1) + 1 };
  }
  const gLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const GL = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function gregToAbs(y, m, d) {
    let n = d;
    for (let i = 0; i < m - 1; i++) n += GL[i];
    if (m > 2 && gLeap(y)) n += 1;
    const p = y - 1;
    return n + 365 * p + Math.floor(p / 4) - Math.floor(p / 100) + Math.floor(p / 400);
  }
  function absToGreg(abs) {
    let y = Math.floor(abs / 366) + 1;
    while (abs >= gregToAbs(y + 1, 1, 1)) y++;
    let m = 1;
    while (abs > gregToAbs(y, m, GL[m - 1] + (m === 2 && gLeap(y) ? 1 : 0))) m++;
    return { year: y, month: m, day: abs - gregToAbs(y, m, 1) + 1 };
  }
  const MN = {1:"Nisan",2:"Iyar",3:"Sivan",4:"Tammuz",5:"Av",6:"Elul",7:"Tishrei",8:"Cheshvan",9:"Kislev",10:"Teves",11:"Shevat"};
  const MNH = {1:"ניסן",2:"אייר",3:"סיון",4:"תמוז",5:"אב",6:"אלול",7:"תשרי",8:"חשון",9:"כסלו",10:"טבת",11:"שבט"};
  const monthName = (m, y) => m === 12 ? (leap(y) ? "Adar I" : "Adar") : m === 13 ? "Adar II" : MN[m];
  const monthNameHe = (m, y) => m === 12 ? (leap(y) ? "אדר א׳" : "אדר") : m === 13 ? "אדר ב׳" : MNH[m];
  function yahrzeit(hyear, death) {
    if (hyear <= death.year) return null;
    let month = death.month, day = death.day, special = null;
    if (death.month === 13) {
      month = monthsInYear(hyear) === 13 ? 13 : 12;
      if (month === 12) special = "The passing was in Adar II; in a non-leap year the yahrzeit is kept in the single Adar.";
    } else if (death.month === 12 && leap(death.year) && monthsInYear(hyear) === 13) {
      special = "The passing was in Adar I; in leap years it is kept in Adar I.";
    } else if (death.month === 12 && !leap(death.year) && monthsInYear(hyear) === 13) {
      special = "The passing was in a plain Adar; in leap years the Rema keeps Adar I (prevalent Ashkenazi custom; the Shulchan Aruch — Adar II; some keep both. SA & Rema OC 568:7 — ask your rav).";
    }
    if (death.month === 12 && death.day === 30 && !leap(hyear)) {
      month = 11; day = 30;
      special = "The passing was on 30 Adar I; in a non-leap year (no 30 Adar) the yahrzeit is kept on 30 Shevat.";
    } else if (death.month === 8 && death.day === 30 && !longCheshvan(hyear)) {
      day = 29;
      special = "The passing was on 30 Cheshvan; this year Cheshvan has 29 days, so the yahrzeit is kept on 29 Cheshvan (the day before 1 Kislev).";
    } else if (death.month === 9 && death.day === 30 && shortKislev(hyear)) {
      day = 29;
      special = "The passing was on 30 Kislev; this year Kislev has 29 days, so the yahrzeit is kept on 29 Kislev (the day before 1 Teves).";
    }
    return { year: hyear, month, day, special };
  }
  return { leap, monthsInYear, daysInMonth, hebrewToAbs, absToHebrew, gregToAbs, absToGreg, monthName, monthNameHe, yahrzeit };
})();

export default HebCal;
