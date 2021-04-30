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
import React from "react";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { USER_MODAL_CONTENT } from "../../redux/types/types";
import ForgotPassword from "./ForgotPasswordForm";
import Login from "./LoginForm";
import Register from "./RegisterForm";

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

const LoginRegisterModal = () => {
  const { isOpen, onClose, showWhichContent } = useUserModalState();
  let modalContent = null;
  switch (showWhichContent) {
    case USER_MODAL_CONTENT.LOGIN:
      modalContent = <Login />;
      break;
    case USER_MODAL_CONTENT.REGISTER:
      modalContent = <Register />;
      break;
    case USER_MODAL_CONTENT.FORGOT_PASSWORD:
      modalContent = <ForgotPassword />;
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
