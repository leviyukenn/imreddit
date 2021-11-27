import { useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  RegularPostDetailFragment,
  useCommunityPostsQuery,
  usePostsQuery,
} from "../../generated/graphql";
import { LoadingPostCard, PostCard } from "./PostCard";

interface PostInfiniteScrollProps {
  posts: RegularPostDetailFragment[];
  hasMore: boolean;
  next: () => void;
}

const PostInfiniteScroll = ({
  posts,
  hasMore,
  next,
}: PostInfiniteScrollProps) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingPostCard />}
    >
      {posts.map((post) => {
        return <PostCard post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export const HomePostsInfiniteScroll = () => {
  const { data: postsResponse, fetchMore } = usePostsQuery({
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
  return <PostInfiniteScroll posts={posts} hasMore={hasMore} next={next} />;
};

export const CommunityPostsInfiniteScroll = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { data: postsResponse, fetchMore } = useCommunityPostsQuery({
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
  return <PostInfiniteScroll posts={posts} hasMore={hasMore} next={next} />;
};
