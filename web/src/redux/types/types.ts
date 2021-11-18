export enum ACTION_TYPES {
  OPEN_USER_MODAL = "open_user_modal",
  CLOSE_USER_MODAL = "close_user_modal",
  CHANGE_USER_MODAL_CONTENT = "change_user_modal_content",
}

export interface Action<T> {
  type: ACTION_TYPES;
  data: T;
}

export enum USER_MODAL_CONTENT {
  LOGIN = 1,
  REGISTER,
  FORGOT_PASSWORD,
}

export interface UserModalState {
  isOpen: boolean;
  showWhichContent: USER_MODAL_CONTENT;
}
