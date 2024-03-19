import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import PixelGrid from "../PixelGrid";
import { useEffect, useState } from "react";
import { Color } from "../../types/colors";
import { Size } from "../../types/grid";
import SizeEditorModal from "../SizeEditorModal";
import ColorPickerModal from "../ColorPickerModal.tsx";
import Palette from "../Palette";
import {
  convertColorToCSSColor,
  createBmp,
  cssRgbToArray,
} from "../../utils/conversions";

export default function Editor() {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const [size, setSize] = useState<Size>({
    width: 16,
    height: 16,
  });

  const [grid, setGrid] = useState(
    new Array(size.width ?? 4)
      .fill(null)
      .map(() => new Array(size.height ?? 4).fill("rgb(0,0,0)"))
  );
  const [colors, setColors] = useState<Color[]>([
    { RED: 0, GREEN: 0, BLUE: 0 },
    { RED: 51, GREEN: 51, BLUE: 51 },
    { RED: 51, GREEN: 0, BLUE: 0 },
    { RED: 0, GREEN: 51, BLUE: 0 },
    { RED: 0, GREEN: 0, BLUE: 51 },
    { RED: 51, GREEN: 51, BLUE: 0 },
    { RED: 51, GREEN: 0, BLUE: 51 },
    { RED: 0, GREEN: 51, BLUE: 51 },
  ]);

  const {
    isOpen: isSizeEditorOpen,
    onOpen: onSizeEditorOpen,
    onClose: onSizeEditorClose,
  } = useDisclosure();
  const {
    isOpen: isColorPickerOpen,
    onOpen: onColorPickerOpen,
    onClose: onColorPickerClose,
  } = useDisclosure();

  const handleColorChange = (color: Color) => {
    const newColors = [...colors];
    newColors[selectedColorIndex] = color;
    setColors(newColors);
  };

  const openColorPicker = (index: number) => {
    setSelectedColorIndex(index);
    onColorPickerOpen();
  };

  useEffect(() => {
    setGrid(
      new Array(size.width)
        .fill(null)
        .map(() =>
          new Array(size.height).fill(
            convertColorToCSSColor(colors[selectedColorIndex])
          )
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <>
      <HStack my={2}>
        <Button
          colorScheme={"green"}
          onClick={() => {
            const numericGrid = grid.map((row) => row.map(cssRgbToArray));
            const buffer = createBmp(grid.length, grid[0].length, numericGrid);
            // Convert the buffer to a Blob
            const blob = new Blob([buffer], {
              type: "application/octet-stream",
            });

            // Create an object URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create an anchor (<a>) element
            const a = document.createElement("a");
            a.href = url;
            a.download = "pixel-art.bmp";

            // Append the anchor to the document body
            document.body.appendChild(a);

            // Programmatically click the anchor to trigger the download
            a.click();

            // Remove the anchor from the document
            document.body.removeChild(a);

            // Release the object URL
            window.URL.revokeObjectURL(url);
          }}
        >
          Download
        </Button>
        <Button
          colorScheme={"yellow"}
          onClick={() => {
            onSizeEditorOpen();
          }}
        >
          Change Size
        </Button>
        <Palette
          selectedColorIndex={selectedColorIndex}
          setSelectedColorIndex={setSelectedColorIndex}
          colors={colors}
          openColorPicker={openColorPicker}
        />
      </HStack>

      <PixelGrid
        grid={grid}
        setGrid={setGrid}
        selectedColor={colors[selectedColorIndex]}
        size={size}
      />
      <ColorPickerModal
        isOpen={isColorPickerOpen}
        onClose={onColorPickerClose}
        selectedColor={colors[selectedColorIndex]}
        setSelectedColor={handleColorChange}
      />
      <SizeEditorModal
        isOpen={isSizeEditorOpen}
        onClose={onSizeEditorClose}
        setSize={setSize}
        size={size}
      />
    </>
  );
}
