import { ApolloError } from "@apollo/client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnackbarAlertMessage,
  setSnackbarAlertMessage,
} from "../actions/snackbarAlert";
import { RootState } from "../reducers/combinedReducer";
import { SnackbarAlertState, AlertSeverity } from "../types/types";
import { FrontendError } from "../../const/errors";

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
    },
    []
  );

  const onOpenSnackbarAlert = useCallback((data: SnackbarAlertState) => {
    dispatch(setSnackbarAlertMessage(data));
  }, []);

  const handleMutationError = useCallback(
    ({ networkError, graphQLErrors }: ApolloError) => {
      if (graphQLErrors && graphQLErrors.length !== 0)
        onOpenSnackbarAlert({
          message: graphQLErrors[0].message,
          severity: AlertSeverity.ERROR,
        });
      if (networkError) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0003,
          severity: AlertSeverity.ERROR,
        });
      }
    },
    [onOpenSnackbarAlert]
  );

  return {
    message: snackbarAlertState.message,
    severity: snackbarAlertState.severity,
    onOpenSnackbarAlert,
    onCloseSnackbarAlert,
    handleMutationError
  };
}
