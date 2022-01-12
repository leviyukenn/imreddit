import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../generated/graphql";
import ImagePostSwiper from "./ImgaePostSwiper";
import UpvoteBox from "./upvote/UpvoteBox";

interface PostDetailProps extends CardProps {
  post: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    upvoteBox: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    communityLink: {
      lineHeight: "20px",
      fontSize: "12px",
      color: theme.palette.text.primary,
      fontWeight: 700,
      "&:hover": {
        textDecoration: "underLine",
        textDecorationColor: theme.palette.text.primary,
      },
    },

    content: {
      paddingTop: 0,
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export const PostDetailCard = ({ post, ...props }: PostDetailProps) => {
  const classes = useStyles();

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);

  const isTextPost = useMemo(() => post.images.length === 0, [post]);
  const router = useRouter();

  return (
    <Card className={classes.root} {...props}>
      <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Box display="flex" alignItems="center">
            <NextLink href={`/r/${post.community.name}`}>
              <Link
                className={classes.communityLink}
                onMouseDown={(
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                }}
              >{`c/${post.community.name}`}</Link>
            </NextLink>
            <span>&nbsp;&#183;&nbsp;</span>
            <Typography variant="caption">{`Posted by ${post.creator.username} ${timeago}`}</Typography>
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        {isTextPost ? (
          <Box dangerouslySetInnerHTML={{ __html: post.text || "" }}></Box>
        ) : (
          <ImagePostSwiper images={post.images} />
        )}
      </CardContent>
    </Card>
  );
};

export const LoadingPostDetailCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box className={classes.upvoteBox}>
        <IconButton aria-label="upvote" size="small">
          <Skeleton />
        </IconButton>
        <Skeleton />
        <IconButton aria-label="downvote" size="small">
          <Skeleton />
        </IconButton>
      </Box>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Skeleton />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Skeleton />
          </IconButton>
        }
        subheader={<Skeleton />}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          <Skeleton />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Skeleton />
        </Typography>
      </CardContent>
    </Card>
  );
};
