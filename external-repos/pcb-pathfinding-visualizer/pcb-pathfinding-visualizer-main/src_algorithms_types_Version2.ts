export type CellType = "free" | "obstacle" | "start" | "goal" | "path" | "visited" | "frontier";

export interface GridCell {
  x: number;
  y: number;
  type: CellType;
  cost?: number;
}

export type Grid = GridCell[][];