import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserModalContent,
  closeUserModal,
  openUserModal,
} from "../actions/userModal";
import { RootState } from "../reducers/combinedReducer";
import { USER_MODAL_CONTENT } from "../types/types";

//   const isOpen = useMemo(() => !!router.query.userModal, [router]);

//   const showWhichContent = useMemo(() => {
//     if (!router.query.userModal || typeof router.query.userModal !== "string") {
//       return USER_MODAL_CONTENT.LOGIN;
//     }

//     const userModalContent = parseInt(
//       router.query.userModal as string
//     ) as USER_MODAL_CONTENT;
//     return userModalContent;
//   }, [router]);

//   const onClose = useCallback(() => {
//     router.push(`${router.pathname}`, `${router.pathname}`, { shallow: true });
//   }, [router]);

//   const showLoginModal = useCallback(() => {
//     router.push(
//       `${router.asPath}?userModal=${USER_MODAL_CONTENT.LOGIN}`,
//       `/login`,
//       { shallow: true }
//     );
//   }, [router]);

//   const showRegisterModal = useCallback(() => {
//     router.push(
//       `${router.asPath}?userModal=${USER_MODAL_CONTENT.REGISTER}`,
//       `/register`,
//       { shallow: true }
//     );
//   }, [router]);

//   const showForgotPasswordModal = useCallback(() => {
//     router.push(
//       `${router.asPath}?userModal=${USER_MODAL_CONTENT.FORGOT_PASSWORD}`,
//       `/forgot_password`,
//       { shallow: true }
//     );
//   }, [router]);

//   const showLoginPage = useCallback(() => {
//     router.push(`/login`);
//   }, [router]);

//   const showRegisterPage = useCallback(() => {
//     router.push(`/register`);
//   }, [router]);

//   const showForgotPasswordPage = useCallback(() => {
//     router.push(`/forgot_password`);
//   }, [router]);

//   return {
//     isOpen,
//     onClose,
//     showWhichContent,
//     showLoginModal,
//     showRegisterModal,
//     showForgotPasswordModal,
//     showLoginPage,
//     showRegisterPage,
//     showForgotPasswordPage,
//   };
// }

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
