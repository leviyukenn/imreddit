import { Action, ACTION_TYPES, CommunityAppearanceState } from "../types/types";

export function changeCommunityBackgroundImage(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BACKGROUND_IMAGE, data };
}

export function changeCommunityBackgroundColor(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BACKGROUND_COLOR, data };
}

export function changeCommunityBannerColor(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BANNER_COLOR, data };
}

export function changeCommunityBannerImage(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_BANNER_IMAGE, data };
}

export function changeCommunityIconImage(data: string): Action<string> {
  return { type: ACTION_TYPES.SET_COMMUNITY_ICON_IMAGE, data };
}

export function initCommunityAppearance(
  data: CommunityAppearanceState
): Action<CommunityAppearanceState> {
  return { type: ACTION_TYPES.INIT_COMMUNITY_APPEARANCE, data };
}
