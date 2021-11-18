import { useCallback, useMemo } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

export function useIsAuth() {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();

  const { showLoginModal } = useUserModalState();
  const checkIsAuth = useCallback(() => {
    // console.log(meLoading);
    // console.log(meResponse?.me);
    if (meLoading) return false;
    if (meResponse?.me) return true;
    // console.log("show");

    showLoginModal();
    return false;
  }, [meLoading, showLoginModal, meResponse]);
  const isAuth = useMemo(() => !!meResponse?.me, [meResponse]);
  return { checkIsAuth, meLoading, isAuth, me: meResponse?.me };
}
