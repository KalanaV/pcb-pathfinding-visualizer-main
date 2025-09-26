import React from "react";
import { GridCanvas } from "./components/GridCanvas";
import { ControlPanel } from "./components/ControlPanel";
import "./styles/tailwind.css";

function App() {
  // Main state and logic coming soon!
  return (
    <div className="flex min-h-screen">
      <ControlPanel />
      <GridCanvas />
    </div>
  );
}

export default App;