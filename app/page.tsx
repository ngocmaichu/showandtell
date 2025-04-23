"use client";
import { useState, useEffect } from "react";

interface Joke { setup: string; punchline: string; }

export default function HomePage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const fetchJoke = () => {
    setJoke(null);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((r) => r.json())
      .then(setJoke);
  };

  useEffect(fetchJoke, []);

  return (
    <main className="main">
      <h1>Random Joke</h1>
      {joke ? (
        <div className="card">
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