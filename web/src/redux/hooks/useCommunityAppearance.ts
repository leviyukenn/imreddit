import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrontendError } from "../../const/errors";
import { useSetCommunityAppearanceMutation } from "../../generated/graphql";
import { compareCommunityAppearance } from "../../utils/utils";
import {
  changeCommunityBackgroundColor,
  changeCommunityBackgroundImage,
  changeCommunityBannerColor,
  changeCommunityBannerImage,
  changeCommunityIconImage,
  initCommunityAppearance,
} from "../actions/communityAppearance";
import { RootState } from "../reducers/combinedReducer";
import { AlertSeverity, CommunityAppearanceState } from "../types/types";
import { useSnackbarAlert } from "./useSnackbarAlert";

export function useCommunityAppearance() {
  const communityAppearanceState = useSelector(
    (state: RootState) => state.communityAppearanceState
  );

  const dispatch = useDispatch();

  const setCommunityBackgroundImage = useCallback((path: string) => {
    dispatch(changeCommunityBackgroundImage(path));
  }, []);

  const setCommunityBackgroundColor = useCallback((colorHex: string) => {
    dispatch(changeCommunityBackgroundColor(colorHex));
  }, []);

  const setCommunityBannerImage = useCallback((path: string) => {
    dispatch(changeCommunityBannerImage(path));
  }, []);

  const setCommunityBannerColor = useCallback((colorHex: string) => {
    dispatch(changeCommunityBannerColor(colorHex));
  }, []);

  const setCommunityIconImage = useCallback((path: string) => {
    dispatch(changeCommunityIconImage(path));
  }, []);

  return {
    ...communityAppearanceState,
    setCommunityBackgroundImage,
    setCommunityBackgroundColor,
    setCommunityBannerColor,
    setCommunityBannerImage,
    setCommunityIconImage,
  };
}

export function useSaveOrInitCommunityAppearance(
  communityId?: string,
  communityAppearance?: CommunityAppearanceState
) {
  const communityAppearanceState = useSelector(
    (state: RootState) => state.communityAppearanceState
  );
  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const dispatch = useDispatch();
  const [setCommunityAppearance] = useSetCommunityAppearanceMutation();

  const onInit = useCallback(() => {
    if (!communityAppearance) return;
    dispatch(initCommunityAppearance(communityAppearance));
  }, [communityAppearance]);

  const hasSettingsChanged = useMemo(
    () =>
      communityAppearance &&
      !compareCommunityAppearance(
        communityAppearance,
        communityAppearanceState
      ),
    [communityAppearanceState, communityAppearance]
  );

  const onSave = useCallback(async () => {
    if (!communityAppearance || !communityId) return;
    if (!hasSettingsChanged) return;
    const result = await setCommunityAppearance({
      variables: { communityId, ...communityAppearanceState },
    }).catch(() => null);
    if (!result) {
      onOpenSnackbarAlert({
        message: FrontendError.ERR0002,
        severity: AlertSeverity.ERROR,
      });
      return;
    }

    if (result.errors) {
      onOpenSnackbarAlert({
        message: result.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      return;
    }

    const communityResponse = result.data?.setCommunityAppearance;
    if (communityResponse?.errors) {
      onOpenSnackbarAlert({
        message: communityResponse.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      return;
    }

    if (communityResponse?.community) {
      onOpenSnackbarAlert({
        message: `Community settings updated successfully`,
        severity: AlertSeverity.SUCCESS,
      });
      return;
    }
  }, [communityAppearance, communityAppearanceState]);

  return { onInit, onSave, hasSettingsChanged };
}
