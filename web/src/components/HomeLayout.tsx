import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useCallback } from "react";
import Container from "./Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heartContainer: {
      flex: "1 1 100%",
      // [theme.breakpoints.up("xs")]: {
      //   width: "100%",
      // },
      // (960px,infinity)
      [theme.breakpoints.up("md")]: {
        maxWidth: "740px",
      },
    },
    rightSideContainer: {
      marginLeft: "2rem",
      display: "none",
      // width: "312px",
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
  mainContent: JSX.Element;
  rightSideContent?: JSX.Element;
  banner?: JSX.Element;
}

const HomeContainer = ({
  mainContent,
  rightSideContent,
  banner,
}: HomeContainerProps) => {
  const classes = useStyles();

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container banner={banner}>
      <Box display="flex" justifyContent="center">
        <Box className={classes.heartContainer}>{mainContent}</Box>
        <Box className={classes.rightSideContainer}>
          {rightSideContent}
          <Fab
            variant="extended"
            color="primary"
            onClick={backToTop}
            className={classes.backToTopButton}
          >
            <NavigationIcon className={classes.backToTopButtonIcon} />
            Back to Top
          </Fab>
        </Box>
      </Box>
      {/* <PostDetailModal /> */}
    </Container>
  );
};

export default HomeContainer;
