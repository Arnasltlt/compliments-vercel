'use client';
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from '../styles/page.module.css';

export default function Home() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('compliment');

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) { // Prevent deselecting all buttons
      setMode(newMode);
      handleGenerateContent(newMode);
    }
  };

  const handleGenerateContent = async (mode) => {
    setIsLoading(true);
    let endpoint = "";
    switch (mode) {
      case 'compliment':
        endpoint = "/api/generateCompliment";
        break;
      case 'anecdote':
        endpoint = "/api/generateAnecdote";
        break;
      case 'horoscope':
        endpoint = "/api/generateHoroscope";
        break;
      default:
        break;
    }
    
    const response = await fetch(endpoint, {
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
    setContent(data.content);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGenerateContent(mode);
  }, []);

  return (
    <div className={styles.container}>
      <img 
        src="images/logos.png" 
        alt="Sweet Whispers logo" 
        className={styles.logo} 
      />
      <main className={styles.main}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          className={styles.toggleButtonGroup}
        >
          <ToggleButton value="compliment">❤️</ToggleButton>
          <ToggleButton value="anecdote">😄</ToggleButton>
          <ToggleButton value="horoscope">🔮</ToggleButton>
        </ToggleButtonGroup>
        <div className={styles.contentContainer}>
          {content ? (
            <>
              <p className={styles.compliment}>{content}</p>
              <button className={styles.generateButton} onClick={() => handleGenerateContent(mode)} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "More"}
              </button>

            </>
          ) : (
            <p>Thinking of how great you are...</p>
          )}
        </div>

      </main>
    </div>
  );
}
