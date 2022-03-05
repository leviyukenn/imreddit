import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  useCommunityPostsQuery,
} from "../../generated/graphql";
import { OrderType } from "../types/types";

export function useCommunityPosts(communityName: string, orderType: OrderType) {
  const { data: postsResponse, fetchMore, loading } = useCommunityPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, communityName: communityName, orderType },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.communityPosts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.communityPosts.hasMore : false),
    [postsResponse]
  );
  const next = async () => {
    try {
      const cursor =
        orderType === OrderType.NEW
          ? posts[posts.length - 1]?.createdAt
          : String(posts[posts.length - 1]?.points);
      await fetchMore({
        variables: {
          limit: 10,
          cursor,
          communityName: communityName,
        },
      });
    } catch (e) {}
  };

  return { posts, hasMore, next, loading };
}
