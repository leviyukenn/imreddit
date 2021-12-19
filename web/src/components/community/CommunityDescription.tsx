import {
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
import React from "react";
import { RegularCommunityFragment } from "../../generated/graphql";

interface CommunityDescriptionProps {
  community: RegularCommunityFragment;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "2rem",
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
  })
);

const CommunityDescription = ({ community }: CommunityDescriptionProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={"About Community"}
        classes={{ root: classes.headerRoot, title: classes.title }}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {community.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default CommunityDescription;
