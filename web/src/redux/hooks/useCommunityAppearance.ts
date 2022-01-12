import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCommunityBackgroundColor,
  changeCommunityBackgroundImage,
} from "../actions/communityImages";
import { RootState } from "../reducers/combinedReducer";

export function useCommunityAppearance() {
  const communityImagesState = useSelector(
    (state: RootState) => state.communityImagesState
  );

  const dispatch = useDispatch();

  const setCommunityBackgroundImage = useCallback((path: string) => {
    dispatch(changeCommunityBackgroundImage(path));
  }, []);

  const setCommunityBackgroundColor = useCallback((colorHex: string) => {
    dispatch(changeCommunityBackgroundColor(colorHex));
  }, []);

  return {
    ...communityImagesState,
    setCommunityBackgroundImage,
    setCommunityBackgroundColor,
  };
}
