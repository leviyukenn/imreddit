import { combineReducers } from "redux";
import userModalState from "../reducers/userModal";

export const rootReducer = combineReducers({
  userModalState,
});

//根据rootReducer的type生成RootState的type
export type RootState = ReturnType<typeof rootReducer>;
