"use client";
import { useState, useEffect, useTransition, ChangeEvent } from "react";

interface Joke { id: number; setup: string; punchline: string; }
function burn(ms: number) {
  const stop = performance.now() + ms;
  while (performance.now() < stop) {}
}

export default function FilterPage() {
  const [all, setAll] = useState<Joke[]>([]);
  const [q, setQ] = useState("");
  const [filtered, setFiltered] = useState<Joke[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_ten")
      .then((r) => r.json())
      .then((data: Joke[]) => {
        const big = Array.from({ length: 500 }).flatMap(() => data);
        setAll(big);
        setFiltered(big);
      });
  }, []);

  const handleConventional = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQ(v);
    const next = all.filter((j) => {
      burn(0.05);
      return j.setup.toLowerCase().includes(v.toLowerCase());
    });
    setFiltered(next);
  };

  const handleTransition = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQ(v);
    startTransition(() => {
      setFiltered(
        all.filter((j) => {
          burn(0.05);
          return j.setup.toLowerCase().includes(v.toLowerCase());
        })
      );
    });
  };

  return (
    <main className="main">
      <h1>Filter Jokes</h1>

      <section className="section">
        <h2>Conventional</h2>
        <input className="input" value={q} onChange={handleConventional} placeholder="Search…" />
        <p>
          {filtered.length} / {all.length}
        </p>
        <ul className="list">
          {filtered.slice(0, 20).map((j, i) => (
            <li key={`${j.id}-${i}`}>{j.setup}</li>
          ))}
          {filtered.length > 20 && <li>…</li>}
        </ul>
      </section>

      <section className="section">
        <h2>useTransition</h2>
        <input className="input" value={q} onChange={handleTransition} placeholder="Search…" />
        {isPending && <p className="spinner">🔄 Filtering…</p>}
        <p>
          {filtered.length} / {all.length}
        </p>
        <ul className="list">
          {filtered.slice(0, 20).map((j, i) => (
            <li key={`${j.id}-${i}`}>{j.setup}</li>
          ))}
          {filtered.length > 20 && <li>…</li>}
        </ul>
      </section>
    </main>
  );
}
