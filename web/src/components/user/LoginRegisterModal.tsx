import {
  createStyles,
  Dialog,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useUserModalState } from "../../redux/hooks/useUserModalState";
import { USER_MODAL_CONTENT } from "../../redux/types/types";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalPaper: {
      width: "100%",
      maxWidth: "850px",
      height: "100%",
      maxHeight: "650px",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    content: {
      padding: 0,
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
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.modalPaper }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      {modalContent}
    </Dialog>
  );
};
export default LoginRegisterModal;
