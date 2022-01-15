import ContentLayout from "../components/ContentLayout";
import HomeContainer from "../components/HomeContainer";
import CreatePostCard from "../components/post/CreatePostCard";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const Index = () => {
  const { isAuth } = useIsAuth();

  const MainContent = () => (
    <>
      {isAuth ? <CreatePostCard /> : null}

      <HomePostsInfiniteScroll />
    </>
  );
  return (
    <HomeContainer>
      <ContentLayout mainContent={<MainContent />} />
    </HomeContainer>
  );
};

export default Index;
