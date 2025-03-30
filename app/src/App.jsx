import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DryRunVisualizer from "./pages/services/DryRunVisualizer";
import CodeOptimizer from "./pages/services/CodeOptimizer";
import RelateRealLife from "./pages/services/RelateRealLife";
import FixBugGame from "./pages/services/FixBugGame";

const App = () => {

  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element = {<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/service/dry-run-visualizer" element={<DryRunVisualizer/>}></Route>
        <Route exact path="/service/code-optimizer" element={<CodeOptimizer/>}></Route>
        <Route exact path="/service/relate-real-life" element={<RelateRealLife/>}></Route>
        <Route exact path="/service/fix-bug-game" element={<FixBugGame/>}></Route>
      </Routes>
    </Router>
  )
}
export default App;
