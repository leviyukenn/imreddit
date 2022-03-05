import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  useUserPostsQuery,
} from "../../generated/graphql";
import { OrderType } from "../types/types";

export function useUserPosts(userName: string,orderType:OrderType) {
  const response = useUserPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, userName,orderType },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => response.data?.userPosts.posts || [],
    [response]
  );

  const hasMore = useMemo(
    () => (response.data?.userPosts ? response.data.userPosts.hasMore : false),
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
