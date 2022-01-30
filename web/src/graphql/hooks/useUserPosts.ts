import { useCallback, useMemo } from "react";
import {
  RegularPostDetailFragment,
  useUserPostsQuery,
} from "../../generated/graphql";

export function useUserPosts(userName: string) {
  const { data: postsResponse, fetchMore, loading } = useUserPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, userName },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.userPosts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.userPosts.hasMore : false),
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
