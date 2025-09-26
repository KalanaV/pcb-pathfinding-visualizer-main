import React from "react";
import { Grid, CellType } from "../algorithms/types";

const CELL_SIZE = 24;

const cellColors: Record<CellType, string> = {
  free: "#fff",
  obstacle: "#444",
  start: "#36c",
  goal: "#c33",
  path: "#1c7c54",
  visited: "#e6e6a6",
  frontier: "#f5bb00",
};

export function GridCanvas({
  grid,
  onCellClick,
}: {
  grid: Grid;
  onCellClick: (x: number, y: number) => void;
}) {
  return (
    <svg
      width={grid[0].length * CELL_SIZE}
      height={grid.length * CELL_SIZE}
      style={{ border: "1px solid #bbb", background: "#fafafa" }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <g key={`${x},${y}`}>
            <rect
              x={x * CELL_SIZE}
              y={y * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={cellColors[cell.type]}
              stroke="#bbb"
              strokeWidth={1}
              onClick={() => onCellClick(x, y)}
              style={{ cursor: "pointer" }}
            />
            {/* S/G labels */}
            {(cell.type === "start" || cell.type === "goal") && (
              <text
                x={x * CELL_SIZE + CELL_SIZE / 2}
                y={y * CELL_SIZE + CELL_SIZE / 2 + 4}
                fill="#fff"
                fontWeight="bold"
                fontSize="16"
                textAnchor="middle"
              >
                {cell.type === "start" ? "S" : "G"}
              </text>
            )}
          </g>
        ))
      )}
    </svg>
  );
}