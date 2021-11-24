import { useRouter } from "next/router";
import { useMemo } from "react";
import HomeContainer from "../../components/HomeContainer";
import PostDetail from "../../components/post/PostDetail";

const PostDetailPage = () => {
  const router = useRouter();

  const communityName = useMemo(
    () => ((router.query.postInfo as string[]) || [])[0] || "",
    [router]
  );
  const postId = useMemo(
    () => ((router.query.postInfo as string[]) || [])[1] || "",
    [router]
  );

  return (
    <HomeContainer>
      {postId && communityName ? <PostDetail postId={postId} /> : null}
    </HomeContainer>
  );
};

export default PostDetailPage;
