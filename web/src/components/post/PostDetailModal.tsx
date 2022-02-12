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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SERVER_URL } from "../../const/const";
import { useCommunity } from "../../graphql/hooks/useCommunity";
import { usePostDetail } from "../../graphql/hooks/usePostDetail";
import { usePostInfoRoute } from "../../utils/hooks/usePostInfoRoute";
import { createCommunityHomeLink } from "../../utils/links";
import CommunityDescription from "../community/description/CommunityDescription";
import ContentLayout from "../ContentLayout";
import PostDetail from "./PostDetail";

interface PostDetailModalProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "32px",
      maxWidth: "1280px",
      width: "calc(100% - 160px)",
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
      // display: "flex",
      // justifyContent: "center",
      // padding: 0,
      // backgroundColor: theme.palette.background.default,
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isScrollerRefAcquired, setIsScrollerRefAcquired] = useState(false);

  const handleClose = useCallback(() => {
    if (router.pathname.includes("postInfo")) {
      router.push(
        createCommunityHomeLink((router.query.postInfo as string[])[0]),
        undefined,
        { shallow: true, scroll: false }
      );
      return;
    }
    router.back();
  }, [router]);

  const { modalPostId } = usePostInfoRoute();
  const { post } = usePostDetail(modalPostId);
  const { community } = useCommunity(post?.community.name);

  const backgroundStyle = useMemo(() => {
    if (!community) return undefined;
    const { background, backgroundColor } = community;
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
  }, [community]);
  const open = !!router.query.modalPostId;

  useEffect(() => {
    if (post && community && open) {
      setIsScrollerRefAcquired(true);
      return;
    }
    setIsScrollerRefAcquired(false);
  }, [post, community, open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
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
      {post && community ? (
        <DialogContent
          dividers
          className={classes.content}
          style={backgroundStyle}
          ref={scrollerRef}
        >
          <ContentLayout
            rightSideContent={<CommunityDescription community={community} />}
            backToTop={
              scrollerRef.current
                ? () =>
                    scrollerRef.current?.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                : undefined
            }
          >
            <PostDetail post={post}></PostDetail>
          </ContentLayout>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};
export default PostDetailModal;
