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
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import { PostStatus } from "../../../graphql/hooks/useChangePostStatus";
import {
  createPostDetailModalLink,
  createUserProfileLink,
} from "../../../utils/links";
import { createComposedClasses } from "../../../utils/utils";
import PostInfo from "../PostInfo";
import UserComments from "./UserComments";

interface UserCommentedPostCardProps extends CardProps {
  userName: string;
  post: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 8,
    },
    card: {
      borderRadius: 0,
      backgroundColor: "#F7F9FA",
      boxShadow: "none",
      border: "1px solid #CCCCCC",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #818181",
      },
    },
    removedPost: {
      borderLeft: "4px solid #ff585b",
      "&:hover": {
        borderLeft: "4px solid #ff585b",
        border: "1px solid #818181",
      },
    },
    userLink: {
      lineHeight: "20px",
      fontSize: "12px",
      fontWeight: 700,
      "&:hover": {
        textDecoration: "underLine",
        // textDecorationColor: theme.palette.text.primary,
      },
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
    cardContent: {
      display: "flex",
      alignItems: "center",

      padding: 8,
      "&:last-child": {
        paddingBottom: 8,
      },
    },
    title: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
    commentIcon: {
      marginRight: 8,
      color: "#9b9b9b",
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

const UserCommentedPostCard = ({
  userName,
  post,
  ...props
}: UserCommentedPostCardProps) => {
  const classes = useStyles();
  const title = useMemo(
    () => (
      <Box display="flex" alignItems="center" className={classes.title}>
        <NextLink href={createUserProfileLink(userName, "posts")} passHref>
          <Link className={classes.userLink}>{userName}</Link>
        </NextLink>
        <span style={{ color: "rgb(120, 124, 126)" }}>
          &nbsp;commented on&nbsp;
        </span>
        <span>{post.title}</span>
      </Box>
    ),

    [post.title, userName]
  );
  const router = useRouter();

  const postDetailModalLink = createPostDetailModalLink(router.asPath, post.id);
  const isRemoved = post.postStatus === PostStatus.REMOVED;

  return (
    <Box className={classes.root}>
      <NextLink
        href={postDetailModalLink}
        // as={postDetailLink}
        shallow
        scroll={false}
        passHref
      >
        <Card
          className={createComposedClasses(
            classes.card,
            isRemoved ? classes.removedPost : ""
          )}
          {...props}
        >
          <CardContent className={classes.cardContent}>
            <ChatBubbleOutlineIcon className={classes.commentIcon} />
            <Box className={classes.postInfoContainer}>
              {title}
              <PostInfo
                communityName={post.community.name}
                userName={post.creator.username}
                postCreatedAt={post.createdAt}
              />
            </Box>
          </CardContent>
        </Card>
      </NextLink>
      <UserComments
        ancestorId={post.id}
        userName={userName}
        communityName={post.community.name}
      />
    </Box>
  );
};
export default UserCommentedPostCard;
