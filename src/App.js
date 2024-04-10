import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import Details from "./components/RepoDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/details/:id" element={<Details />} /> */}
      </Routes>
    </Router>
    // <div className="App">
    //   <LandingPage />
    // </div>
  );
}

export default App;
