import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  useSearchPostsQuery,
} from "../../generated/graphql";
import { OrderType } from "../types/types";

export function useSearchPosts(
  keyword: string,
  orderType: OrderType,
  communityName?: string
) {
  const response = useSearchPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, keyword, orderType,communityName },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => response.data?.searchPosts.posts || [],
    [response]
  );

  const hasMore = useMemo(
    () =>
      response.data?.searchPosts ? response.data.searchPosts.hasMore : false,
    [response]
  );
  const next = () => {
    try {
      const cursor =
        orderType === OrderType.NEW
          ? posts[posts.length - 1]?.createdAt
          : String(posts[posts.length - 1]?.points);
      response.fetchMore({
        variables: {
          limit: 10,
          cursor,
        },
      });
    } catch (e) {}
  };

  return { posts, hasMore, next, loading: response.loading };
}
