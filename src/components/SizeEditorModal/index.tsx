import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Size } from "../../types/grid";

export default function SizeEditorModal({
  isOpen,
  onClose,
  setSize,
  size,
}: {
  isOpen: boolean;
  onClose: () => void;
  size: Size;
  setSize: (size: Size) => void;
}) {
  const [newSize, setNewSize] = useState<Size>({
    width: size.width,
    height: size.height,
  });

  const handleSubmit = () => {
    setSize(newSize);
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
          <HStack>
            <Text w="100px"> Width: </Text>
            <Input
              variant="flushed"
              placeholder="width (px)"
              onChange={(event) => {
                setNewSize({
                  ...newSize,
                  width: isNaN(parseInt(event.target.value))
                    ? 4
                    : parseInt(event.target.value),
                });
              }}
              defaultValue={size.width.toString()}
            />
          </HStack>
          <HStack>
            <Text w="100px"> Height: </Text>
            <Input
              variant="flushed"
              placeholder="heigth (px)"
              onChange={(event) => {
                setNewSize({
                  ...newSize,
                  height: isNaN(parseInt(event.target.value))
                    ? 4
                    : parseInt(event.target.value),
                });
              }}
              defaultValue={size.height.toString()}
            />
          </HStack>
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
