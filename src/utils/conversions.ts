import { Color } from "../types/colors";

export function convert8BitToCSSColor(color8Bit: number) {
  // Extracting the red, green, and blue components
  const red = (color8Bit >> 6) & 0x03; // Extract the first 2 bits
  const green = (color8Bit >> 4) & 0x03; // Extract the next 2 bits
  const blue = (color8Bit >> 2) & 0x03; // Extract the next 2 bits

  // Scale the values: Multiply by 85 because 255 / 3 = 85
  const redScaled = red * 85;
  const greenScaled = green * 85;
  const blueScaled = blue * 85;

  return `rgb(${redScaled}, ${greenScaled}, ${blueScaled})`;
}

export function convertColorToCSSColor(color: Color): string {
  const red = color.RED * 5;
  const green = color.GREEN * 5;
  const blue = color.BLUE * 5;

  return `rgb(${red}, ${green}, ${blue})`;
}
