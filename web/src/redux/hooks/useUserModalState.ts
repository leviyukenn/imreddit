import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { USER_MODAL_CONTENT } from "../types/types";
// export enum USER_MODAL_CONTENT {
//   LOGIN = "Login",
//   REGISTER = "Sign up",
//   FORGOT_PASSWORD = "Reset your password",
// }

export function useUserModalState() {
  const router = useRouter();
  // href={`${router.asPath}?postId=${post.id}`}
  // as={`/r/${post.community.name}/${post.id}`}

  const isOpen = useMemo(() => !!router.query.userModal, [router]);

  const showWhichContent = useMemo(() => {
    if (!router.query.userModal || typeof router.query.userModal !== "string") {
      return USER_MODAL_CONTENT.LOGIN;
    }

    const userModalContent = parseInt(
      router.query.userModal as string
    ) as USER_MODAL_CONTENT;
    return userModalContent;
  }, [router]);

  const onClose = useCallback(() => {
    router.push(`${router.pathname}`, `${router.pathname}`, { shallow: true });
  }, [router]);

  const showLoginModal = useCallback(() => {
    router.push(
      `${router.pathname}?userModal=${USER_MODAL_CONTENT.LOGIN}`,
      `/login`,
      { shallow: true }
    );
  }, [router]);

  const showRegisterModal = useCallback(() => {
    router.push(
      `${router.pathname}?userModal=${USER_MODAL_CONTENT.REGISTER}`,
      `/register`,
      { shallow: true }
    );
  }, [router]);

  const showForgotPasswordModal = useCallback(() => {
    router.push(
      `${router.pathname}?userModal=${USER_MODAL_CONTENT.FORGOT_PASSWORD}`,
      `/forgot_password`,
      { shallow: true }
    );
  }, [router]);

  const showLoginPage = useCallback(() => {
    router.push(`/login`);
  }, [router]);

  const showRegisterPage = useCallback(() => {
    router.push(`/register`);
  }, [router]);

  const showForgotPasswordPage = useCallback(() => {
    router.push(`/forgot_password`);
  }, [router]);

  return {
    isOpen,
    onClose,
    showWhichContent,
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    showLoginPage,
    showRegisterPage,
    showForgotPasswordPage,
  };
}

// export function useUserModalState() {
//   const userModalState = useSelector(
//     (state: RootState) => state.userModalState
//   );
//   const dispatch = useDispatch();

//   const onClose = useCallback(() => {
//     dispatch(closeUserModal());
//   }, [dispatch]);

//   const showLoginModal = useCallback(() => {
//     dispatch(openUserModal());
//     dispatch(changeUserModalContent(USER_MODAL_CONTENT.LOGIN));
//   }, [dispatch]);

//   const showRegisterModal = useCallback(() => {
//     dispatch(openUserModal());
//     dispatch(changeUserModalContent(USER_MODAL_CONTENT.REGISTER));
//   }, [dispatch]);

//   const showForgotPasswordModal = useCallback(() => {
//     dispatch(openUserModal());
//     dispatch(changeUserModalContent(USER_MODAL_CONTENT.FORGOT_PASSWORD));
//   }, [dispatch]);

//   return {
//     isOpen: userModalState.isOpen,
//     onClose,
//     showWhichContent: userModalState.showWhichContent,
//     showLoginModal,
//     showRegisterModal,
//     showForgotPasswordModal,
//   };
// }
