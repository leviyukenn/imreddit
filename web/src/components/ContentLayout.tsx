import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { ReactNode, useCallback } from "react";
import PostDetailModal from "./post/PostDetailModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heartContainer: {
      flex: "1 1 100%",
      [theme.breakpoints.up("md")]: {
        maxWidth: "740px",
      },
    },
    rightSideContainer: {
      marginLeft: "2rem",
      display: "none",
      flex: "0 0 312px",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      textTransform: "none",
      fontWeight: 700,
    },
    backToTopButtonIcon: {
      fontSize: "1.25rem",
      marginRight: "0.5em",
    },
  })
);

interface HomeContainerProps {
  rightSideContent?: JSX.Element;
  children: ReactNode;
}

const ContentLayout = ({ rightSideContent, children }: HomeContainerProps) => {
  const classes = useStyles();

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box className={classes.heartContainer}>{children}</Box>
        <Box className={classes.rightSideContainer}>
          {rightSideContent}
          <Fab
            variant="extended"
            color="primary"
            onClick={backToTop}
            size="small"
            className={classes.backToTopButton}
          >
            <NavigationIcon className={classes.backToTopButtonIcon} />
            Back to Top
          </Fab>
        </Box>
      </Box>
      <PostDetailModal />
    </>
  );
};

export default ContentLayout;
