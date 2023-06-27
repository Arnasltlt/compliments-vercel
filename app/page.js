'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const compliments = [
    "You are amazing!",
    "You are awesome!",
    "You are a superstar!",
    "You make the world a better place!",
    "You are loved and appreciated!",
  ];

  const [compliment, setCompliment] = useState(compliments[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Add a transition effect when updating the compliment
    const complimentElement = document.querySelector(`.${styles.compliment}`);
    complimentElement.classList.add(styles.fadeIn);
    setTimeout(() => {
      complimentElement.classList.remove(styles.fadeIn);
    }, 300);
  }, [compliment]);

  const generateCompliment = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * compliments.length);
      const newCompliment = compliments[randomIndex];
      setCompliment(newCompliment);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <main className={styles.main}>
      <p className={styles.compliment}>{compliment}</p>
      <button
        className={`${styles.generateButton} ${isGenerating ? styles.disabled : ''}`}
        onClick={generateCompliment}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate New Compliment'}
      </button>
    </main>
  );
}
