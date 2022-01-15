import { Action, ACTION_TYPES, AlertDialogState } from "../types/types";

const initState: AlertDialogState = {
  title: "",
  text: "",
  onConfirm: () => {},
  confirmButtonName: "",
};

export default function alertDialogReducer(
  preState: AlertDialogState = initState,
  action: Action<AlertDialogState | null>
): AlertDialogState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.OPEN_ALERT_DIALOG:
      return data!;
    case ACTION_TYPES.CLOSE_ALERT_DIALOG:
      return initState;

    default:
      return preState;
  }
}
