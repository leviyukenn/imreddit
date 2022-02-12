import { Box } from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserCommentedPosts } from "../../graphql/hooks/useUserCommentedPosts";
import UserCommentedPostCard from "../post/userPost/UserCommentedPostCard";
import { LoadingUserPostCard } from "../post/userPost/UserPostCard";

interface UserCommentsProps {
  userName: string;
}

const UserCommentsContent = ({ userName }: UserCommentsProps) => {
  const { posts, hasMore, next, loading } = useUserCommentedPosts(userName);
  if (!loading && !posts.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        hmm... looks like the user haven't commented anything yet
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
export default UserCommentsContent;
