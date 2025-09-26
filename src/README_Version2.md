# PCB Pathfinding Visualizer

A React-based web app to visualize PCB-like grid routing with A* pathfinding.

## Features

- Draw or upload a PCB grid (cells on a canvas)
- Place Start (S) and Goal (G) pins
- Add obstacles (tracks, vias, pads)
- Run A* algorithm and animate the search process
- See visited cells, open list (frontier), and final path

## Usage

1. Set grid size
2. Place start and goal pins
3. Draw obstacles
4. Run the algorithm

## Tech Stack

- React + TypeScript
- Canvas/SVG for visualization
- TailwindCSS for styling

## Development

```bash
npm install
npm run dev
```

## File Structure

- `src/components`: UI components (GridCanvas, ControlPanel)
- `src/algorithms`: Pathfinding algorithms (A*, types)
- `src/hooks`: React hooks for grid state
- `src/styles`: TailwindCSS

---

**Contributions & extensions welcome!**