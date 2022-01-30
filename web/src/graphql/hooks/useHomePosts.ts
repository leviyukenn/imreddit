import { useCallback, useMemo } from "react";
import {
  RegularPostDetailFragment,
  usePostsQuery,
} from "../../generated/graphql";

export function useHomePosts() {
  const { data: postsResponse, fetchMore, loading } = usePostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10 },
  });
  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.paginatedPosts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.paginatedPosts.hasMore : false),
    [postsResponse]
  );
  const next = useCallback(() => {
    fetchMore({
      variables: {
        limit: 10,
        cursor: posts[posts.length - 1].createdAt,
      },
    });
  }, [posts]);
  return { posts, hasMore, next, loading };
}
