import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useCallback } from "react";

interface AlertProps {
  message: string;
  setMessage: (message: string) => void;
  severity?: AlertSeverity;
}

export enum AlertSeverity {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export const SnackbarAlert = ({
  message,
  setMessage,
  severity,
}: AlertProps) => {
  const handleClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setMessage("");
    },
    []
  );
  return (
    <Snackbar open={!!message} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity || AlertSeverity.ERROR}>
        {message}
      </Alert>
    </Snackbar>
  );
};
