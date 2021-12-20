import React, { useMemo } from "react";
import { CommunityQuery, useCommunityQuery } from "../../generated/graphql";
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

  return { community };
};

const CommunityHomePage = ({
  communityName,
  serverSideCommunity,
}: CommunityProps) => {
  const { community } = useCommunity(communityName, serverSideCommunity);

  if (!community) return <LoadingPostCard />;
  return (
    <HomeLayout
      mainContent={<CommunityHeartContent communityName={communityName} />}
      rightSideContent={<CommunityDescription community={community} />}
      banner={<CommunityBanner />}
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
