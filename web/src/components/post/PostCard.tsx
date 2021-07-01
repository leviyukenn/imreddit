import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Skeleton } from "@material-ui/lab";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { format } from "timeago.js";
import { RegularPostDetailFragment } from "../../generated/graphql";
import ImagePostSwiper from "./ImgaePostSwiper";
import UpvoteBox from "./upvote/UpvoteBox";

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
    textPostContent: {
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      maxHeight: "300px",
      overflow: "hidden",
      "&::after": {
        content: '""',
        background: " linear-gradient(rgba(255, 255, 255, 0.001),white)",
        position: "absolute",
        bottom: "1px",
        height: "60px",
        width: "calc(100% - 58px)",
      },
    },
    imagePostContent: {
      paddingTop: 0,
      backgroundColor: theme.palette.background.paper,
      maxHeight: "600px",
      overflow: "hidden",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export const PostCard = ({ post, ...props }: PostCardProps) => {
  const classes = useStyles();

  const timeago = useMemo(() => format(parseInt(post.createdAt)), [post]);

  const isTextPost = useMemo(() => post.images.length === 0, [post]);
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box className={classes.upvoteBox}>
        <UpvoteBox post={post} isVerticalLayout={true} />
      </Box>
      <NextLink
        href={`${router.pathname}?postId=${post.id}`}
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
            subheader={
              <Box display="flex" alignItems="center">
                <NextLink href="/">
                  <Link
                    className={classes.communityLink}
                    onMouseDown={(
                      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      e.stopPropagation();
                    }}
                  >{`r/${post.community.name}`}</Link>
                </NextLink>
                <span>&nbsp;&#183;&nbsp;</span>
                <Typography variant="caption">{`Posted by ${post.creator.username} ${timeago}`}</Typography>
              </Box>
            }
            className={classes.header}
          />
          <CardContent
            className={
              isTextPost ? classes.textPostContent : classes.imagePostContent
            }
          >
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            {isTextPost ? (
              <Box dangerouslySetInnerHTML={{ __html: post.text || "" }}></Box>
            ) : null}
            {!isTextPost ? <ImagePostSwiper images={post.images} /> : null}
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
      {/* <Box className={classes.upvoteBox}>
        <IconButton aria-label="upvote" size="small">
          <Skeleton />
        </IconButton>
        <Skeleton />
        <IconButton aria-label="downvote" size="small">
          <Skeleton />
        </IconButton>
      </Box> */}
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
      <CardContent className={classes.textPostContent}>
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
