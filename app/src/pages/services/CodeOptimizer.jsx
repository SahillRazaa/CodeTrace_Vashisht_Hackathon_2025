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
  width: 100vw;
  height: 100vh;
  background: #f8fafc;
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  box-sizing: border-box;
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
  margin-right: 20px;
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


const EditorPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const ResultPanel = styled.div`
  flex: 1;
  background: white;
  width: 60%;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  position: relative;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const PanelTitle = styled.h3`
  color: #1e293b;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;

  svg {
    color: #007cff;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const CodeEditor = styled.textarea`
  width: 95%;
  flex: 1;
  padding: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 22px;
  line-height: 1.5;
  resize: none;
  background: #ffffff;
  color: #1e293b;

  &:focus {
    outline: none;
    border-color: #007cff;
    box-shadow: 0 0 0 2px rgba(0, 124, 255, 0.1);
  }
`;

const OptimizeButton = styled.button`
  background: #007cff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  align-self: flex-start;

  &:hover {
    background: #0066cc;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const LanguageSelector = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: white;
  color: #1e293b;
  font-family: 'Inter', sans-serif;
  margin-left: auto;
`;

const CodeDisplay = styled.pre`
  position: relative;
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0;
  height: 75vh;
  overflow-y: auto;
  code {
    font-family: 'Fira Code', monospace;
    font-size: 14px;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border: 1px solid #cbd5e1;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #007cff;
  }
`;

const LoadingMessage = styled.div`
  color: #58a6ff;
  font-size: 0.9rem;
`;


const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const CodeOptimizer = () => {
    const [userCode, setUserCode] = useState("");
    const [optimizedCode, setOptimizedCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState("");
    const navigate = useNavigate();

    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "typescript", label: "TypeScript" },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(optimizedCode);
        alert("The code is copied successfully!");
    };

    const extractCodeBlock = (response) => {
        const codeBlockRegex = new RegExp(`\`\`\`${language}\\n([\\s\\S]*?)\\n\`\`\``);
        const match = response.match(codeBlockRegex);
        return match ? match[1] : response;
    };

    const optimizeCode = async () => {
        if (!language) {
            setError("Please select a programming language");
            return;
        }
        if (!userCode.trim()) {
            setError("Please enter some code to optimize");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt: `Optimize and fix the following ${language} code. Provide the corrected version with detailed comments explaining changes. Format response as:\n\n\`\`\`${language}\n[optimized code]\n\`\`\`\n\nCode to optimize:\n${userCode}`,
                    stream: false
                }),
            });

            if (!response.ok) throw new Error("API request failed");
            const result = await response.json();
            const cleanedCode = extractCodeBlock(result.response);
            setOptimizedCode(cleanedCode);
        } catch (err) {
            console.error("Optimization error:", err);
            setError(err.message || "Failed to optimize code. Check if Ollama is running.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (optimizedCode) {
            Prism.highlightAll();
        }
    }, [optimizedCode]);

    return (
        <Container>
            <EditorPanel>
                <PanelHeader>
                <FloatingNavButton onClick={() => navigate('/')} title="Return Home">
                    🏠
                </FloatingNavButton>
                    <PanelTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        Code Input
                    </PanelTitle>
                    <LanguageSelector
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </LanguageSelector>
                </PanelHeader>
                
                <CodeEditor
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Paste your code here..."
                    spellCheck="false"
                />
                
                <OptimizeButton onClick={optimizeCode} disabled={isLoading}>
                    {isLoading ? "Optimizing..." : "Optimize Code"}
                </OptimizeButton>
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </EditorPanel>

            <ResultPanel>
                <PanelHeader>
                    <PanelTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Optimized Code
                    </PanelTitle>
                </PanelHeader>

                {optimizedCode && (
                    <CodeDisplay>
                        <CopyButton onClick={copyToClipboard}>
                            Copy
                        </CopyButton>
                        <code className={`language-${language}`}>
                            {optimizedCode}
                        </code>
                    </CodeDisplay>
                )}

                {isLoading && (
                    <CodeDisplay>
                        <LoadingMessage>Optimizing your code...</LoadingMessage>
                    </CodeDisplay>
                )}
            </ResultPanel>
        </Container>
    );
};

export default CodeOptimizer;