import {
  Spacer,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { DarkModeSwitch } from "./default/DarkModeSwitch";

export default function NavBar() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  return (
    <Flex
      w="100%"
      h={12}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      align="center"
    >
      <Box p="2">
        <Heading size="md">Imreddit</Heading>
      </Box>
      <Spacer />
      <ButtonGroup mtvariant="outline" spacing="6" size="sm">
        <Button colorScheme="teal" variant="outline">
          <Link href="/login">Login In</Link>
        </Button>
        <Button colorScheme="teal" variant="outline">
          <Link href="/register">Sign Up</Link>
        </Button>
      </ButtonGroup>
      <Box mx={4}>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
}
