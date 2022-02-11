import React from "react";
import { UserDownvotedPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserDownvotedPostsContentProps {
  userName: string;
}

const UserDownvotedPostsContent = ({
  userName,
}: UserDownvotedPostsContentProps) => {
  return <UserDownvotedPostsInfiniteScroll userName={userName} />;
};
export default UserDownvotedPostsContent;
