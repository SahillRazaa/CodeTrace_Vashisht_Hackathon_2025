import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import {useSelector} from 'react-redux';

const Container = styled.section`
  width: 100%;
  padding: 4rem 5%;
  background: ${({ themeMode, theme }) => theme[themeMode].background};
  color: ${({ themeMode, theme }) => theme[themeMode].text};
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ themeMode, theme }) => theme[themeMode].secondaryText || '#888'};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceCard = styled.div`
  background: ${({ themeMode, theme }) => theme[themeMode].cardBackground};
  border: 1px solid ${({ themeMode, theme }) => theme[themeMode].border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;

  position: relative;
  background: ${({ themeMode, theme, comingSoon }) => 
    comingSoon ? theme[themeMode].disabledBg : theme[themeMode].cardBackground};
  border: 1px solid ${({ themeMode, theme, comingSoon }) => 
    comingSoon ? theme[themeMode].disabledBorder : theme[themeMode].border};
  filter: ${({ comingSoon }) => comingSoon ? 'grayscale(0.7)' : 'none'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 10px;
  right: -30px;
  background: ${({ themeMode, theme }) => theme[themeMode].primary};
  color: white;
  padding: 0.5rem 2rem;
  transform: rotate(45deg);
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
`;

const ServiceGraphic = styled.div`
  height: 200px;
  background: ${({ themeMode, theme }) => theme[themeMode].secondary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
`;

const ServiceContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
  margin: 0;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ themeMode, theme }) => themeMode === 'dark' ? '#8892b0' : '#666'};
`;

const ExploreButton = styled.button`
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  border: 1.5px solid ${({ themeMode, theme }) => theme[themeMode].primary};
  background: transparent;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;

  ${({ comingSoon, themeMode, theme }) => comingSoon && `
    border-color: ${theme[themeMode].disabledText};
    color: ${theme[themeMode].disabledText};
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ themeMode, theme }) => theme[themeMode].primary}20;
  }
`;

const features = [
  {
    title: 'Dry Run Visualizer',
    description: 'Step-through code execution with visualization of variables and memory states',
    icon: '🔍',
    to: '/service/dry-run-visualizer',
    comingSoon: false,
  },
  {
    title: 'Code Optimizer',
    description: 'Get AI-powered suggestions for optimizing your code performance',
    icon: '⚡',
    to: '/service/code-optimizer',
    comingSoon: false,
  },
  {
    title: 'Real-life Examples',
    description: 'Explore code implementations through practical, real-world scenarios',
    icon: '📚',
    to: '/service/relate-real-life',
    comingSoon: false,
  },
  {
    title: 'Bug Fix Game',
    description: 'Learn debugging through interactive challenges and puzzles',
    icon: '🎮',
    to: '/service/fix-bug-game',
    comingSoon: false,
  },
  {
    title: 'Code Flow Analyzer',
    description: 'Visualize code execution paths and data flow diagrams',
    icon: '📊',
    to: '/ollama',
    comingSoon: true,
  },
  {
    title: 'AI Chat Assistant',
    description: '24/7 programming help and conceptual explanations',
    icon: '🤖',
    to: '/ollama',
    comingSoon: true,
  },
];

export default function ServiceSection({ themeMode, theme }) {

  const userName = useSelector(state => state.auth);

  return (
    <Container themeMode={themeMode} theme={theme}>
      <SectionContainer>
        <HeroSection>
          <HeroTitle themeMode={themeMode} theme={theme}>
            Welcome, {userName.currentUser.username}!
          </HeroTitle>
          <HeroSubtitle themeMode={themeMode} theme={theme}>
            We welcome you to the epic realm of CodeTrace, where innovation meets excellence.
          </HeroSubtitle>
          <HeroSubtitle themeMode={themeMode} theme={theme}>
            Here are the cutting-edge services we provide to elevate your coding journey.
          </HeroSubtitle>
        </HeroSection>
        <ServicesGrid>
        {features.map((feature, index) => (
        <ServiceCard 
          key={index} 
          delay={index * 0.1}
          themeMode={themeMode} 
          theme={theme}
          comingSoon={feature.comingSoon}
        >
          {feature.comingSoon && <ComingSoonBadge themeMode={themeMode} theme={theme}>COMING SOON</ComingSoonBadge>}
          
          <ServiceGraphic themeMode={themeMode} theme={theme}>
            {feature.icon}
          </ServiceGraphic>
          
          <ServiceContent>
            <ServiceTitle themeMode={themeMode} theme={theme}>
              {feature.title}
            </ServiceTitle>
            <ServiceDescription themeMode={themeMode} theme={theme}>
              {feature.description}
            </ServiceDescription>
            
            {feature.comingSoon ? (
              <ExploreButton 
                themeMode={themeMode} 
                theme={theme}
                comingSoon
                disabled
              >
                Coming Soon
              </ExploreButton>
            ) : (
              <Link to={feature.to}>
                <ExploreButton themeMode={themeMode} theme={theme}>
                  Explore →
                </ExploreButton>
              </Link>
            )}
          </ServiceContent>
        </ServiceCard>
      ))}
        </ServicesGrid>
      </SectionContainer>
    </Container>
  );
}
