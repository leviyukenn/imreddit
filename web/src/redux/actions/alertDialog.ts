import { Action, ACTION_TYPES, AlertDialogState } from "../types/types";

export function openAlertDialog(
  data: AlertDialogState
): Action<AlertDialogState> {
  return { type: ACTION_TYPES.OPEN_ALERT_DIALOG, data };
}

export function closeAlertDialog(): Action<null> {
  return { type: ACTION_TYPES.CLOSE_ALERT_DIALOG, data: null };
}
