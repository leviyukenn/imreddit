import InfiniteScroll from "react-infinite-scroll-component";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useCommunityPosts } from "../../graphql/hooks/useCommunityPosts";
import { useHomePosts } from "../../graphql/hooks/useHomePosts";
import { useUserCommentedPosts } from "../../graphql/hooks/useUserCommentedPosts";
import { useUserPosts } from "../../graphql/hooks/useUserPosts";
import { useUserUpvotedPosts } from "../../graphql/hooks/useUserUpvotedPosts";
import { LoadingPostCard, PostCard } from "./postCard/PostCard";
import UserCommentedPostCard from "./userPost/UserCommentedPostCard";
import UserPostCard, { LoadingUserPostCard } from "./userPost/UserPostCard";

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
  const { posts, hasMore, next, loading } = useHomePosts();
  return (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );
};

export const UserPostsInfiniteScroll = ({ userName }: { userName: string }) => {
  const { posts, hasMore, next } = useUserPosts(userName);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingUserPostCard />}
    >
      {posts.map((post) => {
        return <UserPostCard post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export const UserUpvotedPostsInfiniteScroll = ({
  userName,
}: {
  userName: string;
}) => {
  const { posts, hasMore, next } = useUserUpvotedPosts(userName, 1);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingUserPostCard />}
    >
      {posts.map((post) => {
        return <UserPostCard post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export const UserDownvotedPostsInfiniteScroll = ({
  userName,
}: {
  userName: string;
}) => {
  const { posts, hasMore, next } = useUserUpvotedPosts(userName, 0);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingUserPostCard />}
    >
      {posts.map((post) => {
        return <UserPostCard post={post} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};

export const UserCommentedPostsInfiniteScroll = ({
  userName,
}: {
  userName: string;
}) => {
  const { posts, hasMore, next } = useUserCommentedPosts(userName);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingUserPostCard />}
    >
      {posts.map((post) => {
        return (
          <UserCommentedPostCard
            userName={userName}
            post={post}
            key={post.id}
          />
        );
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
  return (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );
};
