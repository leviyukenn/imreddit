import { Action, ACTION_TYPES } from "../types/types";

export function changeCommunityBackgroundImage(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BACKGROUND_IMAGE, data };
}

export function changeCommunityBackgroundColor(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BACKGROUND_COLOR, data };
}
