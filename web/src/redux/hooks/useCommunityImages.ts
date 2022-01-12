import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCommunityBackgroundImage } from "../actions/communityImages";
import { RootState } from "../reducers/combinedReducer";

export function useCommunityImages() {
  const communityImagesState = useSelector(
    (state: RootState) => state.communityImagesState
  );

  const dispatch = useDispatch();

  const setCommunityBackgroundImage = useCallback((path: string) => {
    dispatch(changeCommunityBackgroundImage(path));
  }, []);

  return {
    ...communityImagesState,
    setCommunityBackgroundImage,
  };
}
