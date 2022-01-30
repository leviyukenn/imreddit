import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FrontendError } from "../../const/errors";
import {
  CommunityQuery,
  useSetCommunityAppearanceMutation,
} from "../../generated/graphql";
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
import { AlertSeverity } from "../types/types";
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
  community?: CommunityQuery["community"]
) {
  const communityInitAppearance = community && {
    background: community.background,
    backgroundColor: community.backgroundColor,
    banner: community.banner,
    bannerColor: community.bannerColor,
    icon: community.icon,
  };
  const communityAppearanceState = useSelector(
    (state: RootState) => state.communityAppearanceState
  );
  const { onOpenSnackbarAlert } = useSnackbarAlert();

  const dispatch = useDispatch();
  const [setCommunityAppearance] = useSetCommunityAppearanceMutation();
  const [uploading, setUploading] = useState(false);

  const initiateCommunityAppearance = useCallback(() => {
    if (!communityInitAppearance) return;
    dispatch(initCommunityAppearance(communityInitAppearance));
  }, [communityInitAppearance]);

  const hasSettingsChanged =
    communityInitAppearance &&
    !compareCommunityAppearance(
      communityInitAppearance,
      communityAppearanceState
    );

  const saveCommunityAppearance = async () => {
    if (uploading) return;
    if (!community?.id) return;
    if (!hasSettingsChanged) return;
    setUploading(true);
    const result = await setCommunityAppearance({
      variables: { communityId: community.id, ...communityAppearanceState },
    }).catch(() => null);
    if (!result) {
      onOpenSnackbarAlert({
        message: FrontendError.ERR0002,
        severity: AlertSeverity.ERROR,
      });
      setUploading(false);
      return;
    }

    if (result.errors) {
      onOpenSnackbarAlert({
        message: result.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      setUploading(false);
      return;
    }

    const communityResponse = result.data?.setCommunityAppearance;
    if (communityResponse?.errors) {
      onOpenSnackbarAlert({
        message: communityResponse.errors[0].message,
        severity: AlertSeverity.ERROR,
      });
      setUploading(false);
      return;
    }

    if (communityResponse?.community) {
      onOpenSnackbarAlert({
        message: `Community settings updated successfully`,
        severity: AlertSeverity.SUCCESS,
      });
      setUploading(false);
      return;
    }
  };

  return {
    initiateCommunityAppearance,
    saveCommunityAppearance,
    hasSettingsChanged,
  };
}
