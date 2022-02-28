import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  usePostsQuery,
} from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { OrderType } from "../types/types";

export function useHomePosts(orderType: OrderType) {
  const { me } = useIsAuth();
  const { data: postsResponse, fetchMore, loading } = usePostsQuery({
    skip: typeof window === "undefined",
    variables: { orderType, userId: me?.id, limit: 10 },
  });
  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.paginatedPosts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.paginatedPosts.hasMore : false),
    [postsResponse]
  );
  const next = async () => {
    try {
      await fetchMore({
        variables: {
          orderType,
          userId: me?.id,
          limit: 10,
          cursor: posts[posts.length - 1]?.createdAt,
        },
      });
    } catch (e) {}
  };
  return { posts, hasMore, next, loading };
}
