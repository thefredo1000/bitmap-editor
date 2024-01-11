import { Box, HStack, Text } from "@chakra-ui/react";
import PixelGrid from "../PixelGrid";
import { useState } from "react";
import ColorPicker from "../ColorPicker";
import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";

export default function Editor() {
  const [selectedColor, setSelectedColor] = useState<Color>({
    RED: 0,
    GREEN: 0,
    BLUE: 0,
  });

  return (
    <HStack>
      <Box w="260px">
        <Text> Selected Color: </Text>
        <Text>
          {selectedColor.RED}, {selectedColor.GREEN}, {selectedColor.BLUE}
        </Text>
        <Box
          h="10px"
          w="10px"
          bgColor={convertColorToCSSColor(selectedColor)}
        ></Box>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </Box>
      <PixelGrid selectedColor={selectedColor} />
    </HStack>
  );
}
