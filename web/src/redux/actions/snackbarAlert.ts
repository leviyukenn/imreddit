import { Action, ACTION_TYPES, SnackbarAlertState } from "../types/types";

export function setSnackbarAlertMessage(
  data: SnackbarAlertState
): Action<SnackbarAlertState> {
  return { type: ACTION_TYPES.SET_SNACKBAR_ALERT_MESSAGE, data };
}

export function clearSnackbarAlertMessage(): Action<null> {
  return { type: ACTION_TYPES.CLEAR_SNACKBAR_ALERT_MESSAGE, data: null };
}
