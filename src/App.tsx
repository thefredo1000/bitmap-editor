import { Box, Center, Heading } from "@chakra-ui/react";
import Editor from "./components/Editor";

function App() {
  return (
    <Center bgGradient="linear(#232526 0%, #414345 75%)" h="100vh" w="100vw">
      <Box bg="white" p={8} borderRadius="lg" w="80vw" minH="75vh">
        <Heading>Bitmap Editor</Heading>
        <Editor />
      </Box>
    </Center>
  );
}

export default App;
