import React from "react";

const algorithms = ["A*"];

export function ControlPanel({
  rows,
  cols,
  setRows,
  setCols,
  resetGrid,
  selectedType,
  setSelectedType,
  onRun,
  algorithm,
  setAlgorithm,
  isRunning,
}: {
  rows: number;
  cols: number;
  setRows: (n: number) => void;
  setCols: (n: number) => void;
  resetGrid: (r?: number, c?: number) => void;
  selectedType: string;
  setSelectedType: (t: string) => void;
  onRun: () => void;
  algorithm: string;
  setAlgorithm: (a: string) => void;
  isRunning: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 border rounded-md min-w-[220px]">
      <div>
        <label className="block mb-2 font-semibold">Grid Size:</label>
        <div className="flex gap-2">
          <input
            type="number"
            min={5}
            max={50}
            value={rows}
            onChange={e => setRows(Number(e.target.value))}
            className="w-14 border rounded px-1"
            disabled={isRunning}
          />
          <span>x</span>
          <input
            type="number"
            min={5}
            max={50}
            value={cols}
            onChange={e => setCols(Number(e.target.value))}
            className="w-14 border rounded px-1"
            disabled={isRunning}
          />
          <button
            className="ml-3 px-2 py-1 rounded bg-gray-200"
            onClick={() => resetGrid(rows, cols)}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <label className="block mb-2 font-semibold">Place:</label>
        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="w-full border rounded px-1"
          disabled={isRunning}
        >
          <option value="obstacle">Obstacle</option>
          <option value="start">Start Pin (S)</option>
          <option value="goal">Goal Pin (G)</option>
          <option value="free">Eraser</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 font-semibold">Algorithm:</label>
        <select
          value={algorithm}
          onChange={e => setAlgorithm(e.target.value)}
          className="w-full border rounded px-1"
          disabled={isRunning}
        >
          {algorithms.map(algo => (
            <option value={algo} key={algo}>{algo}</option>
          ))}
        </select>
      </div>
      <button
        className="mt-4 px-3 py-2 rounded bg-blue-500 text-white font-semibold"
        onClick={onRun}
        disabled={isRunning}
      >
        Run
      </button>
    </div>
  );
}