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
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Skeleton } from "@material-ui/lab";
import numeral from "numeral";
import React, { useCallback, useState } from "react";
import { format } from "timeago.js";
import { RegularPostFragment, useVoteMutation } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

interface PostCardProps extends CardProps {
  post: RegularPostFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(2),
      backgroundColor: "#F7F9FA",
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
    nonVoted: {
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
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export const PostCard = ({ post, ...props }: PostCardProps) => {
  const classes = useStyles();
  const [vote, { loading: voteLoading }] = useVoteMutation({
    update(cache, { data: voteResponse }) {
      cache.modify({
        id: cache.identify(post),
        fields: {
          points(existing: number) {
            if (!voteResponse) return existing;
            return existing + voteResponse.vote;
          },
        },
      });
    },
  });

  const [isUpvoted, setUpvoted] = useState(false);
  const [isDownvoted, setDownvoted] = useState(false);

  const { checkIsAuth, meLoading } = useIsAuth();

  const points = numeral(post.points).format(
    post.points >= 1100 ? "0.0a" : "0a"
  );

  const onUpvote = useCallback(
    (value) => {
      return async () => {
        if (!checkIsAuth()) return;
        const voteResponse = await vote({
          variables: { postId: post.id, value },
        });
        if (!voteResponse.data) return;
        const points = voteResponse.data.vote;

        if (value > 0 && points > 0) {
          setUpvoted(true);
          setDownvoted(false);
          return;
        }

        if (value < 0 && points < 0) {
          setUpvoted(false);
          setDownvoted(true);
          return;
        }

        if (Math.sign(value) !== Math.sign(points)) {
          setUpvoted(false);
          setDownvoted(false);
        }
      };
    },
    [vote, checkIsAuth]
  );

  const timeago = format(parseInt(post.createdAt));

  return (
    <Card className={classes.root} {...props}>
      <Box className={classes.upvoteBox}>
        <IconButton
          aria-label="upvote"
          size="small"
          onClick={onUpvote(1)}
          disabled={voteLoading || meLoading}
        >
          <ArrowUpwardRoundedIcon
            className={isUpvoted ? classes.upvoted : classes.nonVoted}
          />
        </IconButton>
        <Typography
          variant="caption"
          className={
            isUpvoted
              ? classes.upvoted
              : isDownvoted
              ? classes.downvoted
              : classes.nonVoted
          }
        >
          {points}
        </Typography>
        <IconButton
          aria-label="downvote"
          size="small"
          onClick={onUpvote(-1)}
          disabled={voteLoading || meLoading}
        >
          <ArrowDownwardRoundedIcon
            className={isDownvoted ? classes.downvoted : classes.nonVoted}
          />
        </IconButton>
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
        subheader={`Posted by ${post.creator.username} ${timeago}`}
        className={classes.header}
      />
      <CardContent className={classes.content}>
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

export const LoadingPostCard = () => {
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
