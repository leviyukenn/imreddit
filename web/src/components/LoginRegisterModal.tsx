import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalProps,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import { MODAL_CONTENT } from "./NavBar";
import Register from "./Register";

interface LoginRegisterModalProps extends ModalProps {
  showWhichContent: MODAL_CONTENT;
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const LoginRegisterModal = ({
  isOpen,
  onClose,
  showWhichContent,
  setShowWhichContent,
}: LoginRegisterModalProps) => {
  let modalContent = null;
  switch (showWhichContent) {
    case MODAL_CONTENT.LOGIN:
      modalContent = (
        <Login onClose={onClose} setShowWhichContent={setShowWhichContent} />
      );
      break;
    case MODAL_CONTENT.REGISTER:
      modalContent = (
        <Register onClose={onClose} setShowWhichContent={setShowWhichContent} />
      );
      break;
    case MODAL_CONTENT.FORGOT_PASSWORD:
      modalContent = (
        <ForgotPassword setShowWhichContent={setShowWhichContent} />
      );
      break;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{showWhichContent}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{modalContent}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default LoginRegisterModal;
