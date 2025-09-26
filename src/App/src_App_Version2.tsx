import React, { useState } from "react";
import { useGrid } from "./hooks/useGrid";
import { GridCanvas } from "./components/GridCanvas";
import { ControlPanel } from "./components/ControlPanel";
import { astar } from "./algorithms/astar";
import { Grid, GridCell } from "./algorithms/types";

function applyStepToGrid(grid: Grid, step: any): Grid {
  // Overlay step.visited, step.frontier, step.path
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
  for (const v of step.visited) newGrid[v.y][v.x].type = "visited";
  for (const f of step.frontier) newGrid[f.y][f.x].type = "frontier";
  for (const p of step.path) newGrid[p.y][p.x].type = "path";
  return newGrid;
}

function App() {
  const {
    grid, setGrid, rows, cols, setRows, setCols,
    resetGrid, placeCell, start, goal
  } = useGrid(20, 20);

  const [algorithm, setAlgorithm] = useState("A*");
  const [selectedType, setSelectedType] = useState("obstacle");
  const [isRunning, setIsRunning] = useState(false);

  const [animStep, setAnimStep] = useState(0);
  const [animSteps, setAnimSteps] = useState<any[]>([]);

  // Handle cell click to place item
  function handleCellClick(x: number, y: number) {
    if (isRunning) return;
    placeCell(x, y, selectedType as any);
  }

  // Run algorithm & animate
  async function handleRun() {
    if (!start || !goal) {
      alert("Place both a Start and Goal pin.");
      return;
    }
    setIsRunning(true);
    // Reset all non-S/G cells to free/obstacle only
    setGrid(g =>
      g.map(row =>
        row.map(cell =>
          cell.type === "start" || cell.type === "goal" || cell.type === "obstacle"
            ? cell
            : { ...cell, type: "free" }
        )
      )
    );
    setTimeout(() => {
      const steps = astar(
        grid,
        { ...grid[start.y][start.x], type: "start" },
        { ...grid[goal.y][goal.x], type: "goal" }
      );
      setAnimSteps(steps);
      setAnimStep(0);

      // Animate each step
      let i = 0;
      function next() {
        setAnimStep(i);
        setGrid(applyStepToGrid(grid, steps[i]));
        i++;
        if (i < steps.length) setTimeout(next, 60);
        else setIsRunning(false);
      }
      next();
    }, 50);
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">PCB Pathfinding Visualizer</h1>
        <ControlPanel
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          resetGrid={resetGrid}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onRun={handleRun}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          isRunning={isRunning}
        />
      </div>
      <div className="p-4 flex items-center">
        <GridCanvas grid={grid} onCellClick={handleCellClick} />
      </div>
    </div>
  );
}

export default App;