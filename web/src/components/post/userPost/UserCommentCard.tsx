import {
  Box,
  Card,
  CardContent,
  CardProps,
  createStyles,
  Link,
  makeStyles,
  Theme,
} from "@material-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import {
  createPostDetailModalLinkWithCommentId,
  createUserProfileLink,
} from "../../../utils/links";

interface UserCommentCardProps extends CardProps {
  comment: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: 0,
      boxShadow: "none",
      backgroundColor: "#F7F9FA",
      border: "1px solid #CCCCCC",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #818181",
      },
    },
    cardContent: {
      display: "flex",
      //   alignItems: "center",

      padding: 8,
      "&:last-child": {
        paddingBottom: 8,
      },
    },
    commentThreadLine: {
      //   height: "10px",
      borderLeft: "2px dashed #c1c1c1",
      flex: "0 0 1px",
      marginRight: "1rem",
    },
    userLink: {
      lineHeight: "16px",
      fontSize: "12px",
      fontWeight: 700,
      color: "#000",
      "&:hover": {
        textDecoration: "underLine",
        // textDecorationColor: theme.palette.text.primary,
      },
    },
    title: {
      display: "flex",
      alignItems: "center",
      fontSize: "0.75rem",
      lineHeight: "1rem",
      "&>span": {
        color: "rgb(120, 124, 126)",
        paddingLeft: "0.25rem",
      },
    },
  })
);

const UserCommentCard = ({ comment, ...props }: UserCommentCardProps) => {
  const classes = useStyles();
  const timeago = useMemo(() => format(parseInt(comment.createdAt)), [comment]);
  const router = useRouter();

  const postDetailModalLinkWithCommentId = createPostDetailModalLinkWithCommentId(
    router.asPath,
    comment.ancestor?.id!,
    comment.id
  );
  return (
    <NextLink
      href={postDetailModalLinkWithCommentId}
      // as={postDetailLink}
      shallow
      scroll={false}
      passHref
    >
      <Card className={classes.card} {...props}>
        <CardContent className={classes.cardContent}>
          {[...new Array(comment.layer)].map((item, index) => (
            <div
              key={comment.id + index}
              className={classes.commentThreadLine}
            ></div>
          ))}
          <Box>
            <Box display="flex" alignItems="center" className={classes.title}>
              <NextLink
                href={createUserProfileLink(comment.creator.username)}
                passHref
              >
                <Link className={classes.userLink}>
                  {comment.creator.username}
                </Link>
              </NextLink>
              <span>{`${comment.points} points`}</span>
              <span> · </span>
              <span>{timeago}</span>
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: comment.text || "" }}></Box>
          </Box>
        </CardContent>
      </Card>
    </NextLink>
  );
};
export default UserCommentCard;
