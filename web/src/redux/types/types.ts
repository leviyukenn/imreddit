export enum ACTION_TYPES {
  OPEN_USER_MODAL,
  CLOSE_USER_MODAL,
  CHANGE_USER_MODAL_CONTENT,
  SET_SNACKBAR_ALERT_MESSAGE,
  CLEAR_SNACKBAR_ALERT_MESSAGE,
  SET_COMMUNITY_BACKGROUND_IMAGE,
  SET_COMMUNITY_BACKGROUND_COLOR,
  SET_COMMUNITY_BANNER_IMAGE,
  SET_COMMUNITY_BANNER_COLOR,
  SET_COMMUNITY_ICON_IMAGE,
  INIT_COMMUNITY_APPEARANCE,
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

export enum AlertSeverity {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface SnackbarAlertState {
  message: string;
  severity: AlertSeverity;
}

export interface CommunityAppearanceState {
  background: string;
  backgroundColor: string;
  banner: string;
  bannerColor: string;
  icon: string;
}
