import { useCallback, useMemo } from "react";
import {
  RegularPostDetailFragment,
  useCommunityPostsQuery,
} from "../../generated/graphql";

export function useCommunityPosts(communityName: string) {
  const { data: postsResponse, fetchMore, loading } = useCommunityPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, communityName: communityName },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.communityPosts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.communityPosts.hasMore : false),
    [postsResponse]
  );
  const next = useCallback(() => {
    fetchMore({
      variables: {
        limit: 10,
        cursor: posts[posts.length - 1].createdAt,
        communityName: communityName,
      },
    });
  }, [posts]);

  return { posts, hasMore, next, loading };
}
