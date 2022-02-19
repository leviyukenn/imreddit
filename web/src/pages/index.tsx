import ContentLayout from "../components/ContentLayout";
import HomeContainer from "../components/HomeContainer";
import CreatePostCard from "../components/post/CreatePostCard";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const Index = () => {
  const { isAuth } = useIsAuth();

  return (
    <HomeContainer>
      <ContentLayout>
        {isAuth ? <CreatePostCard /> : null}
        <HomePostsInfiniteScroll />
      </ContentLayout>
    </HomeContainer>
  );
};

export default Index;
