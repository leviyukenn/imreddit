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
import { blue } from "@material-ui/core/colors";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { Skeleton } from "@material-ui/lab";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
      flex: 1,
    },

    header: {
      display: "flex",
      alignItems: "center",
      margin: "12px 0",
    },
    content: {
      paddingTop: 0,
    },
    smallAvatar: {
      width: "28px",
      height: "28px",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export const CommentCard = ({ postId, ...props }: PostDetailProps) => {
  const [showThread, setShowThread] = useState(true);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);

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

  const backgroundColor = useMemo(
    () =>
      router.query.commentId === postId
        ? { backgroundColor: "rgb(0 121 211 / 5%)" }
        : undefined,
    [postId, router]
  );

  useEffect(() => {
    if (!(post?.id && router.query.commentId && commentRef.current)) return;

    if (post.id === router.query.commentId) {
      commentRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [post?.id, router.query.commentId, commentRef.current]);

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
          <img className={classes.smallAvatar} src={post.creator.avatar} />
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
      <div className={classes.commentBox}>
        <div className={classes.header} ref={commentRef}>
          <Typography variant="caption">
            {`${post.creator.username} `}
          </Typography>
          &nbsp;&#183;&nbsp;
          <Typography
            variant="caption"
            style={{ color: "#7C7C7C" }}
          >{`${timeago}`}</Typography>
        </div>

        {showThread ? (
          <Box className={classes.content}>
            <Box style={backgroundColor}>
              <Box
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.text || ""),
                }}
              ></Box>
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
      </div>
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
