import React, { useEffect, useMemo } from "react";
import {
  CommunityQuery,
  useCommunityQuery,
  useUserRoleQuery,
} from "../../generated/graphql";
import { useSaveOrInitCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import ContentLayout from "../ContentLayout";
import CreatePostCard from "../post/CreatePostCard";
import { LoadingPostCard } from "../post/PostCard";
import { CommunityPostsInfiniteScroll } from "../post/PostInfiniteScroll";
import CommunityAppearanceDrawer from "./CommunityAppearanceDrawer";
import CommunityBanner from "./CommunityBanner";
import CommunityDescription from "./CommunityDescription";
import CommunityDescriptionModeratorMode from "./CommunityDescriptionModerorMode";
import CommunityHomeContainer from "./CommunityHomeContainer";

interface CommunityProps {
  communityName: string;
  serverSideCommunity?: CommunityQuery["community"];
}

const useCommunity = (
  communityName: string,
  serverSideCommunity?: CommunityQuery["community"]
) => {
  const { data: communityResponse } = useCommunityQuery({
    skip: typeof window === "undefined",
    variables: { communityName },
  });
  const clientSideCommunity = useMemo(() => communityResponse?.community, [
    communityResponse,
  ]);
  const community = useMemo(() => clientSideCommunity || serverSideCommunity, [
    clientSideCommunity,
    serverSideCommunity,
  ]);

  const { me } = useIsAuth();
  const { data: userRoleResponse } = useUserRoleQuery({
    skip: typeof window === "undefined" || !me?.id || !community?.id,
    variables: { userId: me?.id!, communityId: community?.id! },
  });

  const userRole = useMemo(() => userRoleResponse?.userRole, [
    userRoleResponse,
  ]);

  return { community, userRole };
};

const CommunityHomePage = ({
  communityName,
  serverSideCommunity,
}: CommunityProps) => {
  const { community, userRole } = useCommunity(
    communityName,
    serverSideCommunity
  );
  const { onInit, onSave } = useSaveOrInitCommunityAppearance(
    community?.id,
    community
      ? {
          background: community.background,
          backgroundColor: community.backgroundColor,
          banner: community.banner,
          bannerColor: community.bannerColor,
          icon: community.icon,
        }
      : undefined
  );

  useEffect(() => {
    if (!community) {
      return;
    }
    onInit();
  }, [community]);

  const communityDescription = useMemo(() => {
    if (!community) {
      return undefined;
    }
    if (userRole?.isModerator) {
      return <CommunityDescriptionModeratorMode community={community} />;
    }
    return <CommunityDescription community={community} />;
  }, [userRole, community]);

  const communityAppearanceDrawer = useMemo(() => {
    if (!community || !userRole?.isModerator) {
      return undefined;
    }
    return <CommunityAppearanceDrawer {...{ onSave, onInit }} />;
  }, [userRole, community]);

  return community ? (
    <CommunityHomeContainer
      banner={<CommunityBanner community={community} />}
      drawer={communityAppearanceDrawer}
    >
      <ContentLayout
        mainContent={<CommunityHeartContent communityName={communityName} />}
        rightSideContent={communityDescription}
      />
    </CommunityHomeContainer>
  ) : (
    <LoadingPostCard />
  );
};

const CommunityHeartContent = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { isAuth } = useIsAuth();
  return (
    <>
      {isAuth ? <CreatePostCard /> : null}
      <CommunityPostsInfiniteScroll communityName={communityName} />
    </>
  );
};

export default CommunityHomePage;
