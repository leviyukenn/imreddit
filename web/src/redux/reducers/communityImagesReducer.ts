import { Action, ACTION_TYPES, CommunityImagesState } from "../types/types";

const initState: CommunityImagesState = {
  background: "",
  backgroundColor: "#DAE0E6",
};

export default function communityImagesReducer(
  preState: CommunityImagesState = initState,
  action: Action<string>
): CommunityImagesState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.SET_COMMUNITY_BACKGROUND_IMAGE:
      return { ...preState, background: data };
    case ACTION_TYPES.SET_COMMUNITY_BACKGROUND_COLOR:
      return { ...preState, backgroundColor: data };
    default:
      return preState;
  }
}
