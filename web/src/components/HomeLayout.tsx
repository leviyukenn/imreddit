import {
  Box,
  createStyles,
  Fab,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useCallback } from "react";
import Container from "./Container";
import CreatePostCard from "./post/CreatePostCard";
import PostDetailModal from "./post/PostDetailModal";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "640px",
      },
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      right: 0,
    },
  })
);

const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  const { isAuth } = useIsAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Box className={classes.mainContentHeart}>
          {isAuth ? <CreatePostCard /> : null}
          {children}
        </Box>
        {matches ? (
          <Fab
            variant="extended"
            color="primary"
            onClick={backToTop}
            className={classes.backToTopButton}
          >
            <NavigationIcon />
            Back to Top
          </Fab>
        ) : null}
      </Box>
      <PostDetailModal />
    </Container>
  );
};

export default HomeContainer;
