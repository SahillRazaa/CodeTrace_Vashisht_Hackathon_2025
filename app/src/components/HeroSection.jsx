import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import HeroImage from '../images/hero_image.jpg';

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 600px;

  h1 {
    font-size: 4rem;
    color: ${({ themeMode, theme }) => theme[themeMode].text};
    margin-bottom: 1.5rem;
    line-height: 1.1;
    font-weight: 800;
    
    span {
      color: ${({ themeMode, theme }) => theme[themeMode].primary};
      position: relative;
      display: inline-block;

      &::after {
        content: '';
        position: absolute;
        bottom: 8px;
        left: 0;
        width: 100%;
        height: 12px;
        background: ${({ themeMode, theme }) => theme[themeMode].primary}40;
        z-index: -1;
        border-radius: 4px;
      }
    }
  }

  p {
    font-size: 1.1rem;
    color: ${({ themeMode, theme }) => themeMode === 'dark' ? '#8892b0' : '#666'};
    line-height: 1.6;
    margin-bottom: 2.5rem;
  }
`;

const GraphicContainer = styled.img`
  flex: 1;
  max-width: 560px;
  height: 400px;
  border-radius: 24px;
`;

const AuthButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 1.5px solid ${({ themeMode, theme }) => theme[themeMode].primary};
  background: ${({ filled, themeMode, theme }) => 
    filled ? theme[themeMode].primary : 'transparent'};
  color: ${({ filled, themeMode, theme }) => 
    filled ? (themeMode === 'dark' ? '#0a192f' : '#ffffff') : theme[themeMode].primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  gap: 8px;
  align-items: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ themeMode, theme }) => 
      theme[themeMode].primary}20;
  }
`;

export default function HeroSection({ themeMode, theme }) {
  return (
    <section style={{ width: '100vw', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', padding: '0 5%' }}>
      <SectionContainer>
        <HeroContent>
          <TextContent themeMode={themeMode} theme={theme}>
            <h1>
              <span>Code Analytics</span><br />
              For Modern Developers
            </h1>
            <p>
              Gain deep insights into your coding patterns, optimize workflows, 
              and collaborate effectively with our intelligent development 
              analytics platform.
            </p>
            <Link to='/register'><AuthButton 
              filled 
              themeMode={themeMode}
              theme={theme}
            >
              Start Tracing Now
            </AuthButton>
            </Link> 
          </TextContent>
          <GraphicContainer src={HeroImage} />
        </HeroContent>
      </SectionContainer>
    </section>
  );
}