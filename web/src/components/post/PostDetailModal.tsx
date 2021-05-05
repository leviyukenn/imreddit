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
import React from "react";
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
    },
  })
);

const PostDetailModal = ({}: PostDetailModalProps) => {
  const handleClose = () => {
    router.push("/", undefined, { shallow: true });
  };
  const router = useRouter();
  const classes = useStyles();

  return (
    <Dialog
      open={!!router.query.postId}
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
        <PostDetail postId={router.query.postId as string}></PostDetail>
      </DialogContent>
    </Dialog>
  );
};
export default PostDetailModal;
