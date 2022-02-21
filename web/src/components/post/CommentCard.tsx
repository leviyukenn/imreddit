import {
  Avatar,
  Box,
  CardProps,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { Skeleton } from "@material-ui/lab";
import DOMPurify from "dompurify";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PostStatus } from "../../graphql/hooks/useChangePostStatus";
import { usePostDetail } from "../../graphql/hooks/usePostDetail";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { createUserProfileLink } from "../../utils/links";
import { createComposedClasses } from "../../utils/utils";
import CommentEditor from "./post-editor/CommentEditor";
import CommentToolBar from "./postToolBar/CommentToolBar";
import ToolBarButton from "./postToolBar/ToolBarButton";
import UpvoteBox from "./upvote/UpvoteBox";
import PostRemovedWarning from "./warning/PostRemovedWarning";

interface PostDetailProps extends CardProps {
  postId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // position: "relative",
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      minHeight: "72px",
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
      lineHeight: "1rem",
    },
    content: {
      paddingTop: 0,
    },
    comment: {
      padding: 4,
      border: "2px solid transparent",
    },
    removedComment: {
      border: "2px solid #ff585b",
      backgroundColor: "rgba(255,88,91,.05)",
    },
    smallAvatar: {
      width: "28px",
      height: "28px",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    usernameLink: {
      color: "#1a1a1b",
      fontWeight: 500,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
        textDecoratiionColor: "#1a1a1b",
      },
    },
    replyButton: {
      textTransform: "none",
      color: "#878a8c",
    },
  })
);

export const CommentCard = ({ postId, ...props }: PostDetailProps) => {
  const [showThread, setShowThread] = useState(true);
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);

  const { post, loading, timeago } = usePostDetail(postId);
  const { me } = useIsAuth();

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

  //if the query parameters contain a comment id, scroll to the comment
  useEffect(() => {
    if (!(post?.id && router.query.commentId && commentRef.current)) return;

    if (post.id === router.query.commentId) {
      commentRef.current.offsetParent?.scrollTo({
        top: commentRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [post, router, commentRef]);

  const isRemovedComment = post?.postStatus === PostStatus.REMOVED;
  const commentContent = useMemo(() => {
    if (!post) return null;
    const isCreator = me?.id && me.id === post?.creator.id;
    if (isRemovedComment && !isCreator) return null;
    return (
      <Box
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.text || ""),
        }}
      ></Box>
    );
  }, [post, me, isRemovedComment]);

  if (loading) return <LoadingCommentCard />;

  if (!post) return null;

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
          <NextLink
            href={createUserProfileLink(post.creator.username, "posts")}
            passHref
          >
            <Link>
              <img className={classes.smallAvatar} src={post.creator.avatar} />
            </Link>
          </NextLink>
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
          <NextLink
            href={createUserProfileLink(post.creator.username, "posts")}
            passHref
          >
            <Link>
              <Typography variant="caption" className={classes.usernameLink}>
                {`${post.creator.username} `}
              </Typography>
            </Link>
          </NextLink>
          &nbsp;&#183;&nbsp;
          <Typography
            variant="caption"
            style={{ color: "#7C7C7C" }}
          >{`${timeago}`}</Typography>
        </div>
        {showThread ? (
          <Box className={classes.content}>
            <Box
              style={backgroundColor}
              className={createComposedClasses(
                classes.comment,
                isRemovedComment ? classes.removedComment : ""
              )}
            >
              {isRemovedComment ? (
                <PostRemovedWarning communityName={post.community.name} />
              ) : null}
              {commentContent}
              <Box display="flex">
                <UpvoteBox post={post} isVerticalLayout={false} />
                <ToolBarButton
                  startIcon={<ChatBubbleOutlineIcon />}
                  onClick={toggleShowCommentEditor}
                >
                  Reply
                </ToolBarButton>
                <CommentToolBar post={post} />
              </Box>
              {showCommentEditor ? (
                <CommentEditor
                  replyTo={post}
                  setShowCommentEditor={setShowCommentEditor}
                />
              ) : null}
            </Box>
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
