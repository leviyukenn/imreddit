import { useRouter } from "next/router";
import React from "react";
import { UserPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserPostsProps {}

const UserPostsContent = ({}: UserPostsProps) => {
  const router = useRouter();
  const userName =
    typeof router.query.userName === "string" ? router.query.userName : "";

  return userName ? <UserPostsInfiniteScroll userName={userName} /> : null;
};
export default UserPostsContent;
