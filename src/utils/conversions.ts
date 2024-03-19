import { Color } from "../types/colors";

export function cssRgbToArray(rgbString: string): number[] {
  // Extract the numerical parts using a regular expression.
  const matches = rgbString.match(
    /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/
  );
  if (!matches) {
    throw new Error("Invalid RGB string format");
  }

  // Convert the matched strings to numbers.
  return matches.slice(1, 4).map(Number);
}

export function createBmp(
  width: number,
  height: number,
  colorGrid: number[][][]
): ArrayBuffer {
  // BMP Header
  const fileHeader = new Uint8Array([
    0x42,
    0x4d, // 'BM'
    0,
    0,
    0,
    0, // File size (to be filled later)
    0,
    0, // Reserved
    0,
    0, // Reserved
    54,
    0,
    0,
    0, // Pixel data offset
  ]);

  // DIB Header
  const dibHeader = new ArrayBuffer(40);
  const dibHeaderView = new DataView(dibHeader);
  dibHeaderView.setInt32(0, 40, true); // Header size
  dibHeaderView.setInt32(4, width, true); // Image width
  dibHeaderView.setInt32(8, height, true); // Image height
  dibHeaderView.setInt16(12, 1, true); // Planes
  dibHeaderView.setInt16(14, 24, true); // Bits per pixel

  // Pixel Data
  const paddingPerRow = (4 - ((width * 3) % 4)) % 4;
  const pixelDataArray = new Uint8Array((width * 3 + paddingPerRow) * height);
  let pixelDataOffset = 0;
  for (let i = height - 1; i >= 0; i--) {
    // BMP files store data bottom-to-top
    for (let j = 0; j < width; j++) {
      const [r, g, b] = colorGrid[i][j];
      pixelDataArray[pixelDataOffset++] = b; // Blue
      pixelDataArray[pixelDataOffset++] = g; // Green
      pixelDataArray[pixelDataOffset++] = r; // Red
    }
    pixelDataOffset += paddingPerRow; // Add padding
  }

  // Update file size in the file header
  const fileSize =
    fileHeader.length + dibHeader.byteLength + pixelDataArray.length;
  const fileHeaderView = new DataView(fileHeader.buffer);
  fileHeaderView.setUint32(2, fileSize, true); // Set the file size

  // Combine headers and pixel data
  const bmpFile = new Uint8Array(fileSize);
  bmpFile.set(fileHeader, 0);
  bmpFile.set(new Uint8Array(dibHeader), fileHeader.length);
  bmpFile.set(pixelDataArray, fileHeader.length + dibHeader.byteLength);

  return bmpFile.buffer;
}

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
