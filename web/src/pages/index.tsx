import { useEffect } from "react";
import HomeContainer from "../components/HomeContainer";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";

const Index = () => {
  useEffect(() => console.log("mount"), []);

  return (
    <HomeContainer>
      <HomePostsInfiniteScroll />
    </HomeContainer>
  );
};

export default Index;
