import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { loginPageLink } from "../links";

export function useIsAuth() {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();
  const router = useRouter();
  const { showLoginModal } = useUserModalState();
  const checkIsAuth = useCallback(() => {
    if (meLoading) return false;
    if (meResponse?.me) return true;

    showLoginModal();
    return false;
  }, [meLoading, showLoginModal, meResponse]);

  const redirectToLoginIfNotLoggedIn = useCallback(() => {
    if (!meResponse?.me && !meLoading) {
      router.push(loginPageLink);
    }
  }, [meResponse, meLoading]);

  const isAuth = useMemo(() => !!meResponse?.me, [meResponse]);
  return {
    checkIsAuth,
    meLoading,
    isAuth,
    me: meResponse?.me,
    redirectToLoginIfNotLoggedIn,
  };
}
