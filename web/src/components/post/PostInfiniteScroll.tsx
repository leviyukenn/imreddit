import { Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { RegularPostDetailFragment } from "../../generated/graphql";
import { useCommunityPosts } from "../../graphql/hooks/useCommunityPosts";
import { useHomePosts } from "../../graphql/hooks/useHomePosts";
import { useSearchPosts } from "../../graphql/hooks/useSearchPosts";
import { useUserPosts } from "../../graphql/hooks/useUserPosts";
import { OrderType } from "../../graphql/types/types";
import { LoadingPostCard, PostCard } from "./postCard/PostCard";
import SearchPostCard, {
  LoadingSearchPostCard,
} from "./searchPosts/SearchPostCard";
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
  orderType,
}: {
  communityName: string;
  orderType: OrderType;
}) => {
  const { posts, hasMore, next, loading } = useCommunityPosts(
    communityName,
    orderType
  );
  return (
    <PostInfiniteScroll
      posts={posts}
      hasMore={hasMore && !loading}
      next={next}
    />
  );
};

export const UserPostsInfiniteScroll = ({
  userName,
  orderType,
}: {
  userName: string;
  orderType: OrderType;
}) => {
  const { posts, hasMore, next, loading } = useUserPosts(userName, orderType);
  if (!loading && !posts.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        hmm... looks like there is no post here.
      </Box>
    );
  }
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

export const SearchPostsInfiniteScroll = ({
  keyword,
  orderType,
  communityName,
}: {
  keyword: string;
  orderType: OrderType;
  communityName?: string;
}) => {
  const { posts, hasMore, next, loading } = useSearchPosts(
    keyword,
    orderType,
    communityName
  );
  if (!loading && !posts.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        hmm... looks like there is no post here.
      </Box>
    );
  }
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={next}
      hasMore={hasMore}
      loader={<LoadingSearchPostCard />}
    >
      {posts.map((post) => {
        return <SearchPostCard post={post} keyword={keyword} key={post.id} />;
      })}
    </InfiniteScroll>
  );
};
