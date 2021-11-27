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
import { usePostDetailQuery } from "../../generated/graphql";
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
      padding: 0,
      backgroundColor: theme.palette.background.default,
    },
  })
);

const PostDetailModal = ({}: PostDetailModalProps) => {
  const router = useRouter();
  const classes = useStyles();

  const handleClose = useCallback(() => {
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
      <DialogContent dividers className={classes.content}>
        <PostDetail post={post || null}></PostDetail>
      </DialogContent>
    </Dialog>
  );
};
export default PostDetailModal;
