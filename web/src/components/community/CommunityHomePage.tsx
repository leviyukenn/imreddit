import React, { useEffect, useMemo } from "react";
import {
  CommunityQuery,
  useCommunityQuery,
  useUserRoleQuery,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import HomeLayout from "../HomeLayout";
import CreatePostCard from "../post/CreatePostCard";
import { LoadingPostCard } from "../post/PostCard";
import { CommunityPostsInfiniteScroll } from "../post/PostInfiniteScroll";
import CommunityBanner from "./CommunityBanner";
import CommunityDescription from "./CommunityDescription";

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

  if (!community) return <LoadingPostCard />;
  return (
    <HomeLayout
      mainContent={<CommunityHeartContent communityName={communityName} />}
      rightSideContent={<CommunityDescription community={community} />}
      banner={<CommunityBanner community={community} userRole={userRole} />}
    />
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
