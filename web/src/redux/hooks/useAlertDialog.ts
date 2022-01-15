import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertDialog, openAlertDialog } from "../actions/alertDialog";
import { RootState } from "../reducers/combinedReducer";
import { AlertDialogState } from "../types/types";

export function useAlertDialog(alertDialogProps?: AlertDialogState) {
  const alertDialogState = useSelector(
    (state: RootState) => state.alertDialogState
  );
  const dispatch = useDispatch();

  const open = useCallback(() => {
    if (!alertDialogProps) return;
    dispatch(openAlertDialog(alertDialogProps));
  }, [alertDialogProps]);

  const close = useCallback(() => {
    dispatch(closeAlertDialog());
  }, []);

  return { ...alertDialogState, open, close };
}
