import { Action, ACTION_TYPES, CommunityAppearanceState } from "../types/types";

const initState: CommunityAppearanceState = {
  background: "",
  backgroundColor: "#DAE0E6",
  banner: "",
  bannerColor: "#33a8ff",
  icon: "",
};

export default function communityImagesReducer(
  preState: CommunityAppearanceState = initState,
  action: Action<string | CommunityAppearanceState>
): CommunityAppearanceState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.INIT_COMMUNITY_APPEARANCE:
      return data as CommunityAppearanceState;
    case ACTION_TYPES.SET_COMMUNITY_BACKGROUND_IMAGE:
      return { ...preState, background: data as string };
    case ACTION_TYPES.SET_COMMUNITY_BACKGROUND_COLOR:
      return { ...preState, backgroundColor: data as string };
    case ACTION_TYPES.SET_COMMUNITY_BANNER_IMAGE:
      return { ...preState, banner: data as string };
    case ACTION_TYPES.SET_COMMUNITY_BANNER_COLOR:
      return { ...preState, bannerColor: data as string };
    case ACTION_TYPES.SET_COMMUNITY_ICON_IMAGE:
      return { ...preState, icon: data as string };
    default:
      return preState;
  }
}
