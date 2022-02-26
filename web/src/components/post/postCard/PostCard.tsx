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
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../../generated/graphql";
import {
  createPostDetailModalLink,
  createPostDetailPageLink,
} from "../../../utils/links";
import CommunityIcon from "../../community/CommunityIcon";
import ToolBar from "../postToolBar/PostToolBar";
import UpvoteBox from "../upvote/UpvoteBox";
import ImagePostContent from "./ImagePostContent";
import TextPostContent from "./TextPostContent";
import PostInfo from "../PostInfo";

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
    },
    header: {
      backgroundColor: theme.palette.background.paper,
    },
    communityIcon: {
      display: "flex",
      alignItems: "center",
      marginRight: 8,
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
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    avatar: {
      backgroundColor: red[500],
    },
    toolbar: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const PostCard = ({ post, ...props }: PostCardProps) => {
  const classes = useStyles();

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);

  const isTextPost = useMemo(() => post.postType === 0, [post]);
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>
      <NextLink
        href={createPostDetailModalLink(router.asPath, post.id)}
        as={createPostDetailPageLink(post.community.name, post.id)}
        shallow={true}
        scroll={false}
      >
        <Card className={classes.card} {...props}>
          <CardHeader
            avatar={
              <CommunityIcon icon={post.community.icon} size="extraSmall" />
            }
            subheader={
              <PostInfo
                communityName={post.community.name}
                userName={post.creator.username}
                postCreatedAt={post.createdAt}
              />
            }
            classes={{ root: classes.header, avatar: classes.communityIcon }}
          />
          <CardContent className={classes.cardContent}>
            {isTextPost ? (
              <TextPostContent
                title={post.title || ""}
                text={post.text || ""}
              />
            ) : (
              <ImagePostContent images={post.images} title={post.title || ""} />
            )}
          </CardContent>
          <ToolBar post={post} />
        </Card>
      </NextLink>
    </Box>
  );
};

export const LoadingPostCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
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
      <CardContent className={classes.cardContent}>
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
