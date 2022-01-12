import {
  Box,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import { useMemo, useState } from "react";
import CommunityApearanceMenuList from "./CommunityApearanceMenuList";
import CommunityBackgroudEditor from "./CommunityBackgroudEditor";

interface CommunityAppearanceDrawerProps {}
const drawerWidth = 284;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
    },
  })
);

export enum AppearanceContent {
  MENU,
  BACKGROUND,
}

const CommunityAppearanceDrawer = ({}: CommunityAppearanceDrawerProps) => {
  const classes = useStyles();

  const [showWhichContent, setShowWhichContent] = useState<AppearanceContent>(
    AppearanceContent.MENU
  );

  const content = useMemo(() => {
    switch (showWhichContent) {
      case AppearanceContent.MENU:
        return (
          <CommunityApearanceMenuList
            setShowWhichContent={setShowWhichContent}
          />
        );
      case AppearanceContent.BACKGROUND:
        return <CommunityBackgroudEditor />;

      default:
        return null;
    }
  }, [showWhichContent]);

  const isMenu = showWhichContent === AppearanceContent.MENU;
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box
        className={classes.drawerHeader}
        justifyContent={isMenu ? "flex-end" : "space-between"}
      >
        {!isMenu ? (
          <IconButton
            onClick={() => setShowWhichContent(AppearanceContent.MENU)}
          >
            <ChevronLeftIcon />
          </IconButton>
        ) : null}
        <IconButton onClick={() => {}}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {content}
      <Divider />
    </Drawer>
  );
};
export default CommunityAppearanceDrawer;
