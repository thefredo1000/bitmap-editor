import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";
import "./Palette.css"; // Import the CSS file for styling

export default function Palette({
  selectedColorIndex,
  setSelectedColorIndex,
  colors,
  openColorPicker,
}: {
  selectedColorIndex: number;
  setSelectedColorIndex: (index: number) => void;
  colors: Color[];
  openColorPicker: (index: number) => void;
}) {
  return (
    <>
      <div className="palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className={
              "color" + (index === selectedColorIndex ? " selected" : "")
            }
            style={{ backgroundColor: convertColorToCSSColor(color) }}
            onClick={() => setSelectedColorIndex(index)}
            onDoubleClick={() => openColorPicker(index)}
          />
        ))}
      </div>
    </>
  );
}
