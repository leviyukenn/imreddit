import {
  Box,
  Card,
  CardContent,
  CardProps,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { SERVER_URL } from "../../../const/const";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import {
  createCommunityHomeLink,
  createPostDetailModalLink,
  createPostDetailPageLink,
} from "../../../utils/links";
import UpvoteBox from "../upvote/UpvoteBox";

interface UserPostCardProps extends CardProps {
  post: RegularPostDetailFragment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    card: {
      paddingLeft: theme.spacing(5),
      // marginBottom: theme.spacing(2),
      borderRadius: 0,

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
    },
    header: {
      backgroundColor: theme.palette.background.paper,
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
    avatar: {
      backgroundColor: red[500],
    },
    cardContent: {
      display: "flex",
      padding: "8px 8px 0",
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    imagePreview: {
      height: 72,
      width: 96,
      border: "none",
      borderRadius: 4,
      backgroundPosition: "50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
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
    commentButton: {
      display: "flex",
      alignItems: "center",
      lineHeight: 16,
      padding: 8,
      fontSize: "0.75rem",
      fontWeight: 700,
      cursor: "pointer",
      color: "#9b9b9b",
      borderRadius: 4,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

const UserPostCard = ({ post, ...props }: UserPostCardProps) => {
  const classes = useStyles();

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);
  const postInfo = useMemo(
    () => (
      <Box display="flex" alignItems="center">
        <NextLink href={createCommunityHomeLink(post.community.name)} passHref>
          <Link
            className={classes.communityLink}
            // onMouseDown={(
            //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            // ) => {
            //   e.stopPropagation();
            // }}
          >{`r/${post.community.name}`}</Link>
        </NextLink>
        <span>&nbsp;&#183;&nbsp;</span>
        <Typography variant="caption">{`Posted by ${post.creator.username} ${timeago}`}</Typography>
      </Box>
    ),
    []
  );

  const isTextPost = useMemo(() => post.images.length === 0, [post]);
  const router = useRouter();
  const postDetailModalLink = createPostDetailModalLink(
    createPostDetailPageLink(post.community.name, post.id),
    post.id
  );
  const postDetailLink = createPostDetailPageLink(post.community.name, post.id);

  return (
    <Box className={classes.root}>
      <Box className={classes.upvoteBox}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <UpvoteBox post={post} isVerticalLayout={true} />
        </Box>
      </Box>
      <NextLink
        href={postDetailModalLink}
        as={postDetailLink}
        shallow
        scroll={false}
      >
        <Card className={classes.card} {...props}>
          {/* <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            subheader={subHeader}
            className={classes.header}
          /> */}
          <CardContent className={classes.cardContent}>
            {post.images[0]?.path ? (
              <Box
                className={classes.imagePreview}
                style={{
                  backgroundImage: `url(${SERVER_URL + post.images[0].path})`,
                }}
              ></Box>
            ) : (
              <Box className={classes.textPostIcon}>
                <ViewHeadlineIcon />
              </Box>
            )}
            <Box className={classes.postInfoContainer}>
              <Typography variant="subtitle1" className={classes.postTitle}>
                {post.title}
              </Typography>
              {postInfo}
              <Box className={classes.toolBar}>
                <NextLink href={postDetailModalLink} passHref>
                  <Link className={classes.commentButton}>
                    <ChatBubbleOutlineIcon />
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </NextLink>
    </Box>
  );
};
export default UserPostCard;
