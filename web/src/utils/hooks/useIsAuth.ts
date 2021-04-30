import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useUserModalState } from "../../redux/hooks/useUserModalState";

export function useIsAuth() {
  const { loading: meLoading, error, data: meResponse } = useMeQuery();
  const router = useRouter();
  const { showLoginModal } = useUserModalState();
  useEffect(() => {
    if (meLoading && error) {
      return;
    }

    if (!meResponse?.me) {
      router.replace("/?next=" + router.pathname);
      showLoginModal();
    }
  }, [router, showLoginModal]);
}
