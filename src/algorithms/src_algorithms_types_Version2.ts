export type CellType = "free" | "obstacle" | "start" | "goal" | "path" | "visited" | "frontier";

export interface GridCell {
  x: number;
  y: number;
  type: CellType;
  cost?: number; // For extensions (via cost, weights)
}

export type Grid = GridCell[][];

export interface PathfindingStep {
  visited: GridCell[];
  frontier: GridCell[];
  path: GridCell[];
}