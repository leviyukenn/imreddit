import {
  Box,
  Button,
  createStyles,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useCallback } from "react";
import { CommunityQuery } from "../../generated/graphql";
import { useSaveOrInitCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommunityAppearanceEditor from "./CommunityAppearanceEditor";

interface CommunityAppearanceDrawerProps {
  community: CommunityQuery["community"];
}
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
    saveButton: {
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
    cancelButton: {
      marginTop: "1em",
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
    },
    buttonContainer: {
      padding: "0.5rem 1rem",
    },
  })
);

export enum AppearanceContent {
  MENU,
  BACKGROUND,
}

const CommunityAppearanceDrawer = ({
  community,
}: // onInit,
// onSave,
CommunityAppearanceDrawerProps) => {
  const classes = useStyles();

  const {
    initiateCommunityAppearance,
    saveCommunityAppearance,
    confirmDiscardAppearanceChange,
    hasSettingsChanged,
  } = useSaveOrInitCommunityAppearance(community);
  const onCloseDrawer = useCallback(() => {}, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={confirmDiscardAppearanceChange}
    >
      <Box className={classes.drawerHeader} justifyContent="space-between">
        <Typography variant="h6">Appearance</Typography>
        <IconButton onClick={() => {}}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <CommunityAppearanceEditor />
      <Divider />
      <Box className={classes.buttonContainer}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.saveButton}
          onClick={saveCommunityAppearance}
          disabled={!hasSettingsChanged}
        >
          Save
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.cancelButton}
          onClick={initiateCommunityAppearance}
        >
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
};
export default CommunityAppearanceDrawer;
