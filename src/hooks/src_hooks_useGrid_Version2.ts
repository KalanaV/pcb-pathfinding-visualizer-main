import { useState } from "react";
import { Grid, GridCell, CellType } from "../algorithms/types";

export function useGrid(initialRows: number, initialCols: number) {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [grid, setGrid] = useState<Grid>(() =>
    Array.from({ length: initialRows }, (_, y) =>
      Array.from({ length: initialCols }, (_, x) => ({
        x, y, type: "free" as CellType,
      }))
    )
  );
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [goal, setGoal] = useState<{ x: number; y: number } | null>(null);

  const resetGrid = (newRows = rows, newCols = cols) => {
    setRows(newRows);
    setCols(newCols);
    setGrid(
      Array.from({ length: newRows }, (_, y) =>
        Array.from({ length: newCols }, (_, x) => ({
          x, y, type: "free" as CellType,
        }))
      )
    );
    setStart(null);
    setGoal(null);
  };

  // Place a cell (start, goal, obstacle, free)
  const placeCell = (x: number, y: number, type: CellType) => {
    setGrid(g =>
      g.map((row, j) =>
        row.map((cell, i) => {
          if (i === x && j === y) {
            if (type === "start") setStart({ x, y });
            if (type === "goal") setGoal({ x, y });
            return { ...cell, type };
          }
          // Only one start and one goal at a time
          if (
            (type === "start" && cell.type === "start") ||
            (type === "goal" && cell.type === "goal")
          ) {
            return { ...cell, type: "free" };
          }
          return cell;
        })
      )
    );
  };

  return { grid, setGrid, rows, cols, setRows, setCols, resetGrid, placeCell, start, goal };
}