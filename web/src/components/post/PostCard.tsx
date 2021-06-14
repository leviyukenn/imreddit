import { Avatar, Box, Card, CardContent, CardHeader, CardProps, createStyles, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import numeral from "numeral";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useVote } from "../hooks/hooks";
import { VoteStatus } from "../types/types";

interface PostCardProps extends CardProps {
  post: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    card: {
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(2),
      backgroundColor: "#F7F9FA",
      border: "1px solid #CCCCCC",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #818181",
      },
    },
    upvoteBox: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: theme.spacing(5),
      height: theme.spacing(10),
      padding: "8px 4px",
    },
    notvoted: {
      color: "#878A8C",
    },
    upvoted: {
      color: "#FC3A05",
    },
    downvoted: {
      color: "#728EFE",
    },

    header: {
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      maxHeight: "300px",
      overflow: "hidden",
      "&::after": {
        content: '""',
        // display: "block",
        background: " linear-gradient(rgba(255, 255, 255, 0.001),white)",
        position: "absolute",
        bottom: "1px",
        height: "60px",
        width: "calc(100% - 58px)",
      },
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export const PostCard = ({ post, ...props }: PostCardProps) => {
  const classes = useStyles();

  const { voteStatus, loading, onUpvote, onDownvote } = useVote(post);

  const points = useMemo(
    () => numeral(post.points).format(post.points >= 1100 ? "0.0a" : "0a"),
    [post]
  );

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);

  return (
    <Box className={classes.root}>
      <Box className={classes.upvoteBox}>
        <IconButton
          aria-label="upvote"
          size="small"
          onClick={onUpvote}
          disabled={loading}
        >
          <ArrowUpwardRoundedIcon
            className={
              voteStatus === VoteStatus.UPVOTED
                ? classes.upvoted
                : classes.notvoted
            }
          />
        </IconButton>
        <Typography variant="caption" className={classes[voteStatus]}>
          {points}
        </Typography>
        <IconButton
          aria-label="downvote"
          size="small"
          onClick={onDownvote}
          disabled={loading}
        >
          <ArrowDownwardRoundedIcon
            className={
              voteStatus === VoteStatus.DOWNVOTED
                ? classes.downvoted
                : classes.notvoted
            }
          />
        </IconButton>
      </Box>
      <NextLink
        href={`/?postId=${post.id}`}
        as={`/post-detail/${post.id}`}
        shallow
      >
        <Card className={classes.card} {...props}>
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
            subheader={`Posted by ${post.creator.username} ${timeago}`}
            className={classes.header}
          />
          <CardContent className={classes.content}>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: post.text }}></div>
          </CardContent>
        </Card>
      </NextLink>
    </Box>
  );
};

export const LoadingPostCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
        className={classes.header}
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
