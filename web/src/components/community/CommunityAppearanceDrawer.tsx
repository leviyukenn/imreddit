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
import { useAlertDialog } from "../../redux/hooks/useAlertDialog";
import { useSaveOrInitCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommunityAppearanceEditor from "./CommunityAppearanceEditor";

interface CommunityAppearanceDrawerProps {
  community: CommunityQuery["community"];
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
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
  openDrawer,
  setOpenDrawer,
}: // onInit,
// onSave,
CommunityAppearanceDrawerProps) => {
  const classes = useStyles();

  const {
    initiateCommunityAppearance,
    saveCommunityAppearance,
    hasSettingsChanged,
  } = useSaveOrInitCommunityAppearance(community);

  const discardChangesAndCloseDrawer = useCallback(() => {
    initiateCommunityAppearance();
    setOpenDrawer(false);
  }, [initiateCommunityAppearance, setOpenDrawer]);

  const { open } = useAlertDialog({
    title: "Discard unsaved changes before leaving?",
    text:
      "You have made some changes to your community, do you wish to leave this menu without saving?",
    confirmButtonName: "Discard",
    onConfirm: discardChangesAndCloseDrawer,
  });

  const confirmDiscardAppearanceChange = useCallback(() => {
    if (hasSettingsChanged) {
      open();
      return;
    }
    setOpenDrawer(false);
  }, [hasSettingsChanged, open, setOpenDrawer]);

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={confirmDiscardAppearanceChange}
    >
      <Box className={classes.drawerHeader} justifyContent="space-between">
        <Typography variant="h6">Appearance</Typography>
        <IconButton onClick={confirmDiscardAppearanceChange}>
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
