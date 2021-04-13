import {
  Spacer,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { DarkModeSwitch } from "./default/DarkModeSwitch";
import { useLoginStatusQuery } from "../generated/graphql";

export default function NavBar() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  const [{ data, fetching, error }] = useLoginStatusQuery();
  useEffect(() => {
    console.log("mount");
  }, []);
  console.log(data);
  let body = null;

  if (!error && !fetching && data?.loginStatus.user) {
    body = (
      <>
        <Box px="4">
          <Heading size="sm">{data.loginStatus.user.username}</Heading>
        </Box>
        <Button colorScheme="teal" variant="outline" size="sm">
          <Link href="/">Log Out</Link>
        </Button>
      </>
    );
  } else {
    body = (
      <ButtonGroup mtvariant="outline" spacing="6" size="sm">
        <Button colorScheme="teal" variant="outline">
          <Link href="/login">Login In</Link>
        </Button>
        <Button colorScheme="teal" variant="outline">
          <Link href="/register">Sign Up</Link>
        </Button>
      </ButtonGroup>
    );
  }
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
      {body}
      <Box mx={4}>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
}
