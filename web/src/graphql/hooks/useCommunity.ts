import { useMemo } from "react";
import { CommunityQuery, useCommunityQuery } from "../../generated/graphql";

export const useCommunity = (
  communityName?: string,
  serverSideCommunity?: CommunityQuery["community"]
) => {
  const { data: communityResponse, loading } = useCommunityQuery({
    skip: typeof window === "undefined" || !communityName,
    variables: { communityName: communityName! },
  });
  const clientSideCommunity = useMemo(() => communityResponse?.community, [
    communityResponse,
  ]);
  const community = useMemo(() => clientSideCommunity || serverSideCommunity, [
    clientSideCommunity,
    serverSideCommunity,
  ]);
  return { community, loading };
};
