import React from "react";
import { UserCommentedPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserCommentsProps {
  userName: string;
}

const UserCommentsContent = ({ userName }: UserCommentsProps) => {
  return <UserCommentedPostsInfiniteScroll userName={userName} />;
};
export default UserCommentsContent;
