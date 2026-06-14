import "./globals.css";

export const metadata = {
  title: "Ner Zikaron — A Candle of Remembrance",
  description:
    "A quiet companion for the yahrzeit — the day we draw close to the neshama of those we have lost. What to do, the words to say, and the ways we connect.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
