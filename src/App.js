import React from "react";
import Home from "./Home"; // Import the Home component correctly
import MobileHome from "./Mobile/MobileHome"; // Import the MobileHome component correctly
import "./styles.css";

function App() {
  // Determine if the screen width indicates a mobile device
  const isMobile = window.innerWidth <= 768;

  return <div className="app">{isMobile ? <MobileHome /> : <Home />}</div>;
}

export default App;
