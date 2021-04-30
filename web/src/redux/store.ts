import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/combinedReducer";

export default createStore(rootReducer, composeWithDevTools());
