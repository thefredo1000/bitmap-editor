import React, { useState } from "react";
import "./PixelGrid.css"; // Import the CSS file for styling
import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";

const PixelGrid = ({ selectedColor }: { selectedColor: Color }) => {
  const initialGridState = new Array(16)
    .fill(null)
    .map(() => new Array(16).fill("rgb(0,0,0)"));
  const [grid, setGrid] = useState(initialGridState);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Function to toggle cell color
  const toggleCellColor = (row: number, col: number) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      rowArr.map((color, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return convertColorToCSSColor(selectedColor);
        }
        return color;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div
      className="grid"
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              style={{ backgroundColor: color }}
              onMouseOver={() => isMouseDown && toggleCellColor(rowIndex, colIndex)}
              onMouseDown={() => {
                setIsMouseDown(true);
                toggleCellColor(rowIndex, colIndex);
              }}
              onMouseUp={() => setIsMouseDown(false)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelGrid;
