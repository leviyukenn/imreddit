import ContentLayout from "../components/ContentLayout";
import HomeContainer from "../components/HomeContainer";
import CreatePostCard from "../components/post/createPost/CreatePostCard";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data: meResponse } = useMeQuery();

  return (
    <HomeContainer>
      <ContentLayout>
        {meResponse?.me ? (
          <CreatePostCard avatar={meResponse.me.avatar} />
        ) : null}
        <HomePostsInfiniteScroll />
      </ContentLayout>
    </HomeContainer>
  );
};

export default Index;
