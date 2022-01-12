import { combineReducers } from "redux";
import communityImagesState from "./communityImagesReducer";
import snackbarAlertState from "./snackbarAlertReducer";
import userModalState from "./userModalReducer";

export const rootReducer = combineReducers({
  userModalState,
  snackbarAlertState,
  communityImagesState,
});

export type RootState = ReturnType<typeof rootReducer>;
