import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import numeral from "numeral";
import React, { useMemo } from "react";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import { useVote } from "../../hooks/hooks";
import { VoteStatus } from "../../types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upvoteBox: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
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
  })
);

export const HorizontalUpvoteBox = ({
  post,
}: {
  post: RegularPostDetailFragment;
}) => {
  const { voteStatus, loading, onUpvote, onDownvote } = useVote(post);
  const points = useMemo(
    () => numeral(post.points).format(post.points >= 1100 ? "0.0a" : "0a"),
    [post]
  );

  const classes = useStyles();
  return (
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
  );
};
