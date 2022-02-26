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
      // textAlign: "center",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      left: "50%",
      textTransform: "none",
      fontWeight: 700,
      // margin: "0 auto",
      marginLeft: 90,
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
        {rightSideContent ? (
          <Box className={classes.rightSideContainer}>
            {rightSideContent}
            {/* <Box display="flex" justifyContent="center" marginTop="20px"> */}
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
        ) : // </Box>
        null}
      </Box>
    </>
  );
};

export default ContentLayout;
