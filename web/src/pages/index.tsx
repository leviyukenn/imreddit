import { useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import CreatePostCard from "../components/post/CreatePostCard";
import PostDetailModal from "../components/post/PostDetailModal";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const Index = () => {
  const { isAuth } = useIsAuth();


  const MainContent = () => (
    <>
      {isAuth ? <CreatePostCard /> : null}

      <HomePostsInfiniteScroll />
      <PostDetailModal />
    </>
  );
  return <HomeLayout mainContent={<MainContent />} />;
};

export default Index;
