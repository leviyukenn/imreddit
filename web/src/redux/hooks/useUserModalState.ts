import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserModalContent,
  closeUserModal,
  openUserModal,
} from "../actions/userModal";
import { RootState } from "../reducers/combinedReducer";
import { USER_MODAL_CONTENT } from "../types/types";

export function useUserModalState() {
  const userModalState = useSelector(
    (state: RootState) => state.userModalState
  );
  const dispatch = useDispatch();


  const onClose = useCallback(() => {
    dispatch(closeUserModal());
  }, [dispatch]);



  const showLoginModal = useCallback(() => {
    dispatch(openUserModal());
    dispatch(changeUserModalContent(USER_MODAL_CONTENT.LOGIN));
  }, [dispatch]);

  const showRegisterModal = useCallback(() => {
    dispatch(openUserModal());
    dispatch(changeUserModalContent(USER_MODAL_CONTENT.REGISTER));
  }, [dispatch]);

  const showForgotPasswordModal = useCallback(() => {
    dispatch(openUserModal());
    dispatch(changeUserModalContent(USER_MODAL_CONTENT.FORGOT_PASSWORD));
  }, [dispatch]);

  return {
    isOpen: userModalState.isOpen,
    onClose,
    showWhichContent: userModalState.showWhichContent,
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
  };
}
