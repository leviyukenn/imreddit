import {
  Avatar,
  Box,
  Button,
  CardProps,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { Skeleton } from "@material-ui/lab";
import React, { useCallback, useMemo, useState } from "react";
import { format } from "timeago.js";
import { usePostDetailQuery } from "../../generated/graphql";
import CommentEditor from "./post-editor/CommentEditor";
import UpvoteBox from "./upvote/UpvoteBox";

interface PostDetailProps extends CardProps {
  postId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      minHeight: "72px",
      // marginBottom: theme.spacing(2),
    },
    threadLineBox: {
      cursor: "pointer",
      "&:hover": {
        "& $threadLine": {
          borderRightColor: blue[500],
        },
      },
    },
    threadLine: {
      height: "100%",
      width: "50%",
      borderRight: "2px solid #edeff1",
      // padding: "8px 0",
    },
    expandThreadIcon: {
      margin: "0 8px",
      cursor: "pointer",
    },
    commentBox: {
      marginLeft: "6px",
    },

    header: {
      margin: "12px 0",
    },
    content: {
      paddingTop: 0,
    },
    smallAvatar: {
      width: "28px",
      height: "28px",
      backgroundColor: red[500],
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export const CommentCard = ({ postId, ...props }: PostDetailProps) => {
  const [showThread, setShowThread] = useState(true);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const classes = useStyles();

  const {
    data: postDetailResponse,
    loading: postDetailLoading,
    error,
  } = usePostDetailQuery({
    skip: !postId,
    variables: { postId },
  });
  const post = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const timeago = useMemo(
    () => post?.createdAt && format(parseInt(post.createdAt)),
    [post]
  );

  const toggleShowThread = useCallback(() => {
    setShowThread((prevState) => !prevState);
  }, [setShowThread]);

  const toggleShowCommentEditor = useCallback(() => {
    setShowCommentEditor((prevState) => !prevState);
  }, [setShowThread]);

  if (!post) return <LoadingCommentCard />;

  return (
    <Box display="flex" className={classes.root} {...props}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          {!showThread ? (
            <ControlPointIcon
              fontSize="inherit"
              color="primary"
              className={classes.expandThreadIcon}
              onClick={toggleShowThread}
            />
          ) : null}
          <Avatar className={classes.smallAvatar}>R</Avatar>
        </Box>
        {showThread ? (
          <Box
            flexGrow={1}
            className={classes.threadLineBox}
            onClick={toggleShowThread}
          >
            <Box className={classes.threadLine}></Box>
          </Box>
        ) : null}
      </Box>
      <Box className={classes.commentBox}>
        <Box display="flex" alignItems="center" className={classes.header}>
          <Typography variant="caption">
            {`${post.creator.username} `}
          </Typography>
          &nbsp;&#183;&nbsp;
          <Typography
            variant="caption"
            style={{ color: "#7C7C7C" }}
          >{`${timeago}`}</Typography>
        </Box>

        {showThread ? (
          <Box className={classes.content}>
            <Box dangerouslySetInnerHTML={{ __html: post.text || "" }}></Box>
            <Box display="flex">
              <UpvoteBox post={post} isVerticalLayout={false} />
              <Button
                size="small"
                startIcon={<ChatBubbleOutlineIcon />}
                onClick={toggleShowCommentEditor}
              >
                Reply
              </Button>
            </Box>
            {showCommentEditor ? (
              <CommentEditor
                replyTo={post}
                setShowCommentEditor={setShowCommentEditor}
              />
            ) : null}
            {post.children.map((child) => (
              <CommentCard key={child.id} postId={child.id} />
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export const LoadingCommentCard = () => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.root}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center">
          <Avatar className={classes.smallAvatar}>
            <Skeleton />
          </Avatar>
        </Box>
      </Box>
      <Box className={classes.commentBox}>
        <Box display="flex" alignItems="center" className={classes.header}>
          <Typography variant="caption">
            <Skeleton />
          </Typography>
        </Box>

        <Box className={classes.content}>
          <Skeleton />
        </Box>
      </Box>
    </Box>
  );
};
