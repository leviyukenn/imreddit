import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { RegularCommunityFragment } from "../../generated/graphql";
import CommunityDescriptionEditor from "./CommunityDescriptionEditor";

interface CommunityDescriptionProps {
  community: RegularCommunityFragment;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#edeff1",
      border: "1px solid #bdbfc0",
      borderRadius: 4,
    },
    headerRoot: {
      backgroundColor: "#373c3f",
      padding: "0.75rem",
    },
    title: {
      fontSize: "0.875rem",
      fontWeight: 700,
      color: "#fff",
    },
    communityDescriptionContainer: {
      cursor: "pointer",
      transition: "all .1s linear 0s",
      "&:hover": {
        border: "1px solid #0079d3",
        borderRadius: "4px",
        padding: "0.5em",
      },
    },
    totalMemberships: {
      marginTop: "1em",
      lineHeight: "1em",
    },
    createdDateContainer: {
      display: "flex",
      marginTop: "1.5em",
    },
    createdDate: {
      marginLeft: "0.5em",
    },
    createPostButton: {
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
  })
);

const CommunityDescriptionModeratorMode = ({
  community,
}: CommunityDescriptionProps) => {
  const classes = useStyles();
  const [showDescriptionEditor, setShowDescriptionEditor] = useState<boolean>(
    false
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        title={"About Community"}
        classes={{ root: classes.headerRoot, title: classes.title }}
      />
      <CardContent>
        <Box>
          {showDescriptionEditor ? (
            <CommunityDescriptionEditor
              {...{
                description: community.description,
                setShowDescriptionEditor,
              }}
            />
          ) : (
            <Box
              className={classes.communityDescriptionContainer}
              onClick={() => setShowDescriptionEditor(true)}
            >
              <Typography variant="body2" component="p">
                {community.description}
              </Typography>
              <EditIcon />
            </Box>
          )}
        </Box>
        <Typography
          variant="h6"
          component="p"
          className={classes.totalMemberships}
        >
          {community.totalMemberships}
        </Typography>
        <Typography variant="subtitle2" component="p" gutterBottom>
          Memberships
        </Typography>
        <Box display="flex" className={classes.createdDateContainer}>
          <CakeIcon />
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.createdDate}
          >
            {`Created ${new Date(+community.createdAt).toDateString()}`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          className={classes.createPostButton}
        >
          Create Post
        </Button>
      </CardActions>
    </Card>
  );
};
export default CommunityDescriptionModeratorMode;
