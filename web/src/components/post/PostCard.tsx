import {
  Card,
  CardContent,
  CardProps,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Post } from "../../generated/graphql";

interface PostCardProps extends CardProps {
  post: {
    __typename?: "Post" | undefined;
  } & Pick<
    Post,
    | "id"
    | "title"
    | "createdAt"
    | "updatedAt"
    | "textSnippet"
    | "points"
    | "creatorId"
  >;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

const PostCard = ({ post, ...props }: PostCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} {...props}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.textSnippet}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PostCard;
