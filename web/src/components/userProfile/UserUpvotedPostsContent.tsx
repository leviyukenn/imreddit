import { Box } from "@material-ui/core";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserUpvotedPosts } from "../../graphql/hooks/useUserUpvotedPosts";
import UserPostCard, {
  LoadingUserPostCard,
} from "../post/userPost/UserPostCard";

export enum UpvoteType {
  DOWNVOTE,
  UPVOTE,
}

interface UserUpvotedPostsContentProps {
  userName: string;
  upvoteType: UpvoteType;
}

const UserUpvotedPostsContent = ({
  userName,
  upvoteType,
}: UserUpvotedPostsContentProps) => {
  const { posts, hasMore, next, loading } = useUserUpvotedPosts(
    userName,
    upvoteType
  );
  if (!loading && !posts.length) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {`hmm... looks like you haven't ${
          upvoteType ? "upvoted" : "downvoted"
        } anything yet`}
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
export default UserUpvotedPostsContent;
