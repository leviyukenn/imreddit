import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

export function useIsAuth() {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();
  const router = useRouter();
  const { showLoginModal } = useUserModalState();
  const checkIsAuth = useCallback(() => {
    if (meResponse?.me) return true;
    router.replace("/?next=" + router.pathname);
    showLoginModal();
    return false;
  }, [router, showLoginModal, meResponse]);

  return { checkIsAuth, meLoading };
}
