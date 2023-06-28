'use client';
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from '../styles/page.module.css';

export default function Home() {
  const [compliment, setCompliment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateNewCompliment = async () => {
    setIsLoading(true);
    const response = await fetch("/api/generateCompliment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      console.error('Error from server: ', await response.text());
      throw new Error(response.statusText);
    }
  
    const data = await response.json();
    setCompliment(data.content);
    setIsLoading(false);
  };

  // Run on component mount
  useEffect(() => {
    handleGenerateNewCompliment();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.complimentContainer}>
        {compliment ? (
          <>
            <p className={styles.compliment}>{compliment}</p>
            <button className={styles.generateButton} onClick={handleGenerateNewCompliment} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "More"}
            </button>
          </>
        ) : (
          <p>More...</p>
        )}
      </div>
    </main>
  );
}
