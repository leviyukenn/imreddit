import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { RegularCommunityFragment } from "../../generated/graphql";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommunityIcon from "./CommunityIcon";
import CommunityJoinLeaveButton from "./CommunityJoinLeaveButton";

interface CommunityHeaderProps {
  community: RegularCommunityFragment;
  pinnedHeader: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.background.paper,
      height: "100px",
    },
    pinndedHeader: {
      position: "sticky",
      height: "58px",
      top: "56px",
      zIndex: 80,
      backgroundColor: theme.palette.background.paper,
      borderBottom: "#edeff1",
    },
    headerContent: {
      margin: "0 auto",
      maxWidth: "984px",
    },
    communityInfoContainer: {
      display: "flex",
      position: "relative",
      top: "-1em",
    },
    pinnedCommunityInfoContainer: {
      display: "flex",
    },
    communityName: {
      fontWeight: 700,
    },
    communityPath: {
      color: "#7c7c7c",
    },
    communityNameContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
      marginTop: "1.5em",
      paddingLeft: "1em",
    },
    pinnedCommunityNameContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
      paddingLeft: "1em",
    },
  })
);

const CommunityHeader = ({ community, pinnedHeader }: CommunityHeaderProps) => {
  const classes = useStyles();
  const { icon } = useCommunityAppearance();

  return (
    <div className={pinnedHeader ? classes.pinndedHeader : classes.header}>
      <Box className={classes.headerContent}>
        <Box
          className={
            pinnedHeader
              ? classes.pinnedCommunityInfoContainer
              : classes.communityInfoContainer
          }
        >
          <CommunityIcon icon={icon} size={pinnedHeader ? "medium" : "large"} />
          <Box
            className={
              pinnedHeader
                ? classes.pinnedCommunityNameContainer
                : classes.communityNameContainer
            }
          >
            <Box>
              <Typography variant="h5" className={classes.communityName}>
                {community.name}
              </Typography>
              {pinnedHeader ? null : (
                <Typography
                  variant="subtitle2"
                  className={classes.communityPath}
                >{`r/${community.name}`}</Typography>
              )}
            </Box>
            <CommunityJoinLeaveButton
              {...{
                communityId: community.id,
                communityName: community.name,
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default CommunityHeader;
