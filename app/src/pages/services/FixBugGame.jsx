import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";

const Container = styled.div`
  width: 98vw;
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
  box-sizing: border-box;
`;

const ConfigContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 70vh;
`;

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
`;

const CodePanel = styled(Panel)`
  padding: 0;
  overflow: hidden;
  height: 80vh;
`;

const CodeHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CodeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
  font-size: 20px;
`;

const FloatingNavButton = styled.button`
  position: fixed;
  top: 0px;
  left: 0px;
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
  position: relative;

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


const CodeEditor = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-family: 'Fira Code', monospace;
  font-size: 20px;
  line-height: 1.5;
  resize: none;
  background: #ffffff;
  color: #1e293b;
  min-height: 200px;

  &:focus {
    outline: none;
  }
`;

const CodeDisplay = styled.pre`
  margin: 0;
  overflow: auto;
  code {
    font-family: 'Fira Code', monospace;
  }
`;

const SubmitButton = styled.button`
  background: #007cff;
  color: white;
  border: none;
  font-size: 20px;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1.5rem 0;
  align-self: flex-end;

  &:hover {
    background: #0066cc;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 500;
  font-size: 22px;  
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 18px;
  background: white;
  font-family: 'Inter', sans-serif;
`;

const ResultCard = styled.div`
  background: ${({ score }) => 
    score >= 80 ? '#f0fdf4' : 
    score >= 50 ? '#fffbeb' : 
    '#fef2f2'};
  border: 1px solid;
  border-color: ${({ score }) => 
    score >= 80 ? '#86efac' : 
    score >= 50 ? '#fde047' : 
    '#fca5a5'};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 1200px;
`;

const ButtonContainer = styled.div`
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const FixBugGame = () => {
  const [config, setConfig] = useState({
    language: '',
    category: '',
    difficulty: 'easy'
  });
  const [buggyCode, setBuggyCode] = useState('');
  const [userSolution, setUserSolution] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' }
  ];

  const categories = {
    javascript: ['ReactJS', 'NodeJS', 'Vanilla JS'],
    python: ['Django', 'Flask', 'Data Analysis'],
    java: ['Spring Boot', 'Android', 'Core Java'],
    c: ['Data Structures', 'Algorithms', 'System Programming'],
    cpp: ['Competitive Programming', 'Game Dev', 'System Design']
  };

  const extractCodeBlock = (response) => {
    const codeBlockRegex = new RegExp(`\`\`\`${config.language}\\n([\\s\\S]*?)\\n\`\`\``);
    const match = response.match(codeBlockRegex);
    return match ? match[1] : response;
  };

  const generateBuggyCode = async () => {
    if (!config.language || !config.category) {
      setError('Please select language and category');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: `Generate a ${config.difficulty} level ${config.language} code snippet related to ${config.category} that contains multiple logical and syntax errors. The code should not have any explaination or comments`,
          stream: false
        })
      });

      const data = await response.json();
      const cleanedCode = extractCodeBlock(data.response);
      setBuggyCode(cleanedCode);
      setShowGame(true);
      setResults(null);
    } catch (err) {
      setError('Failed to generate problem');
    } finally {
      setLoading(false);
    }
  };

  const evaluateSolution = async () => {
    if (!userSolution.trim()) {
      setError('Please submit your solution');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: `Original Problem: ${buggyCode}\n\nUser Solution: ${userSolution}\n\nEvaluate correctness percentage (0-100%) and provide corrected code with explanations. Format response as JSON: { "score": number, "corrected": string, "feedback": string }`,
          stream: false
        })
      });

      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (err) {
      setError('Evaluation failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buggyCode) Prism.highlightAll();
  }, [buggyCode]);

  return (
    <Container>
      <FloatingNavButton onClick={() => navigate('/')} title="Return Home">
        🏠
      </FloatingNavButton>

      {!showGame ? (
        <ConfigContainer>
          <p style={{fontSize: "30px", fontWeight: "bold"}}>Configure Your Challenge</p>
          <FormGroup>
            <Label>Programming Language</Label>
            <Select 
              value={config.language}
              onChange={e => setConfig({...config, language: e.target.value})}
            >
              <option value="">Select Language</option>
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Select
              value={config.category}
              onChange={e => setConfig({...config, category: e.target.value})}
              disabled={!config.language}
            >
              <option value="">Select Category</option>
              {config.language && categories[config.language].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Difficulty</Label>
            <Select
              value={config.difficulty}
              onChange={e => setConfig({...config, difficulty: e.target.value})}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormGroup>

          <SubmitButton onClick={generateBuggyCode} disabled={loading}>
            {loading ? 'Generating...' : 'Start Challenge'}
          </SubmitButton>
        </ConfigContainer>
      ) : (
        <>
          <GameContainer>
            <CodePanel>
              <CodeHeader>
                <h3>Buggy Code</h3>
              </CodeHeader>
              <CodeContent>
                <EditorContainer>
                  <CodeDisplay>
                    <code className={`language-${config.language}`}>
                      {buggyCode}
                    </code>
                  </CodeDisplay>
                </EditorContainer>
              </CodeContent>
            </CodePanel>

            <CodePanel>
              <CodeHeader>
                <h3>Your Solution</h3>
              </CodeHeader>
              <CodeContent>
                <EditorContainer>
                  <CodeEditor
                    value={userSolution}
                    onChange={e => setUserSolution(e.target.value)}
                    placeholder="Write your corrected code here..."
                  />
                </EditorContainer>
                <ButtonContainer>
                  <SubmitButton onClick={evaluateSolution} disabled={loading}>
                    {loading ? 'Evaluating...' : 'Submit Solution'}
                  </SubmitButton>
                </ButtonContainer>
              </CodeContent>
            </CodePanel>
          </GameContainer>

          {results && (
            <ResultCard score='20'>
              <details>
                <summary>View Correct Solution</summary>
                <CodeDisplay>
                  <code className={`language-${config.language}`}>
                    {results.response}
                  </code>
                </CodeDisplay>
              </details>
            </ResultCard>
          )}
        </>
      )}
    </Container>
  );
};

export default FixBugGame;