import { combineReducers } from "redux";
import alertDialogState from "./alertDialogReducer";
import communityAppearanceState from "./communityAppearanceReducer";
import snackbarAlertState from "./snackbarAlertReducer";
import userModalState from "./userModalReducer";

export const rootReducer = combineReducers({
  userModalState,
  snackbarAlertState,
  communityAppearanceState,
  alertDialogState,
});

export type RootState = ReturnType<typeof rootReducer>;
