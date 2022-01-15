import { combineReducers } from "redux";
import communityAppearanceState from "./communityAppearanceReducer";
import snackbarAlertState from "./snackbarAlertReducer";
import userModalState from "./userModalReducer";

export const rootReducer = combineReducers({
  userModalState,
  snackbarAlertState,
  communityAppearanceState,
});

export type RootState = ReturnType<typeof rootReducer>;
