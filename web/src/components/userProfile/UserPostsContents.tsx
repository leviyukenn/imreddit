import React, { useState } from "react";
import { OrderType } from "../../graphql/types/types";
import { UserPostsInfiniteScroll } from "../post/PostInfiniteScroll";
import PostOrderTypeTabs from "../post/PostOrderTypeTabs";

interface UserPostsProps {
  userName: string;
}

const UserPostsContent = ({ userName }: UserPostsProps) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.NEW);
  const Scroll = () => {
    return (
      <UserPostsInfiniteScroll userName={userName} orderType={orderType} />
    );
  };
  return (
    <>
      <PostOrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
      <Scroll />
    </>
  );
};
export default UserPostsContent;
