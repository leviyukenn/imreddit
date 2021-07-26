import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

export function useIsAuth() {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();
  const router = useRouter();
  const { showLoginModal } = useUserModalState();
  const checkIsAuth = useCallback(() => {
    if (meLoading) return false;
    if (meResponse?.me) return true;

    showLoginModal();
    return false;
  }, [meLoading, router, showLoginModal, meResponse]);
  const isAuth = useMemo(() => !!meResponse?.me, [meResponse]);

  return { checkIsAuth, meLoading, isAuth, me: meResponse?.me };
}
