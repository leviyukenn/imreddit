import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";

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

      maxWidth: "960px",
      width: "calc(100% - 160px)",
    },
    avatarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 600,
    },
    generateAvatarButton: {
      background: "linear-gradient(90deg,#ec0623,#ff8717)",
      borderRadius: "9999px",
      fontWeight: 700,
      textTransform: "none",
      width: 200,
    },
  })
);
const GenerateAvatarModal = ({
  open,
  closeModal,
}: GenerateAvatarModalProps) => {
  const classes = useStyles();
  const [seed, setSeed] = useState<number>(10000);
  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 10000));
  };
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
      <DialogContent className={""}>
        <Box className={classes.avatarContainer}>
          <img
            src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg?flip=true`}
          />
        </Box>
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          className={classes.generateAvatarButton}
          onClick={generateRandomSeed}
        >
          Generate Random Avatar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default GenerateAvatarModal;
