import { Grid, GridCell, PathfindingStep } from "./types";

// Helper: Manhattan distance
function heuristic(a: GridCell, b: GridCell) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Deep clone grid function
function cloneGrid(grid: Grid): Grid {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

// Find neighbors (4-way)
function getNeighbors(cell: GridCell, grid: Grid): GridCell[] {
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];
  const neighbors: GridCell[] = [];
  for (const { dx, dy } of dirs) {
    const nx = cell.x + dx, ny = cell.y + dy;
    if (
      grid[ny] &&
      grid[ny][nx] &&
      grid[ny][nx].type !== "obstacle"
    ) {
      neighbors.push(grid[ny][nx]);
    }
  }
  return neighbors;
}

export function astar(grid: Grid, start: GridCell, goal: GridCell): PathfindingStep[] {
  const steps: PathfindingStep[] = [];
  const openSet: GridCell[] = [start];
  const cameFrom = new Map<string, GridCell>();

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const key = (c: GridCell) => `${c.x},${c.y}`;
  gScore.set(key(start), 0);
  fScore.set(key(start), heuristic(start, goal));

  const visitedSet = new Set<string>();

  while (openSet.length > 0) {
    openSet.sort((a, b) => (fScore.get(key(a)) || Infinity) - (fScore.get(key(b)) || Infinity));
    const current = openSet.shift()!;
    visitedSet.add(key(current));

    // Step: Record this iteration
    const currentVisited = Array.from(visitedSet).map(str => {
      const [x, y] = str.split(',').map(Number);
      return { ...grid[y][x], type: "visited" as const };
    });
    const currentFrontier = openSet.map(c => ({ ...c, type: "frontier" as const }));

    // If goal reached, reconstruct path
    if (current.x === goal.x && current.y === goal.y) {
      const path: GridCell[] = [];
      let curr: GridCell | undefined = current;
      while (curr) {
        path.push({ ...curr, type: "path" });
        curr = cameFrom.get(key(curr));
      }
      steps.push({
        visited: currentVisited,
        frontier: currentFrontier,
        path: path.reverse(),
      });
      return steps;
    }

    for (const neighbor of getNeighbors(current, grid)) {
      if (neighbor.type === "obstacle") continue;
      const tKey = key(neighbor);
      const tentativeG = (gScore.get(key(current)) || Infinity) + 1;
      if (tentativeG < (gScore.get(tKey) || Infinity)) {
        cameFrom.set(tKey, current);
        gScore.set(tKey, tentativeG);
        fScore.set(tKey, tentativeG + heuristic(neighbor, goal));
        if (!visitedSet.has(tKey) && !openSet.some(c => c.x === neighbor.x && c.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }

    steps.push({
      visited: currentVisited,
      frontier: currentFrontier,
      path: [],
    });
  }

  // No path found
  steps.push({
    visited: Array.from(visitedSet).map(str => {
      const [x, y] = str.split(',').map(Number);
      return { ...grid[y][x], type: "visited" as const };
    }),
    frontier: [],
    path: [],
  });

  return steps;
}