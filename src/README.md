# PCB Pathfinding Visualizer

An interactive web app to experiment with pathfinding algorithms (A*, Dijkstra, BFS, etc) on a PCB-style grid.  
Features:
- Draw or upload grid patterns
- Place start/goal pins, obstacles (vias, tracks)
- Run and visualize algorithm steps
- Animate search and compare algorithm performance

## Getting Started

1. **Install dependencies**  
   ```bash
   npm install
   ```
2. **Start development server**  
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/components` — UI components (GridCanvas, ControlPanel, etc)
- `src/algorithms` — Pathfinding algorithms and types
- `src/hooks` — Custom React hooks (grid state, pathfinding logic)
- `src/styles` — Styling (TailwindCSS recommended)
- `src/App.tsx` — Main layout

## References

```markdown
Fork and run these locally to experiment, or adapt their open-source code for your own project!
```

See [REFERENCE_PATHFINDING_VISUALIZERS.md](REFERENCE_PATHFINDING_VISUALIZERS.md) for curated open-source visualizers.

## License

MIT