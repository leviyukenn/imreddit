import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { FrontendError } from "../../const/errors";
import {
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
  UserRoleQuery,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { AlertSeverity, SnackbarAlert } from "../errorHandling/SnackbarAlert";

interface CommunityJoinLeaveButtonProps {
  userRole: UserRoleQuery["userRole"];
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
  const [join] = useJoinCommunityMutation({
    update(cache, { data: roleResponse }) {
      cache.modify({
        id: cache.identify({ userId: me?.id!, communityId }),
        fields: {
          isMember(existing: boolean) {
            console.log(existing);
            if (!roleResponse?.joinCommunity.role) {
              return existing;
            }
            return roleResponse.joinCommunity.role.isMember;
          },
          joinedAt(existing: string) {
            if (!roleResponse?.joinCommunity.role) {
              return existing;
            }
            return roleResponse.joinCommunity.role.joinedAt;
          },
        },
      });
    },
  });

  const [leave] = useLeaveCommunityMutation({
    update(cache, { data: roleResponse }) {
      cache.modify({
        id: cache.identify({ userId: me?.id!, communityId }),
        fields: {
          isMember(existing: boolean) {
            console.log(existing);
            if (!roleResponse?.leaveCommunity.role) {
              return existing;
            }
            return roleResponse.leaveCommunity.role.isMember;
          },
        },
      });
    },
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
  };
}

const CommunityJoinLeaveButton = ({
  userRole,
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
