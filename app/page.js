'use client'
import React, { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const compliments = [
    "You are amazing!",
    "You are awesome!",
    "You are a superstar!",
    "You make the world a better place!",
    "You are loved and appreciated!",
  ];

  const [compliment, setCompliment] = useState(compliments[0]); // Initial compliment

  const generateCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const newCompliment = compliments[randomIndex];
    setCompliment(newCompliment);
  };

  return (
    <main className={styles.main}>
      <h1>Welcome to the ComplimentMe App!</h1>
      <p className={styles.description}>Get ready to feel good with personalized compliments!</p>
      <p className={styles.compliment}>{compliment}</p>
      <button className={styles["generate-button"]} onClick={generateCompliment}>Generate New Compliment</button>
    </main>
  );
}
