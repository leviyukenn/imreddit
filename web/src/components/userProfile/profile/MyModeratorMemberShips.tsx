import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { RegularRoleFragment } from "../../../generated/graphql";
import CommunityIcon from "../../community/CommunityIcon";
import CommunityJoinLeaveButton from "../../community/CommunityJoinLeaveButton";
import CommunityLink from "../../community/CommunityLink";

interface MyModeratorMemberShipsProps {
  moderatingCommunities: RegularRoleFragment["community"][];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #bdbfc0",
      borderRadius: 4,
      padding: "0.75rem",
      marginTop: "1rem",
    },
    icon: {},
    communityInfo: {
      marginLeft: "1rem",
      flex: 1,
    },
    communityName: {
      fontWeight: 700,
    },
  })
);

const MyModeratorMemberShips = ({
  moderatingCommunities,
}: MyModeratorMemberShipsProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" component="p" gutterBottom>
        You're a moderator of these communities
      </Typography>

      {moderatingCommunities.map((community) => (
        <Box
          key={community.id}
          display="flex"
          alignItems="center"
          marginBottom="0.5rem"
        >
          <CommunityIcon icon={community.icon} size="small" />
          <Box className={classes.communityInfo}>
            <CommunityLink communityName={community.name} />
            <Typography variant="caption" component="p">
              {community.totalMemberships +
                (community.totalMemberships > 1 ? " members" : " member")}
            </Typography>
          </Box>
          <CommunityJoinLeaveButton
            {...{
              communityId: community.id,
              communityName: community.name,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
export default MyModeratorMemberShips;
