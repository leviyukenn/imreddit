import { combineReducers } from "redux";
import userModalState from "./userModalReducer";
import snackbarAlertState from "./snackbarAlertReducer";

export const rootReducer = combineReducers({
  userModalState,
  snackbarAlertState
});

//根据rootReducer的type生成RootState的type
export type RootState = ReturnType<typeof rootReducer>;
