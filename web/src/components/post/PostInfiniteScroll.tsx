import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useCommunityPosts } from "../../graphql/hooks/useCommunityPosts";
import { useHomePosts } from "../../graphql/hooks/useHomePosts";
import { OrderType } from "../../graphql/types/types";
import { LoadingPostCard, PostCard } from "./postCard/PostCard";

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
  // console.log({ posts, hasMore });
  useEffect(() => {
    console.log("mountInfiniteScroll");
    return () => {
      console.log("unmountInfiniteScroll");
    };
  }, []);
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

export const HomePostsInfiniteScroll = ({
  orderType,
}: {
  orderType: OrderType;
}) => {
  const { posts, hasMore, next, loading } = useHomePosts(orderType);
  const postInfiniteScroll = (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );

  return postInfiniteScroll;
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
