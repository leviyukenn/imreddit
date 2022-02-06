import { useRouter } from "next/router";
import React from "react";
import { UserCommentedPostsInfiniteScroll } from "../post/PostInfiniteScroll";

interface UserCommentsProps {}

const UserCommentsContent = ({}: UserCommentsProps) => {
  const router = useRouter();
  const userName =
    typeof router.query.userName === "string" ? router.query.userName : "";

  return userName ? (
    <UserCommentedPostsInfiniteScroll userName={userName} />
  ) : null;
};
export default UserCommentsContent;
