import {
  Spacer,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DarkModeSwitch } from "./default/DarkModeSwitch";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import LoginRegisterModal from "./LoginRegisterModal";

export enum MODAL_CONTENT {
  LOGIN = "Login",
  REGISTER = "Sign up",
  FORGOT_PASSWORD = "Reset your password",
}

export default function NavBar() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };

  const { loading: meLoading, error, data: meResponse } = useMeQuery();
  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    update(cache, { data: logoutResponse }) {
      cache.modify({
        fields: {
          me(loggedInUser) {
            if (logoutResponse?.logout) {
              return null;
            }
            return loggedInUser;
          },
        },
      });
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showWhichContent, setShowWhichContent] = useState<MODAL_CONTENT>(
    MODAL_CONTENT.LOGIN
  );

  const showLoginModal = useCallback(() => {
    onOpen();
    setShowWhichContent(MODAL_CONTENT.LOGIN);
  }, [onOpen, setShowWhichContent]);

  const showRegisterModal = useCallback(() => {
    onOpen();
    setShowWhichContent(MODAL_CONTENT.REGISTER);
  }, [onOpen, setShowWhichContent]);

  let body = null;

  if (!error && !meLoading && meResponse?.me) {
    body = (
      <>
        <Box px="4">
          <Heading size="sm">{meResponse.me.username}</Heading>
        </Box>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          isLoading={logoutLoading}
          onClick={() => logout()}
        >
          Log Out
        </Button>
      </>
    );
  } else {
    body = (
      <>
        <ButtonGroup mtvariant="outline" spacing="6" size="sm">
          <Button colorScheme="teal" variant="outline" onClick={showLoginModal}>
            Login In
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={showRegisterModal}
          >
            Sign Up
          </Button>
        </ButtonGroup>
        <LoginRegisterModal
          isOpen={isOpen}
          onClose={onClose}
          children={null}
          showWhichContent={showWhichContent}
          setShowWhichContent={setShowWhichContent}
        />
      </>
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
