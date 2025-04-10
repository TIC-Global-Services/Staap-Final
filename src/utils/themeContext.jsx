import { createContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply dark/light mode to entire document
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.classList.toggle('light-mode', !isDarkMode);

    // Update CSS variables for global theming
    const newBgColor = isDarkMode ? '#000' : '#fff';
    const newTextColor = isDarkMode ? '#fff' : '#000';

    // Select all elements that need to be animated
    const allElements = [
      document.documentElement,
      document.body,
      ...document.querySelectorAll('h1, h2, h3, h4, h5,h6,[class*="bg-"]')
    ];

    // Animate everything at once
    gsap.to(allElements, {
      duration: 0.9,
      backgroundColor: newBgColor,
      color: newTextColor,
      ease: "power2.inOut",
      stagger: 0,
    });

  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };