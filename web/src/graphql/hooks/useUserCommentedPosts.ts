import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  useUserPostsQuery,
  useUserCommentedPostsQuery,
} from "../../generated/graphql";

export function useUserCommentedPosts(userName: string) {
  const response = useUserCommentedPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, userName },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => response.data?.userCommentedPosts.posts || [],
    [response]
  );

  const hasMore = useMemo(
    () => (response.data?.userCommentedPosts ? response.data.userCommentedPosts.hasMore : false),
    [response]
  );
  const next = () => {
    try {
      response.fetchMore({
        variables: {
          limit: 10,
          cursor: posts[posts.length - 1]?.createdAt,
        },
      });
    } catch (e) {}
  };

  return { posts, hasMore, next, loading: response.loading };
}
