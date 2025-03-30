# Vashisht Hackathon 2.0 2025

# CodeTrace: AI-Powered Code Debugger, Optimizer & Dry-Run Visualizer

CodeTrace is an interactive debugging and dry-run visualization tool designed to help developers understand code execution step by step. It goes beyond traditional debugging by integrating gamified bug-fixing challenges and real-life-inspired coding scenarios. The platform allows users to input their code, visualize execution flow, identify logical errors, and improve problem-solving skills through engaging exercises. Whether you're a beginner learning code execution or an experienced developer debugging complex logic, CodeTrace makes the process intuitive and insightful.
## Problem Statement
Debugging and understanding code execution is a critical yet often challenging task for developers. Traditional debugging tools provide breakpoints and step-through execution but lack intuitive visual representation, making it difficult for beginners and even experienced developers to grasp complex logic flows efficiently.

Additionally, many developers struggle with translating real-world problems into code and fixing bugs in an engaging, practical manner. Existing solutions do not emphasize learning through interactive means, leaving a gap between theoretical coding knowledge and real-world debugging experience.

### Challenges Faced by Developers
- **Lack of Visual Debugging:** Most debugging tools focus on line-by-line execution but do not provide a clear, visual representation of the code flow.
- **Steep Learning Curve for Beginners:** Many aspiring developers struggle with understanding how their code runs behind the scenes.
- **Time-Consuming Debugging Process:** Manually tracing errors and fixing bugs can be inefficient and frustrating.
- **Limited Interactive Learning:** Debugging is often learned through trial and error rather than structured, engaging challenges.
- **Gap Between Theory and Practice:** Many developers lack exposure to real-world bug-fixing scenarios that mimic industry challenges.

## Team Members
- **Sahil Raza Ansari (EC22B1134): ec22b1134@iiitdm.ac.in**
- **Kanugual Monisha (EC22B1005): ec22b1005@iiitdm.ac.in**

## Solution Overview
CodeTrace provides a structured and interactive approach to debugging and problem-solving:
- **Code Execution Visualization:** It visually represents the execution flow, allowing users to trace each step of their code.
- **AI-Powered Bug Detection:** Integrated AI helps identify common coding mistakes and suggests possible fixes.
- **Engaging Challenges:** Gamified bug-fixing exercises enhance learning by presenting real-world coding problems.
- **Multi-Language Support:** Developers can debug and analyze code in various programming languages.
- **Seamless Integration:** CodeTrace can be integrated with existing coding environments for a smooth debugging experience.
- **User-Friendly Dashboard:** A clean and intuitive interface ensures ease of use for both beginners and experienced programmers.
 
## Features
- **Dry Run Visualizer** – Visualize each step of your code execution in a structured way.
- **Code Optimizer** – Get AI-powered suggestions to improve code efficiency and performance.
- **Real-Life Code Scenarios** – Apply debugging skills to real-world-inspired challenges.
- **Bug Fixing Game Mode** – A fun and engaging way to identify and fix programming errors.
- **User-Friendly Interface** – Easy navigation for both beginners and experienced developers.
- **Multi-Language Support** – Debug code in multiple programming languages.







## 📽YouTube Demo Video

[![Watch the Demo](https://img.youtube.com/vi/MaFyi5ti8jY/maxresdefault.jpg)](https://www.youtube.com/watch?v=MaFyi5ti8jY)

🔗 Click on the image to watch the demo!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file for the server side.

`PORT`

`MONGO_URL`

`JWT_SEC`

Also you need to add a Unsplash Access Token Key in the 'RelatedRealLife.jsx' file which is located at '/app/src/pages/service' from the main directory
# Installation & Setup Guide

Follow this step-by-step guide to set up and run the project on your local machine.

---

## 🛠️ Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Vite](https://vitejs.dev/) (Frontend build tool)
- [MongoDB Atlas](https://www.mongodb.com/atlas) (Database)
- [Ollama](https://ollama.com/download/windows) (For Llama model)
- [Git](https://git-scm.com/) (Version control)
- [Unsplash API Key](https://unsplash.com/developers) (For image generation, optional)

---

## Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/SahillRazaa/CodeTrace_Vashisht_Hackathon_2025.git
cd CodeTrace_Vashisht_Hackathon_2025
```

## Step 2: Install Ollama and Pull Llama Model

Download and install Ollama from: [Ollama](https://ollama.com/download/windows) 

Open a terminal and pull the Llama 3.2 model:

```bash
Ollama pull llama3.2
```
Start the Ollama server:

```bash
Ollama serve
```

## Step 3: Set Up the Frontend

Navigate to the frontend directory:

```bash
cd app
```
Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

This will start the Vite-powered frontend on a local server (usually http://localhost:5173).

## Step 4: Set Up the Backend

Navigate to the backend directory:

```bash
cd ../server
```
Install dependencies:

```bash
npm install
```

Setup Nodemon in the package.json

```bash
"start": "nodemon index.js"
```

Start the backend server:

```bash
npm start
```

The backend will run on http://localhost:8000 by default.

## Step 5: Configure MongoDB Atlas

Create a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/atlas) 

Set up a new database cluster and obtain your MongoDB connection string

Create a .env file inside the server directory and add:

```bash
MONGO_URL = your_mongodb_connection_string
```
Restart the backend server:

```bash
npm start
```

## Step 6: Enable Unsplash API 

Sign up at [Unsplash API Key](https://unsplash.com/developers)

Create an application and get an API access key

Add it to your .env file:

Create a .env file inside the server directory and add:

```bash
UNSPLASH_ACCESS_KEY = your_api_key
```
Restart the backend server:

```bash
npm start
```

## Step 6: Enable Unsplash API 

Sign up at [Unsplash API Key](https://unsplash.com/developers)

Create an application and get an API access key

Add it to your .env file:

Create a .env file inside the server directory and add:

```bash
UNSPLASH_ACCESS_KEY = your_api_key
```
Restart the backend server:

```bash
npm start
```
## Tech Stack  

### Frontend  
- **Vite + React 19** – Fast and modern frontend development  
- **React Router DOM** – Client-side navigation (`react-router-dom`)  
- **React Redux + Redux Persist** – State management (`react-redux`, `redux-persist`)  
- **React Flow** – Interactive flow diagrams and visualizations (`reactflow`)  
- **PrismJS** – Syntax highlighting (`prismjs`)  
- **Styled Components** – CSS-in-JS for styling (`styled-components`)  
- **React Icons** – Icon library (`react-icons`)  
- **Axios** – API requests (`axios`)  

### 🖥Backend  
- **Node.js + Express.js** – Backend framework (`express`)  
- **MongoDB + Mongoose** – Database & ORM (`mongoose`)  
- **JWT (jsonwebtoken)** – Authentication (`jsonwebtoken`)  
- **bcrypt & bcryptjs** – Password hashing (`bcrypt`, `bcryptjs`)  
- **CORS** – Cross-Origin Resource Sharing (`cors`)  
- **dotenv** – Environment variable management (`dotenv`)  
- **Nodemon** – Development utility for auto-restarts (`nodemon`)  

### AI Integration  
- **Ollama + Llama 3.2** – AI model for code analysis  

### Additional APIs  
- **Unsplash API** – Image generation  

### Dev Tools  
- **Git & GitHub** – Version control  
- **Postman** – API testing  

---
