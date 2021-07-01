import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  RegularPostDetailFragment,
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
  communityName?: string;
}

const PostInfiniteScroll = ({ communityName }: PostInfiniteScrollProps) => {
  const classes = useStyles();
  console.log(communityName);
  const {
    loading: postsLoading,
    error,
    data: postsResponse,
    fetchMore,
  } = usePostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10, communityName: communityName },
  });

  const posts: RegularPostDetailFragment[] = useMemo(
    () => (postsResponse ? postsResponse.posts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.posts.hasMore : false),
    [postsResponse]
  );

  return (
    <>
      <Box className={classes.mainContentHeart}>
        <CreatePostCard />
        <InfiniteScroll
          dataLength={posts.length || 0}
          next={() => {
            fetchMore({
              variables: {
                limit: 10,
                cursor: posts[posts.length - 1].createdAt,
                communityName: communityName,
              },
            });
          }}
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

export default PostInfiniteScroll;
