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
import { useVote } from "../../../graphql/hooks/useUpvote";
import { VoteStatus } from "../../types/types";

interface VerticalUpvoteBoxProps {
  post: RegularPostDetailFragment;
  isVerticalLayout: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    verticalLayout: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: theme.spacing(5),
      height: theme.spacing(10),
      padding: "8px 4px",
    },
    horizontalLayout: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "80px",
      padding: "8px 0",
    },
    notUpvoted: {
      color: "#878A8C",
      "&:hover": {
        color: "#FC3A05",
      },
    },
    notDownvoted: {
      color: "#878A8C",
      "&:hover": {
        color: "#728EFE",
      },
    },
    pointsNotVoted: {
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

const UpvoteBox = ({ post, isVerticalLayout }: VerticalUpvoteBoxProps) => {
  const classes = useStyles();
  const points = useMemo(
    () => numeral(post.points).format(post.points >= 1100 ? "0.0a" : "0a"),
    [post]
  );

  const { voteStatus, loading, onUpvote, onDownvote } = useVote(post);

  return (
    <Box
      className={
        isVerticalLayout ? classes.verticalLayout : classes.horizontalLayout
      }
    >
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
              : classes.notUpvoted
          }
        />
      </IconButton>
      <Typography
        variant="caption"
        className={
          voteStatus === VoteStatus.UPVOTED
            ? classes.upvoted
            : voteStatus === VoteStatus.DOWNVOTED
            ? classes.downvoted
            : classes.pointsNotVoted
        }
      >
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
              : classes.notDownvoted
          }
        />
      </IconButton>
    </Box>
  );
};
export default UpvoteBox;
