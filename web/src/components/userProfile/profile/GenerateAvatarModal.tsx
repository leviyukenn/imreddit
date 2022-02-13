import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useChangeUserAvatar } from "../../../graphql/hooks/useChangeUserAvatar";

interface GenerateAvatarModalProps {
  open: boolean;
  closeModal: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   zIndex: 1009,
    },
    container: {},
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #bdbfc0",
      borderRadius: 4,
      height: "calc(100vh - 320px)",
      maxWidth: "960px",
      minHeight: 340,
      width: "calc(100% - 160px)",
    },
    avatarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      maxHeight: 600,
    },
    avatar: {
      height: "100%",
      maxWidth: "100%",
    },
    generateAvatarButton: {
      width: 125,
      boxSizing: "border-box",
      height: 40,
      border: "2px solid #ff4500",
      backgroundColor: "#fff",
      color: "#ff4500",
      borderRadius: 30,
      fontSize: "0.875rem",
      fontWeight: 700,
      textTransform: "none",
      "&:hover": {
        color: "#fff",
        backgroundColor: "#ff4500",
      },
    },
    saveButton: {
      width: 125,
      boxSizing: "border-box",
      height: 40,
      border: "2px solid #ff4500",
      color: "#fff",
      backgroundColor: "#ff4500",
      borderRadius: 30,
      fontSize: "0.875rem",
      fontWeight: 700,
      textTransform: "none",
      marginLeft: 20,
      "&:hover": {
        backgroundColor: "#FD6237",
      },
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    },
    buttonGroups: {
      margin: "40px 0",
      height: 40,
    },
  })
);
const GenerateAvatarModal = ({
  open,
  closeModal,
}: GenerateAvatarModalProps) => {
  const classes = useStyles();
  const [seed, setSeed] = useState<string>(() =>
    String(Math.floor(Math.random() * 100000))
  );
  const [isSaving, setIsSaving] = useState(false);
  const generateRandomSeed = () => {
    setSeed(String(Math.floor(Math.random() * 100000)));
  };
  const { onSaveAvatar } = useChangeUserAvatar();

  const onSave = useCallback(async () => {
    setIsSaving(true);
    const success = await onSaveAvatar(seed);
    setIsSaving(false);
  }, [seed, onSaveAvatar]);

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      classes={{
        root: classes.root,
        paper: classes.paper,
        container: classes.container,
      }}
    >
      <DialogContent className={classes.content}>
        <Box className={classes.avatarContainer}>
          <img
            className={classes.avatar}
            src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg?flip=true&radius=50`}
          />
        </Box>
        <Box className={classes.buttonGroups}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            className={classes.generateAvatarButton}
            onClick={generateRandomSeed}
          >
            Generate
          </Button>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={onSave}
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default GenerateAvatarModal;
