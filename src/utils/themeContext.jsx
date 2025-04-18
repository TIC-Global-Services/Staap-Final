import { createContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  // Set initial theme based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  // Animate & apply theme whenever isDarkMode changes
  useEffect(() => {
    // Save theme in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Add/remove theme classes
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.classList.toggle('light-mode', !isDarkMode);

    // Define colors
    const newBgColor = isDarkMode ? '#000' : '#fff';
    const newTextColor = isDarkMode ? '#fff' : '#000';

    // Animate target elements
    const allElements = [
      document.documentElement,
      document.body,
      ...document.querySelectorAll('h1, h2, h3, h4, h5, h6, [class*="bg-"]'),
    ];

    gsap.to(allElements, {
      duration: 0.9,
      backgroundColor: newBgColor,
      color: newTextColor,
      ease: 'power2.inOut',
      stagger: 0,
    });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };