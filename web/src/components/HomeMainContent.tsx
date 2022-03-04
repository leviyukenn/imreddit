import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { OrderType } from "../graphql/types/types";
import CreatePostCard from "./post/createPost/CreatePostCard";
import { HomePostsInfiniteScroll } from "./post/PostInfiniteScroll";
import PostOrderTypeTabs from "./post/PostOrderTypeTabs";

interface HomeMainContentProps {}

const HomeMainContent = ({}: HomeMainContentProps) => {
  const { data: meResponse } = useMeQuery();

  const [orderType, setOrderType] = useState<OrderType>(OrderType.NEW);
  const Scroll = () => {
    return <HomePostsInfiniteScroll orderType={orderType} />;
  };
  return (
    <>
      {meResponse?.me ? <CreatePostCard avatar={meResponse.me.avatar} /> : null}
      <PostOrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
      {<Scroll />}
    </>
  );
};
export default HomeMainContent;
