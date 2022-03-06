import { useState } from "react";
import { OrderType } from "../../graphql/types/types";
import { SearchPostsInfiniteScroll } from "../post/PostInfiniteScroll";
import PostOrderTypeTabs from "../post/PostOrderTypeTabs";

interface SearchPostsProps {
  keyword: string;
  communityName?: string;
}

const SearchPostsContent = ({ keyword, communityName }: SearchPostsProps) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.NEW);
  const Scroll = () => {
    return (
      <SearchPostsInfiniteScroll keyword={keyword} orderType={orderType} communityName={communityName}/>
    );
  };
  return (
    <>
      <PostOrderTypeTabs orderType={orderType} setOrderType={setOrderType} />
      <Scroll />
    </>
  );
};
export default SearchPostsContent;
