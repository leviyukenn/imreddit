import InfiniteScroll from "react-infinite-scroll-component";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useCommunityPosts } from "../../graphql/hooks/useCommunityPosts";
import { useHomePosts } from "../../graphql/hooks/useHomePosts";
import { LoadingPostCard, PostCard } from "./postCard/PostCard";
import { OrderType } from "../../graphql/types/types";

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
  const { posts, hasMore, next, loading } = useHomePosts(OrderType.NEW);
  return (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );
};

export const CommunityPostsInfiniteScroll = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { posts, hasMore, next, loading } = useCommunityPosts(communityName);
  return (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );
};
