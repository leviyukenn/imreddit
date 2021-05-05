import { useRouter } from "next/router";
import React from "react";
import Container from "../../components/Container";
import PostDetail from "../../components/post/PostDetail";

const PostDetailPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Container>
      <PostDetail postId={router.query.postId as string} />
    </Container>
  );
};
export default PostDetailPage;
