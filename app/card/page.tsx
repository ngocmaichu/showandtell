"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

interface Joke { setup: string; punchline: string; }

export default function CardPage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [h, setH] = useState(200);
  const ref = useRef<HTMLDivElement>(null);

  const fetchJoke = () => {
    setJoke(null);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((r) => r.json())
      .then(setJoke);
  };

  useEffect(fetchJoke, []);

  useLayoutEffect(() => {
    function resize() {
      if (ref.current) {
        setH(ref.current.getBoundingClientRect().width);
      }
    }
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [joke]);

  return (
    <main className="main">
      <h1>Joke Card (useLayoutEffect)</h1>
      {joke ? (
        <div
          ref={ref}
          className="card"
          style={{ height: h, transition: "width 0.3s, height 0.3s" }}
        >
          <p className="setup">{joke.setup}</p>
          <p className="punchline">{joke.punchline}</p>
        </div>
      ) : (
        <p>Loading…</p>
      )}
      <button className="button" onClick={fetchJoke}>
        Get New Joke
      </button>
    </main>
  );
}

