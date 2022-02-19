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
import { Skeleton } from "@material-ui/lab";
import DOMPurify from "dompurify";
import NextLink from "next/link";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../generated/graphql";
import {
  createCommunityHomeLink,
  createUserProfileLink,
} from "../../utils/links";
import CommunityIcon from "../community/CommunityIcon";
import ImagePostSwiper from "./postCard/ImgaePostSwiper";
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
    // header: {
    //   backgroundColor: theme.palette.background.paper,
    // },
    communityIcon: {
      display: "flex",
      alignItems: "center",
      marginRight: 8,
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

  return (
    <Card className={classes.root} {...props}>
      <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>

      <CardHeader
        avatar={<CommunityIcon icon={post.community.icon} size="small" />}
        classes={{ avatar: classes.communityIcon }}
        subheader={
          <Box display="flex" alignItems="center">
            <NextLink href={createCommunityHomeLink(post.community.name)}>
              <Link
                className={classes.communityLink}
                onMouseDown={(
                  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ) => {
                  e.stopPropagation();
                }}
              >{`r/${post.community.name}`}</Link>
            </NextLink>
            <span>&nbsp;&#183;&nbsp;</span>
            <Typography variant="caption">
              Posted by&nbsp;
              <NextLink
                href={createUserProfileLink(post.creator.username, "posts")}
                passHref
              >
                <Link
                  className={classes.communityLink}
                >{`u/${post.creator.username}`}</Link>
              </NextLink>
              &nbsp;
              {timeago}
            </Typography>
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        {isTextPost ? (
          <Box
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.text || ""),
            }}
          ></Box>
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
