import { useMemo } from "react";
import {
  RegularPostDetailFragment,
  useUserUpvotedPostsQuery,
} from "../../generated/graphql";

//upvoteType: 1 for upvote, 0 for downvote
export function useUserUpvotedPosts(userName: string, upvoteType: 0 | 1) {
  const response = useUserUpvotedPostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, userName, upvoteType },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => response.data?.userUpvotedPosts.posts || [],
    [response]
  );

  const hasMore = useMemo(
    () =>
      response.data?.userUpvotedPosts
        ? response.data.userUpvotedPosts.hasMore
        : false,
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
