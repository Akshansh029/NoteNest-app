import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
          <Route
            path="/"
            element={
              <Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
