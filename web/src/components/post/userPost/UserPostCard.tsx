import {
  Box,
  Card,
  CardContent,
  CardProps,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { SERVER_URL } from "../../../const/const";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import { PostStatus } from "../../../graphql/hooks/useChangePostStatus";
import {
  createCommunityHomeLink,
  createPostDetailModalLink,
} from "../../../utils/links";
import { createComposedClasses } from "../../../utils/utils";
import PostToolBar from "../postToolBar/PostToolBar";
import UpvoteBox from "../upvote/UpvoteBox";

interface UserPostCardProps extends CardProps {
  post: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      backgroundColor: "rgb(248 249 250)",
    },
    card: {
      paddingLeft: theme.spacing(5),
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,

      boxShadow: "none",
      border: "1px solid #CCCCCC",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #818181",
      },
    },
    upvoteBox: {
      position: "absolute",
      top: 1,
      left: 1,
      borderLeft: "4px solid transparent",
    },
    removedPost: {
      borderLeft: "4px solid #ff585b",
    },
    header: {
      backgroundColor: theme.palette.background.paper,
    },
    caption: {
      color: "rgb(120 124 126)",
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
    avatar: {
      backgroundColor: red[500],
    },
    cardContent: {
      display: "flex",
      // alignItems: "center",
      padding: "8px 8px 0",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    imagePreview: {
      height: 72,
      width: 96,
      border: "none",
      borderRadius: 4,
      backgroundPosition: "50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    textPostIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#edeff1",
      color: "#878A8C",
      height: 72,
      width: 96,
      border: "none",
      borderRadius: 4,
    },
    postInfoContainer: {
      marginLeft: 8,
    },
    postTitle: {
      color: "#9b9b9b",
    },
    toolBar: {
      display: "flex",
    },
  })
);

const UserPostCard = ({ post, ...props }: UserPostCardProps) => {
  const classes = useStyles();

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);
  const postInfo = useMemo(
    () => (
      <Box display="flex" alignItems="center">
        <NextLink href={createCommunityHomeLink(post.community.name)} passHref>
          <Link
            className={classes.communityLink}
            // onMouseDown={(
            //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            // ) => {
            //   e.stopPropagation();
            // }}
          >{`r/${post.community.name}`}</Link>
        </NextLink>
        <span>&nbsp;&#183;&nbsp;</span>
        <Typography
          variant="caption"
          className={classes.caption}
        >{`Posted by u/${post.creator.username} ${timeago}`}</Typography>
      </Box>
    ),
    [post, timeago]
  );

  const router = useRouter();
  const postDetailModalLink = createPostDetailModalLink(router.asPath, post.id);
  const isRemoved = post.postStatus === PostStatus.REMOVED;

  return (
    <Box className={classes.root}>
      <Box
        className={createComposedClasses(
          classes.upvoteBox,
          isRemoved ? classes.removedPost : ""
        )}
      >
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>
      <NextLink href={postDetailModalLink} shallow scroll={false}>
        <Card className={classes.card} {...props}>
          <CardContent className={classes.cardContent}>
            {post.images[0]?.path ? (
              <Box
                className={classes.imagePreview}
                style={{
                  backgroundImage: `url(${SERVER_URL + post.images[0].path})`,
                }}
              ></Box>
            ) : (
              <Box className={classes.textPostIcon}>
                <ViewHeadlineIcon />
              </Box>
            )}
            <Box className={classes.postInfoContainer}>
              <Typography variant="subtitle1" className={classes.postTitle}>
                {post.title}
              </Typography>
              {postInfo}
              <PostToolBar post={post} />
            </Box>
          </CardContent>
        </Card>
      </NextLink>
    </Box>
  );
};

export const LoadingUserPostCard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.upvoteBox}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Skeleton variant="rect" />
        </Box>
      </Box>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.textPostIcon}>
            <Skeleton />
          </Box>
          <Box className={classes.postInfoContainer}>
            <Typography variant="subtitle1" className={classes.postTitle}>
              <Skeleton width={40} />
            </Typography>
            <Skeleton width={60} />
            <Box className={classes.toolBar}>
              <Box>
                <Typography variant="caption">
                  <Skeleton width={70} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UserPostCard;
