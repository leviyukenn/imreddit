import { Action, ACTION_TYPES, CommunityImagesState } from "../types/types";

const initState: CommunityImagesState = {
  background: "",
};

export default function communityImagesReducer(
  preState: CommunityImagesState = initState,
  action: Action<string>
): CommunityImagesState {
  const { type, data } = action;

  switch (type) {
    case ACTION_TYPES.SET_COMMUNITY_BACKGROUND_IMAGE:
      return { ...preState, background: data };
    default:
      return preState;
  }
}
