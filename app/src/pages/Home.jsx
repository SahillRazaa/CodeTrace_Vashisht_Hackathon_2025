import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServiceSection from '../components/ServiceSection';
import { useSelector } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const theme = {
  light: {
    primary: '#007cff',
    secondary: '#7cb1ff',
    background: '#ffffff',
    text: '#2d3436',
    glass: 'rgba(255, 255, 255, 0.95)',
    disabledBg: '#f8f9fa',
    disabledBorder: '#e9ecef',
    disabledText: '#adb5bd',
  },
  dark: {
    primary: '#7cb1ff',
    secondary: '#007cff',
    background: '#0a192f',
    text: '#e6f1ff',
    glass: 'rgba(16, 36, 64, 0.95)',
    disabledBg: '#1a2f4f',      
    disabledBorder: '#2a3f5f',
    disabledText: '#8892b0',   
  }
};

const Container = styled.div`
  width: 98vw;
  min-height: 100vh;
  background: ${({ themeMode }) => theme[themeMode].background};
  overflow-x: hidden;
`;

const MainContent = styled.main`
  width: 100vw;
  margin-top: 80px;
`;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeMode = isDarkMode ? 'dark' : 'light';

  const user = useSelector(state => state.auth);

  return (
    <>
      <GlobalStyle />
      <Container themeMode={themeMode}>
        <Navbar
          themeMode={themeMode}
          isLoggedIn={user.currentUser !== null}
          setIsLoggedIn={setIsLoggedIn}
          setIsDarkMode={setIsDarkMode}
          theme={theme}
        />
        <MainContent>
          {!user.currentUser ? (
            <HeroSection themeMode={themeMode} theme={theme} />
          ) : (
            <ServiceSection themeMode={themeMode} theme={theme} />
          )}
        </MainContent>
      </Container>
    </>
  );
}