import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
