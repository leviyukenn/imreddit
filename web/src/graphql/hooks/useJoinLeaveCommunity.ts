import { Reference } from "@apollo/client";
import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import {
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export function useJoinLeaveCommunity(
  communityId: string,
  communityName: string
) {
  const { me, checkIsAuth } = useIsAuth();

  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();

  const [join] = useJoinCommunityMutation({
    onError: handleMutationError,
    update(cache, { data: roleResponse }) {
      cache.modify({
        fields: {
          userRoles(
            existing: Reference[],
            { storeFieldName, toReference, readField }
          ) {
            const userRole = roleResponse?.joinCommunity.role;
            if (!userRole) {
              return existing;
            }

            if (!storeFieldName.includes(userRole.userId)) {
              return existing;
            }

            const existingUserRole = existing.find(
              (userRoleRef) =>
                readField("userId", userRoleRef) === userRole.userId &&
                readField("communityId", userRoleRef) === userRole.communityId
            );
            if (existingUserRole) {
              return existing;
            }

            return [...existing, toReference(userRole)];
          },
        },
      });
    },
  });

  const [leave] = useLeaveCommunityMutation();

  const joinCommunity = useCallback(async () => {
    if (!checkIsAuth()) {
      return;
    }
    const joinCommunityResponse = await join({
      variables: { userId: me?.id!, communityId },
    });
    const userRole = joinCommunityResponse?.data?.joinCommunity;
    if (!userRole) {
      return;
    }

    if (userRole?.errors?.length) {
      onOpenSnackbarAlert({
        message: userRole.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      return;
    }

    if (userRole.role?.isMember) {
      onOpenSnackbarAlert({
        message: `Successfully joined r/${userRole.role.community.name}`,
        severity: AlertSeverity.SUCCESS,
      });
      return;
    }

    onOpenSnackbarAlert({
      message: FrontendError.ERR0002,
      severity: AlertSeverity.ERROR,
    });
  }, [me, communityId, communityName]);

  const leaveCommunity = useCallback(async () => {
    const leaveCommunityResponse = await leave({
      variables: { userId: me?.id!, communityId },
    })
    const userRole = leaveCommunityResponse?.data?.leaveCommunity;
    if (!userRole) {
      return;
    }

    if (userRole?.errors?.length) {
      onOpenSnackbarAlert({
        message: userRole.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      return;
    }

    if (userRole.role?.isMember === false) {
      onOpenSnackbarAlert({
        message: `Successfully left r/${userRole.role.community.name}`,
        severity: AlertSeverity.SUCCESS,
      });
      return;
    }

    onOpenSnackbarAlert({
      message: FrontendError.ERR0002,
      severity: AlertSeverity.ERROR,
    });
  }, [me, communityId, communityName]);

  return {
    joinCommunity,
    leaveCommunity,
  };
}
