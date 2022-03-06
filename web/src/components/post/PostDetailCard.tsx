import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import DOMPurify from "dompurify";
import React, { useMemo } from "react";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { PostStatus } from "../../graphql/hooks/useChangePostStatus";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import ImagePostSwiper from "./postCard/ImgaePostSwiper";
import PostInfo from "./PostInfo";
import ToolBar from "./postToolBar/PostToolBar";
import UpvoteBox from "./upvote/UpvoteBox";
import PostRemovedWarning from "./warning/PostRemovedWarning";

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

enum PostType {
  TEXT_POST,
  IMAGE_POST,
  COMMENT,
}

export const PostDetailCard = ({ post, ...props }: PostDetailProps) => {
  const classes = useStyles();

  const { me } = useIsAuth();
  const isRemovedPost = post?.postStatus === PostStatus.REMOVED;

  const postContent = useMemo(() => {
    const isCreator = me?.id && me.id === post?.creator.id;
    if (isRemovedPost && !isCreator) return null;
    const isTextPost = post.postType === PostType.TEXT_POST;
    return isTextPost ? (
      <Box
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.text || ""),
        }}
      ></Box>
    ) : (
      <ImagePostSwiper images={post.images} />
    );
  }, [post, isRemovedPost, me]);

  return (
    <Card className={classes.root} {...props}>
      <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>

      <CardHeader
        // avatar={<CommunityIcon icon={post.community.icon} size="extraSmall" />}
        classes={{ avatar: classes.communityIcon }}
        subheader={
          <PostInfo
            communityName={post.community.name}
            userName={post.creator.username}
            postCreatedAt={post.createdAt}
            communityIcon={post.community.icon}
          />
        }
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        {isRemovedPost ? (
          <PostRemovedWarning communityName={post.community.name} />
        ) : null}
        {postContent}
      </CardContent>
      <ToolBar post={post} />
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
