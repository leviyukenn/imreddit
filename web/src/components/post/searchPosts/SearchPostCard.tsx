import {
  Box,
  Card,
  CardContent,
  CardProps,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Highlighter from "react-highlight-words";
import { SERVER_URL } from "../../../const/const";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import { createPostDetailModalLink } from "../../../utils/links";
import PostInfo from "../PostInfo";

interface SearchPostCardProps extends CardProps {
  post: RegularPostDetailFragment;
  keyword: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      backgroundColor: "rgb(248 249 250)",
    },
    card: {
      borderRadius: 0,
      backgroundColor: theme.palette.background.paper,

      boxShadow: "none",
      border: "1px solid #CCCCCC",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid #818181",
      },
    },
    caption: {
      color: "rgb(135 138 140)",
      marginRight: "0.5rem",
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
      //   display: "flex",
      // alignItems: "center",
      padding: "1rem",
      "&:last-child": {
        paddingBottom: "1rem",
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
      marginBottom: "1rem",
    },
    postTitle: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "20px",
    },
    toolBar: {
      display: "flex",
    },
    highlight: {
      backgroundColor: "#e9f5fd",
    },
  })
);

const SearchPostCard = ({ post, keyword, ...props }: SearchPostCardProps) => {
  const classes = useStyles();

  const router = useRouter();
  const postDetailModalLink = createPostDetailModalLink(router.asPath, post.id);

  return (
    <Box className={classes.root}>
      {/* <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box> */}
      <NextLink href={postDetailModalLink}>
        <Card className={classes.card} {...props}>
          <CardContent className={classes.cardContent}>
            <Box className={classes.postInfoContainer}>
              <PostInfo
                communityName={post.community.name}
                userName={post.creator.username}
                postCreatedAt={post.createdAt}
                communityIcon={post.community.icon}
              />
            </Box>
            <Box display="flex">
              <Box flex={1} marginBottom={2}>
                <Highlighter
                  className={classes.postTitle}
                  highlightClassName={classes.highlight}
                  searchWords={[keyword]}
                  autoEscape={true}
                  textToHighlight={post.title!}
                />
                {/* <PostToolBar post={post} /> */}
              </Box>
              {post.images[0]?.path ? (
                <Box
                  className={classes.imagePreview}
                  style={{
                    backgroundImage: `url(${SERVER_URL + post.images[0].path})`,
                  }}
                ></Box>
              ) : null}
            </Box>
            <Box>
              <Typography variant="caption" className={classes.caption}>
                {post.points + (post.points > 1 ? " upvotes" : " upvote")}
              </Typography>
              <Typography variant="caption" className={classes.caption}>
                {post.totalComments +
                  (post.totalComments > 1 ? " comments" : " comment")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </NextLink>
    </Box>
  );
};
export const LoadingSearchPostCard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.postInfoContainer}>
            <Skeleton width={200} />
          </Box>
          <Box display="flex">
            <Box flex={1} marginBottom={2}>
              <Skeleton width={400} />
              <Skeleton width={400} />
              <Skeleton width={400} />
            </Box>
            <Skeleton variant="rect" width={100} height={100} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default SearchPostCard;
