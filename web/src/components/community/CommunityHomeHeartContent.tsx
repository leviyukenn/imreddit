import React, { useState } from "react";
import { OrderType } from "../../graphql/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import CreatePostCard from "../post/createPost/CreatePostCard";
import { CommunityPostsInfiniteScroll } from "../post/PostInfiniteScroll";
import PostOrderTypeTabs from "../post/PostOrderTypeTabs";

const CommunityHomeHeartContent = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { me } = useIsAuth();
  const [orderType, setOrderType] = useState<OrderType>(OrderType.NEW);
  const Scroll = () => {
    return (
      <CommunityPostsInfiniteScroll
        communityName={communityName}
        orderType={orderType}
      />
    );
  };
  return (
    <>
      {me ? <CreatePostCard avatar={me.avatar} /> : null}
      <PostOrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
      <Scroll />
    </>
  );
};

export default CommunityHomeHeartContent;
