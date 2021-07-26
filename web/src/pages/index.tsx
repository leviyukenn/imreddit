import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useCallback } from "react";
import Container from "../components/Container";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      marginTop: "24px",
      maxWidth: "740px",
      width: "calc(100% - 32px)",
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      right: 0,
    },
  })
);

const Index = () => {
  const classes = useStyles();

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <HomePostsInfiniteScroll />
        <Fab
          variant="extended"
          color="primary"
          onClick={backToTop}
          className={classes.backToTopButton}
        >
          <NavigationIcon />
          Back to Top
        </Fab>
      </Box>
    </Container>
  );
};

export default Index;
