import { useMemo } from "react";
import { useUserRoleQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export function useUserCommunityRole(communityId?: string) {
  const { me, meLoading } = useIsAuth();
  const { data: userRoleResponse, loading } = useUserRoleQuery({
    skip: typeof window === "undefined" || !me?.id || !communityId,
    variables: { userId: me?.id!, communityId: communityId! },
  });

  const userRole = useMemo(() => userRoleResponse?.userRole, [
    userRoleResponse,
  ]);
  return { userRole, loading: meLoading || loading };
}
