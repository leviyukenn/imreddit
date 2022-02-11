import React from "react";
import { UserUpvotedPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserUpvotedPostsContentProps {
  userName: string;
}

const UserUpvotedPostsContent = ({
  userName,
}: UserUpvotedPostsContentProps) => {
  return <UserUpvotedPostsInfiniteScroll userName={userName} />;
};
export default UserUpvotedPostsContent;
