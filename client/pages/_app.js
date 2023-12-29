import '../styles/globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
    // Charger le mode sombre depuis localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Gestion du mode sombre
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      html.classList.toggle('dark', darkMode);
      localStorage.setItem('darkMode', darkMode);
    }
  }, [darkMode]);

  return (
    <ThemeProvider
      value={{
        isDarkMode: darkMode,
        toggleTheme: () => setDarkMode(!darkMode),
      }}
    >
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Layout>
          <Component
            {...pageProps}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </Layout>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
