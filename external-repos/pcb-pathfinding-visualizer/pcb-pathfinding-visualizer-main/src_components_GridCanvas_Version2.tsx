import React from "react";

export function GridCanvas() {
  // Placeholder for grid visualizer
  return (
    <div className="flex-1 bg-gray-100 p-4">
      <svg width={400} height={400}>
        {/* Grid rendering will go here */}
      </svg>
      <div className="mt-2 text-gray-500">Grid will be rendered here.</div>
    </div>
  );
}