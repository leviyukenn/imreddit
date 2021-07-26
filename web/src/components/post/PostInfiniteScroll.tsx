import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  RegularPostDetailFragment,
  useCommunityPostsQuery,
  usePostsQuery,
} from "../../generated/graphql";
import CreatePostCard from "./CreatePostCard";
import { LoadingPostCard, PostCard } from "./PostCard";
import PostDetailModal from "./PostDetailModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      maxWidth: "740px",
      width: "calc(100% - 32px)",
      padding: "16px",
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      right: 0,
    },
  })
);

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
  const classes = useStyles();

  return (
    <>
      <Box className={classes.mainContentHeart}>
        <CreatePostCard />
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
      </Box>
      <PostDetailModal />
    </>
  );
};

export const HomePostsInfiniteScroll = () => {
  const {
    loading: postsLoading,
    error,
    data: postsResponse,
    fetchMore,
  } = usePostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10 },
  });
  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.posts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.posts.hasMore : false),
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
  const {
    loading: postsLoading,
    error,
    data: postsResponse,
    fetchMore,
  } = useCommunityPostsQuery({
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
