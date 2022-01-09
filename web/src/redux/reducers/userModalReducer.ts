import {
  Action,
  ACTION_TYPES,
  UserModalState,
  USER_MODAL_CONTENT,
} from "../types/types";

const initState: UserModalState = {
  isOpen: false,
  showWhichContent: USER_MODAL_CONTENT.LOGIN,
};

export default function userModalReducer(
  preState: UserModalState = initState,
  action: Action<boolean | USER_MODAL_CONTENT>
): UserModalState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.OPEN_USER_MODAL:
      return {
        ...preState,
        isOpen: data as boolean,
      };
    case ACTION_TYPES.CLOSE_USER_MODAL:
      return {
        ...preState,
        isOpen: data as boolean,
      };

    case ACTION_TYPES.CHANGE_USER_MODAL_CONTENT:
      return {
        ...preState,
        showWhichContent: data as USER_MODAL_CONTENT,
      };
    default:
      return preState;
  }
}
