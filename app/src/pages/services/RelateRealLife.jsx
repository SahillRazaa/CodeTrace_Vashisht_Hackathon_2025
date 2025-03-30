import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 98vw;
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 124, 255, 0.08);
  position: relative;
    display: flex;
    flex-direction: column;
    align-items :center;
    justify-content: center;
`;

const FloatingNavButton = styled.button`
  position: fixed;
  top: 50px;
  left: 50px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid #007cff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 124, 255, 0.1);
  z-index: 1000;

  &:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 124, 255, 0.2);
    background: #007cff;
    color: white;
  }

  &::after {
    content: "Home";
    position: absolute;
    top: 60px; 
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 80%;
  background: linear-gradient(135deg, rgba(0, 124, 255, 0.05) 0%, rgba(124, 177, 255, 0.05) 100%);
  border-radius: 20px;
  border: 1px solid rgba(0, 124, 255, 0.1);
`;

const Title = styled.h1`
  color: #2d3436;
  
  font-size: 2.75rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  
  span {
    background: linear-gradient(135deg, #007cff 0%, #7cb1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CodeInputWrapper = styled.div`
    width: 80%;
`;

const CodeInputLabel = styled.label`
  display: block;
  color: #2d3436;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const CodeInput = styled.textarea`
  width: 100%;
  height: 45vh;
  border: 2px solid #7cb1ff;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 15px;
  line-height: 1.6;
  resize: none;
  background: white;
  color: #2d3436;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007cff;
    box-shadow: 0 0 0 4px rgba(0, 124, 255, 0.15);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 3rem;
`;

const ConceptCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 124, 255, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 124, 255, 0.1);
  }
`;

const ConceptImage = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  background: ${props => props.src ? `url(${props.src})` : '#f8fafc'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: ${props => props.error ? "'Image not available'" : "''"};
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-style: italic;
  }
`;

const ConceptContent = styled.div`
  padding: 0 0.5rem;
`;

const ConceptTitle = styled.h3`
  color: #007cff;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const ConceptDescription = styled.p`
  color: #2d3436;
  line-height: 1.7;
  font-size: 15px;
  opacity: 0.9;
`;

const AnalyzeButton = styled.button`
  background: linear-gradient(135deg, #007cff 0%, #7cb1ff 100%);
  color: white;
  border: none;
  padding: 1.1rem 2.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2rem auto 0;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 124, 255, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #7cb1ff 0%, #7cb1ff 100%);
  }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #ffeaea;
  color: #ff4444;
  padding: 1.2rem;
  border-radius: 12px;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
  border: 1px solid #ffcccc;
`;

const RelateRealLife = () => {
  const [code, setCode] = useState('');
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUnsplashImage = async (searchTerm) => {
    try {
      const UnsplashKey = 'UnSplash_Access_Key (not given for security)'
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UnsplashKey}`
      );
      const data = await response.json();
      return data.results[0]?.urls?.regular || '';
    } catch (err) {
      return '';
    }
  };

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const explanationResponse = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: `Explain this code by creating 3 real-world analogies. For each analogy, provide:
          1. A descriptive title
          2. Detailed explanation relating code to real-life
          3. 2-3 keywords for image search
          
          Code: ${code}
          
          Format response as JSON: {
            "analogies": [{
              "title": "",
              "explanation": "",
              "keywords": []
            }]
          }`,
          stream: false
        }),
      });

      if (!explanationResponse.ok) throw new Error('Explanation failed');
      const explanationData = await explanationResponse.json();
      const parsedConcepts = JSON.parse(explanationData.response).analogies;

      const conceptsWithImages = await Promise.all(
        parsedConcepts.map(async (concept) => ({
          ...concept,
          image: await getUnsplashImage(concept.keywords.join(' '))
        }))
      );

      setConcepts(conceptsWithImages);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FloatingNavButton onClick={() => navigate('/')} title="Return Home">
        🏠
      </FloatingNavButton>

      <HeroSection>
        <Title>
          <span>Real Life Examples </span>
        </Title>
        <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>
          Transform complex code into real-world understanding
        </p>
      </HeroSection>

      <CodeInputWrapper>
        <CodeInputLabel>Paste Your Code Here</CodeInputLabel>
        <CodeInput
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Example: function calculateTotal(items) {...}"
        />
      </CodeInputWrapper>

      <AnalyzeButton onClick={analyzeCode} disabled={loading}>
        {loading ? (
          <>
            <LoadingSpinner />
            Analyzing...
          </>
        ) : (
          'Explain with Real-life Examples'
        )}
      </AnalyzeButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <br />
      <br />
        {/* {concepts && <h2>Below is you code relation with real life</h2>} */}
      <ConceptGrid>
        {concepts.map((concept, index) => (
          <ConceptCard key={index}>
            <ConceptImage
              src={concept.image}
              error={!concept.image}
              aria-label={concept.title}
            />
            <ConceptContent>
              <ConceptTitle>{concept.title}</ConceptTitle>
              <ConceptDescription>{concept.explanation}</ConceptDescription>
            </ConceptContent>
          </ConceptCard>
        ))}
      </ConceptGrid>
    </Container>
  );
};

export default RelateRealLife;