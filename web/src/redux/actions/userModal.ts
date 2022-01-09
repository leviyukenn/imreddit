import { Action, ACTION_TYPES, USER_MODAL_CONTENT } from "../types/types";

export function openUserModal(): Action<boolean | USER_MODAL_CONTENT> {
  return { type: ACTION_TYPES.OPEN_USER_MODAL, data: true };
}

export function closeUserModal(): Action<boolean | USER_MODAL_CONTENT> {
  return { type: ACTION_TYPES.CLOSE_USER_MODAL, data: false };
}

export function changeUserModalContent(
  userModalContent: USER_MODAL_CONTENT
): Action<boolean | USER_MODAL_CONTENT> {
  return {
    type: ACTION_TYPES.CHANGE_USER_MODAL_CONTENT,
    data: userModalContent,
  };
}

