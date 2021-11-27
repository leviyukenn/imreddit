import HomeLayout from "../components/HomeLayout";
import { HomePostsInfiniteScroll } from "../components/post/PostInfiniteScroll";

const Index = () => {
  return (
    <HomeLayout>
      <HomePostsInfiniteScroll />
    </HomeLayout>
  );
};

export default Index;
