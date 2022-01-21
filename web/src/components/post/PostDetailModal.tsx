import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { SERVER_URL } from "../../const/const";
import { usePostDetailQuery } from "../../generated/graphql";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import { createCommunityHomeLink } from "../../utils/links";
import PostDetail from "./PostDetail";

interface PostDetailModalProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "32px",
    },
    title: {
      height: theme.spacing(6),
      backgroundColor: "#030303",
    },
    closeButtonContainer: {
      width: "312px",
      marginLeft: "12px",
    },
    titleHeart: {
      height: "100%",
      maxWidth: "1128px",
      color: "white",
      width: "100%",
      padding: "0 32px",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      padding: 0,
      backgroundColor: theme.palette.background.default,
    },
    heart: {
      maxWidth: "740px",
      width: "calc(100% - 32px)",
      margin: "32px",
    },
  })
);

const PostDetailModal = ({}: PostDetailModalProps) => {
  const router = useRouter();
  const classes = useStyles();

  const handleClose = useCallback(() => {
    if (router.query.postInfo) {
      router.push(
        createCommunityHomeLink(router.query.postInfo[0]),
        undefined,
        { shallow: true }
      );
      return;
    }
    router.back();
  }, [router]);

  const postId = useMemo(() => (router.query.modalPostId || "") as string, [
    router,
  ]);

  const { data: postDetailResponse } = usePostDetailQuery({
    skip: typeof window === "undefined" || !postId,
    variables: { postId },
  });

  const post = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const { background, backgroundColor } = useCommunityAppearance();
  const backgroundStyle = useMemo(() => {
    if (background)
      return {
        background: `url(${
          SERVER_URL + background
        }) center center / cover no-repeat fixed ${backgroundColor}`,
      };

    if (backgroundColor)
      return {
        background: backgroundColor,
      };
  }, [background, backgroundColor]);

  return (
    <Dialog
      open={!!router.query.modalPostId}
      onClose={handleClose}
      scroll={"paper"}
      maxWidth={"lg"}
      fullWidth
      classes={{ paper: classes.root }}
    >
      <Box className={classes.title} display="flex" justifyContent="center">
        <Box className={classes.titleHeart} display="flex" alignItems="center">
          <Box display="flex" justifyContent="flex-start" flexGrow="1">
            Subscribe
          </Box>
          <Box
            className={classes.closeButtonContainer}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              color="primary"
              startIcon={<CloseIcon />}
              onClick={handleClose}
            >
              close
            </Button>
          </Box>
        </Box>
      </Box>
      <DialogContent
        dividers
        className={classes.content}
        style={backgroundStyle}
      >
        <Box className={classes.heart}>
          <PostDetail post={post}></PostDetail>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default PostDetailModal;
