import { Box } from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserPosts } from "../../graphql/hooks/useUserPosts";
import UserPostCard, {
  LoadingUserPostCard,
} from "../post/userPost/UserPostCard";

interface UserPostsProps {
  userName: string;
}

const UserPostsContent = ({ userName }: UserPostsProps) => {
  const { posts, hasMore, next, loading } = useUserPosts(userName);

  if (!loading && !posts.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        hmm... looks like the user haven't posted anything yet
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
export default UserPostsContent;
