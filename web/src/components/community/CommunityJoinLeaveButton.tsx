import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { useJoinLeaveCommunity } from "../../graphql/hooks/useJoinLeaveCommunity";
import { useUserCommunityRole } from "../../graphql/hooks/useUserCommunityRole";

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

const CommunityJoinLeaveButton = ({
  communityId,
  communityName,
}: CommunityJoinLeaveButtonProps) => {
  const classes = useStyles();
  const [buttonLabel, setButtonLabel] = useState("Joined");
  const { joinCommunity, leaveCommunity } = useJoinLeaveCommunity(
    communityId,
    communityName
  );
  const { userRole } = useUserCommunityRole(communityId);

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
    </>
  );
};
export default CommunityJoinLeaveButton;
