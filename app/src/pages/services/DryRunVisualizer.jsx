import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width:98vw;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #e6f1ff 100%);
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
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


const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 124, 255, 0.1);
  margin: 0 auto 2rem;
  max-width: 1200px;
`;

const Title = styled.h2`
  color: #007cff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const CodeInput = styled.textarea`
  width: 90%;
  max-width: 1200px;
  resize: none;
  margin: 0 auto;
  display: block;
  padding: 1rem;
  border: 2px solid #7cb1ff;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  min-height: 150px;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(124, 177, 255, 0.3);
  }
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, #7cb1ff, #007cff);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:hover {
    transform: translateY(-2px);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(135deg, #007cff 0%, #7cb1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #007cff 0%, #7cb1ff 100%);
    border-radius: 2px;
  }
`;

const ModernCodeInput = styled(CodeInput)`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  box-shadow: 0 4px 20px rgba(0, 124, 255, 0.08);
  transition: all 0.3s ease;
  font-size: 22px;
  line-height: 1.6;
  height: 40vh;
  
  &::placeholder {
    color: #a0aec0;
    font-style: italic;
  }

  &:focus {
    box-shadow: 0 4px 25px rgba(0, 124, 255, 0.15);
  }
`;

const HoverButton = styled(Button)`
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 124, 255, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  border: 4px solid #7cb1ff;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: #ffeaea;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  max-width: 1200px;
  margin: 1rem auto;
`;

const nodeStyle = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,255,0.9) 100%)',
  border: '2px solid rgba(124, 177, 255, 0.3)',
  borderRadius: '16px',
  padding: '2rem',
  minWidth: '300px',
  boxShadow: '0 6px 24px rgba(0, 124, 255, 0.08)',
  backdropFilter: 'blur(6px)',
  transition: 'all 0.3s ease',
};


const ResultContainer = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 1200px;
  margin: 2rem auto;
`;

const NodeCard = styled.div`
  background: rgba(124, 177, 255, 0.1);
  border-left: 4px solid #007cff;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 6px;
  position: relative;
  &::before {
    content: "Step ${props => props.stepNumber}";
    position: absolute;
    top: -10px;
    left: -10px;
    background: #007cff;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const VisualizationType = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const VisualizationTitle = styled.h3`
  color: #007cff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const VisualizationChange = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const VisualizationButton = styled.button`
  background: ${props => props.active ? '#007cff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#007cff'};
  border: 2px solid #007cff;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 124, 255, 0.2);
  }
`;

const CustomNode = ({ data }) => (
  <div style={nodeStyle}>
    <div style={{ 
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      background: '#007cff',
      color: 'white',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    }}>
      {data.stepNumber}
    </div>
    <div style={{ 
      whiteSpace: 'pre-wrap',
      fontFamily: '"Fira Code", monospace',
      lineHeight: '1.5',
      fontSize: '0.9rem'
    }}>
      {data.label}
    </div>
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

const DryRunVisualizer = () => {
    const [userCode, setUserCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [visualType, setVisualType] = useState(1);

    const navigate = useNavigate();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    useEffect(() => {
        if (nodes.length > 0 && reactFlowInstance) {
            setTimeout(() => {
                reactFlowInstance.fitView({ padding: 0.2 });
                const newNodes = nodes.map((node, index) => ({
                    ...node,
                    position: { x: index * 400, y: 100 }
                }));
                setNodes(newNodes);
            }, 10);
        }
    }, [nodes.length, reactFlowInstance]);

    const toggleVisualization = (type) => {
        setVisualType(type);
    };

    const fetchDryRun = async () => {
        if (!userCode.trim()) {
            setError("Please enter some code to analyze.");
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
                    prompt: `For the given code understand the question and then take an example and show in steps (Step1, Step2, etc) how the input is changing in each step till output. Make each step short and brief.
                    ${userCode}`,
                    stream: false
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const result = await response.json();
            
            const steps = result.response
                .split(/(?:\*\*Step |### Step |Step )\d+:\s*/gi)
                .filter(step => {
                    const cleaned = step.trim();
                    return cleaned.length > 0 && !cleaned.match(/^[#*]+$/);
                })
                .map(step => step
                    .replace(/(\*\*|###|`{1,3})/g, '')
                    .replace(/\\/g, '')
                    .trim()
                );

            const newNodes = steps.map((step, index) => ({
                id: `node-${index}`,
                type: 'custom',
                position: { x: index * 400, y: 100 },
                data: { 
                    label: step.replace(/\\/g, '').replace(/`/g, ''),
                    stepNumber: index + 1
                }
            }));

            const newEdges = steps.slice(0, -1).map((_, index) => ({
                id: `edge-${index}`,
                source: `node-${index}`,
                target: `node-${index + 1}`,
                animated: true,
                markerEnd: { type: 'arrowclosed', color: '#007cff' },
                style: { stroke: '#007cff', strokeWidth: 2 }
            }));

            setNodes(newNodes);
            setEdges(newEdges);

        } catch (err) {
            console.error("Ollama API error:", err);
            setError(err.message || "Failed to fetch dry run. Make sure Ollama is running on port 11434.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
          <FloatingNavButton onClick={() => navigate('/')} title="Return Home">
            🏠
        </FloatingNavButton>

        <GlassPanel>
        <GradientTitle>Dry Run Analyzer</GradientTitle>
        
        <ModernCodeInput
          placeholder="Enter your code here..."
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
        
        <HoverButton onClick={fetchDryRun} disabled={isLoading}>
          {isLoading ? "Analyzing Code..." : "Visualize Execution"}
        </HoverButton>
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {nodes.length > 0 && (
                <VisualizationType>
                    <VisualizationTitle>Visualization Mode</VisualizationTitle>
                    <VisualizationChange>
                        <VisualizationButton 
                            onClick={() => toggleVisualization(1)}
                            active={visualType === 1}
                        >
                            Flow Chart
                        </VisualizationButton>
                        <VisualizationButton 
                            onClick={() => toggleVisualization(2)}
                            active={visualType === 2}
                        >
                            Step List
                        </VisualizationButton>
                    </VisualizationChange>
                </VisualizationType>
            )}

            {nodes.length > 0 && (
                visualType === 1 ? (
                    <div style={{ height: '70vh', width: '100%', marginTop: '0rem' }}>
                        <ReactFlowProvider>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                nodeTypes={nodeTypes}
                                onInit={setReactFlowInstance}
                                fitView
                                minZoom={0.2}
                            >
                                <Background color="#7cb1ff" gap={5} />
                                <Controls 
                                    style={{ 
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </ReactFlow>
                        </ReactFlowProvider>
                    </div>
                ) : (
                    <ResultContainer>
                        <h3>Execution Steps:</h3>
                        {nodes.map((node, index) => (
                            <NodeCard key={index} stepNumber={index + 1}>
                                <div style={{ 
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: '"Fira Code", monospace',
                                    lineHeight: '1.5',
                                    fontSize: '1.2rem'
                                }}>
                                    {node.data.label}
                                </div>
                            </NodeCard>
                        ))}
                    </ResultContainer>
                )
            )}
             </GlassPanel>
        </Container>
    );
};

export default DryRunVisualizer;