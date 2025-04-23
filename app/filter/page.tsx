"use client";

import { useState, useEffect, useTransition } from "react";
export default function FilterPage() {
  const [all, setAll] = useState<{ setup: string }[]>([]);
  const [filtered, setFiltered] = useState<typeof all>([]);
  const [q, setQ] = useState("");
  // useTransition 
  const [isPending, startTransition] = useTransition();
  // simulate light CPU work per item
  const burn = (ms = 0.05) => {
    const end = performance.now() + ms;
    while (performance.now() < end) {}
  };
  // fetch 5,000 items 
  useEffect(() => {
    (async () => {
      const jokes = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      ).then((r) => r.json());
      const big = Array.from({ length: 500 }).flatMap(() => jokes);
      setAll(big);
      setFiltered(big);
    })();
  }, []);

  function handleChange(
    ev: React.ChangeEvent<HTMLInputElement>,
    useTrans: boolean
  ) {
    const nextQ = ev.target.value;
    setQ(nextQ);

    const doFilter = () => {
      setFiltered(
        all.filter((j) => {
          burn();
          return j.setup.toLowerCase().includes(nextQ.toLowerCase());
        })
      );
    };
    if (useTrans) {
      startTransition(doFilter);
    } else {
      doFilter();
    }
  }

  // render 20 setups
  const listItems = filtered.slice(0, 20).map((j, i) => (
    <li key={i}>{j.setup}</li>
  ));

  return (
    <main className="main">
      <h1>Filter Jokes</h1>

      <div className="section">
        <h2>Conventional</h2>
        <input
          className="input"
          placeholder="Search…"
          value={q}
          onChange={(e) => handleChange(e, false)}
        />
        <p>
          {filtered.length} / {all.length}
        </p>
        <ul className="list">
          {listItems}
          {filtered.length > 20 && <li>…</li>}
        </ul>
      </div>

      <div className="section">
        <h2>useTransition</h2>
        <input
          className="input"
          placeholder="Search…"
          value={q}
          onChange={(e) => handleChange(e, true)}
        />
        {isPending && <p className="spinner">Loading…</p>}
        <p>
          {filtered.length} / {all.length}
        </p>
        <ul className="list">
          {listItems}
          {filtered.length > 20 && <li>…</li>}
        </ul>
      </div>
    </main>
  );
}

