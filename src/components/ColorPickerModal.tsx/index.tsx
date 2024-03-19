import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Color } from "../../types/colors";
import { convertColorToCSSColor } from "../../utils/conversions";
import ColorPicker from "../ColorPicker";

export default function ColorPickerModal({
  isOpen,
  onClose,
  selectedColor,
  setSelectedColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}) {
  const [newColor, setNewColor] = useState<Color>(selectedColor);
  useEffect(() => {
    setNewColor(selectedColor);
  }, [selectedColor, isOpen]);

  const handleSubmit = () => {
    setSelectedColor(newColor);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="800px">
        <ModalHeader textAlign="center" fontSize="24px" fontWeight="500">
          Change Size
        </ModalHeader>

        <ModalBody>
          <Box w="260px">
            <Text> Selected Color: </Text>
            <Text>
              {newColor.RED}, {newColor.GREEN}, {newColor.BLUE}
            </Text>
            <Box h="10px" w="10px" bgColor={convertColorToCSSColor(newColor)} />
            <ColorPicker
              selectedColor={newColor}
              setSelectedColor={setNewColor}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            boxShadow="xl"
            colorScheme="green"
            fontWeight="500"
            w={[100, 200, 350]}
            mr="0.5rem"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
