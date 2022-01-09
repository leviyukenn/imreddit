import {
  Action,
  ACTION_TYPES,
  AlertSeverity,
  SnackbarAlertState,
} from "../types/types";

const initState: SnackbarAlertState = {
  message: "",
  severity: AlertSeverity.INFO,
};

export default function userModalReducer(
  preState: SnackbarAlertState = initState,
  action: Action<SnackbarAlertState | null>
): SnackbarAlertState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.SET_SNACKBAR_ALERT_MESSAGE:
      return data!;
    case ACTION_TYPES.CLEAR_SNACKBAR_ALERT_MESSAGE:
      return initState;

    default:
      return preState;
  }
}
