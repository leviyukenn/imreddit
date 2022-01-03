import { Reference } from "@apollo/client/cache";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import { FrontendError } from "../../const/errors";
import {
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
  useUserRoleQuery,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { AlertSeverity, SnackbarAlert } from "../errorHandling/SnackbarAlert";

interface CommunityJoinLeaveButtonProps {
  communityId: string;
  communityName: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    joinButton: {
      borderRadius: "9999px",
      textTransform: "none",
      fontWeight: 700,
      width: "96px",
      lineHeight: "1.5em",
    },
  })
);

function useJoinLeaveCommunity(communityId: string, communityName: string) {
  const { me, checkIsAuth } = useIsAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState<AlertSeverity>(AlertSeverity.ERROR);

  const { data: userRoleResponse } = useUserRoleQuery({
    skip: typeof window === "undefined" || !me?.id || !communityId,
    variables: { userId: me?.id!, communityId },
  });

  const userRole = useMemo(() => userRoleResponse?.userRole, [
    userRoleResponse,
  ]);
  const [join] = useJoinCommunityMutation({
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

  const [leave] = useLeaveCommunityMutation({
    // update(cache, { data: roleResponse }) {
    //   cache.modify({
    //     fields: {
    //       userRoles(
    //         existing: Reference[],
    //         { storeFieldName, toReference, readField }
    //       ) {
    //         const userRole = roleResponse?.leaveCommunity.role;
    //         if (!userRole) {
    //           return existing;
    //         }
    //         if (!storeFieldName.includes(userRole.userId)) {
    //           return existing;
    //         }
    //         const filteredExistingRefs = existing.filter(
    //           (userRoleRef) =>
    //             !(
    //               readField("userId", userRoleRef) === userRole.userId &&
    //               readField("communityId", userRoleRef) === userRole.communityId
    //             )
    //         );
    //         return filteredExistingRefs;
    //       },
    //     },
    //   });
    // },
  });

  const joinCommunity = useCallback(async () => {
    if (!checkIsAuth()) {
      return;
    }
    const joinCommunityResponse = await join({
      variables: { userId: me?.id!, communityId },
    }).catch(() => null);
    const userRole = joinCommunityResponse?.data?.joinCommunity;
    if (!userRole) {
      setErrorMessage(FrontendError.ERR0002);
      setSeverity(AlertSeverity.ERROR);
      return;
    }

    if (userRole?.errors?.length) {
      setErrorMessage(userRole.errors[0].message);
      setSeverity(AlertSeverity.ERROR);
      return;
    }

    if (userRole.role?.isMember) {
      setErrorMessage(`Successfully joined r/${communityName}`);
      setSeverity(AlertSeverity.SUCCESS);
      return;
    }

    setErrorMessage(FrontendError.ERR0002);
    setSeverity(AlertSeverity.ERROR);
  }, [me, communityId, communityName]);

  const leaveCommunity = useCallback(async () => {
    const leaveCommunityResponse = await leave({
      variables: { userId: me?.id!, communityId },
    }).catch(() => null);
    const userRole = leaveCommunityResponse?.data?.leaveCommunity;
    if (!userRole) {
      setErrorMessage(FrontendError.ERR0002);
      setSeverity(AlertSeverity.ERROR);
      return;
    }

    if (userRole?.errors?.length) {
      setErrorMessage(userRole.errors[0].message);
      setSeverity(AlertSeverity.ERROR);
      return;
    }

    if (userRole.role?.isMember === false) {
      setErrorMessage(`Successfully left r/${communityName}`);
      setSeverity(AlertSeverity.SUCCESS);
      return;
    }

    setErrorMessage(FrontendError.ERR0002);
    setSeverity(AlertSeverity.ERROR);
  }, [me, communityId, communityName]);

  return {
    joinCommunity,
    leaveCommunity,
    errorMessage,
    setErrorMessage,
    severity,
    userRole,
  };
}

const CommunityJoinLeaveButton = ({
  communityId,
  communityName,
}: CommunityJoinLeaveButtonProps) => {
  const classes = useStyles();
  const [buttonLabel, setButtonLabel] = useState("Joined");
  const {
    joinCommunity,
    leaveCommunity,
    errorMessage,
    setErrorMessage,
    severity,
    userRole,
  } = useJoinLeaveCommunity(communityId, communityName);

  return (
    <>
      {userRole?.isMember ? (
        <Button
          variant="outlined"
          color="primary"
          className={classes.joinButton}
          onMouseOver={() => {
            setButtonLabel("Leave");
          }}
          onMouseOut={() => {
            setButtonLabel("Joined");
          }}
          onClick={leaveCommunity}
        >
          {buttonLabel}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.joinButton}
          onClick={joinCommunity}
        >
          Join
        </Button>
      )}
      <SnackbarAlert
        {...{
          message: errorMessage,
          setMessage: setErrorMessage,
          severity: severity,
        }}
      />
    </>
  );
};
export default CommunityJoinLeaveButton;
