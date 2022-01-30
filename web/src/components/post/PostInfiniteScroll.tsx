import InfiniteScroll from "react-infinite-scroll-component";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useCommunityPosts } from "../../graphql/hooks/useCommunityPosts";
import { useHomePosts } from "../../graphql/hooks/useHomePosts";
import { useUserPosts } from "../../graphql/hooks/useUserPosts";
import { LoadingPostCard, PostCard } from "./PostCard";
import UserPostCard from "./userPost/UserPostCard";

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
  const { posts, hasMore, next } = useHomePosts();
  return <PostInfiniteScroll posts={posts} hasMore={hasMore} next={next} />;
};

export const UserPostsInfiniteScroll = ({ userName }: { userName: string }) => {
  const { posts, hasMore, next } = useUserPosts(userName);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingPostCard />}
    >
      {posts.map((post) => {
        return <UserPostCard post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export const CommunityPostsInfiniteScroll = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { posts, hasMore, next, loading } = useCommunityPosts(communityName);
  return <PostInfiniteScroll posts={posts} hasMore={hasMore} next={next} />;
};
