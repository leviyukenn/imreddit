import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";

export const SnackbarAlert = () => {
  const { message, severity, onCloseSnackbarAlert } = useSnackbarAlert();

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={5000}
      onClose={onCloseSnackbarAlert}
    >
      <Alert onClose={onCloseSnackbarAlert} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
