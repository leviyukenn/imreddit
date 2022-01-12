import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnackbarAlertMessage,
  setSnackbarAlertMessage,
} from "../actions/snackbarAlert";
import { RootState } from "../reducers/combinedReducer";
import { SnackbarAlertState } from "../types/types";

export function useSnackbarAlert() {
  const snackbarAlertState = useSelector(
    (state: RootState) => state.snackbarAlertState
  );

  const dispatch = useDispatch();

  const onCloseSnackbarAlert = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
    dispatch(clearSnackbarAlertMessage());
  }, []);

  const onOpenSnackbarAlert = useCallback((data: SnackbarAlertState) => {
    dispatch(setSnackbarAlertMessage(data));
  }, []);

  return {
    message: snackbarAlertState.message,
    severity: snackbarAlertState.severity,
    onOpenSnackbarAlert,
    onCloseSnackbarAlert,
  };
}
