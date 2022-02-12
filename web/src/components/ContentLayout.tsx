import { Box, createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { ReactNode, useCallback } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heartContainer: {
      flex: "1 1 100%",
      [theme.breakpoints.up("md")]: {
        maxWidth: "740px",
      },
    },
    fullWidthHeartContainer: {
      flex: "1 1 100%",
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
  fullWidth?: boolean;
  rightSideContent?: JSX.Element;
  children: ReactNode;
  backToTop?: () => void;
}

const ContentLayout = ({
  fullWidth,
  rightSideContent,
  children,
  backToTop,
}: HomeContainerProps) => {
  const classes = useStyles();

  const defaultBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          className={
            fullWidth ? classes.fullWidthHeartContainer : classes.heartContainer
          }
        >
          {children}
        </Box>
        <Box className={classes.rightSideContainer}>
          {rightSideContent}
          <Fab
            variant="extended"
            color="primary"
            onClick={backToTop || defaultBackToTop}
            size="small"
            className={classes.backToTopButton}
          >
            <NavigationIcon className={classes.backToTopButtonIcon} />
            Back to Top
          </Fab>
        </Box>
      </Box>
    </>
  );
};

export default ContentLayout;
