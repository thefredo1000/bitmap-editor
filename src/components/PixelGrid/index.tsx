import { useState } from "react";
import "./PixelGrid.css"; // Import the CSS file for styling
import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";
import { Size } from "../../types/grid";

const PixelGrid = ({
  selectedColor,
  size,
  grid,
  setGrid,
}: {
  selectedColor: Color;
  size: Size;
  grid: string[][];
  setGrid: (grid: string[][]) => void;
}) => {
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
  
  const updateFavicon = () => {
    const canvas = document.createElement("canvas");
    const scale = 16 / Math.max(size.width, size.height); // Scale to fit the favicon size
    canvas.width = 16; // Favicon size
    canvas.height = 16; // Favicon size
    const ctx: any = canvas.getContext("2d");

    grid.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(colIndex * scale, rowIndex * scale, scale, scale); // Fill in each pixel on the canvas
      });
    });

    // Update favicon
    const link: any =
      document.getElementById("favicon") || document.createElement("link");
    console.log(link);
    link.id = "favicon";
    link.rel = "icon";
    link.href = canvas.toDataURL("image/png");
    document.head.appendChild(link);
  };

  return (
    <div
      className="grid"
      onMouseUp={() => {
        setIsMouseDown(false);
        updateFavicon();
      }}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              style={{ backgroundColor: color }}
              onMouseOver={() =>
                isMouseDown && toggleCellColor(rowIndex, colIndex)
              }
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
