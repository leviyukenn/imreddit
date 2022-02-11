import React from "react";
import { UserPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserPostsProps {
  userName: string;
}

const UserPostsContent = ({ userName }: UserPostsProps) => {
  return <UserPostsInfiniteScroll userName={userName} />;
};
export default UserPostsContent;
