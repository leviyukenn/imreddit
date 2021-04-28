import {
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { Dispatch, SetStateAction } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import { MODAL_CONTENT } from "./NavBar";
import Register from "./Register";

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;

  showWhichContent: MODAL_CONTENT;
  setShowWhichContent: Dispatch<SetStateAction<MODAL_CONTENT>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

const LoginRegisterModal = ({
  isOpen,
  onClose,
  showWhichContent,
  setShowWhichContent,
}: LoginRegisterModalProps) => {
  let modalContent = null;
  switch (showWhichContent) {
    case MODAL_CONTENT.LOGIN:
      modalContent = (
        <Login onClose={onClose} setShowWhichContent={setShowWhichContent} />
      );
      break;
    case MODAL_CONTENT.REGISTER:
      modalContent = (
        <Register onClose={onClose} setShowWhichContent={setShowWhichContent} />
      );
      break;
    case MODAL_CONTENT.FORGOT_PASSWORD:
      modalContent = (
        <ForgotPassword setShowWhichContent={setShowWhichContent} />
      );
      break;
  }

  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" onClick={onClose}>
        <Typography>{showWhichContent}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{modalContent}</DialogContent>
    </Dialog>
  );
};
export default LoginRegisterModal;
