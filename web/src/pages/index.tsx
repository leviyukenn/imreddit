import { Container } from "../components/default/Container";

import NavBar from "../components/NavBar";
import apolloClient from "../apollo-client/apollo-client";
import {
  Post,
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  usePostsQuery,
} from "../generated/graphql";
import { Box } from "@chakra-ui/react";

// export async function getServerSideProps() {
//   const { data } = await apolloClient.query<PostsQuery, PostsQueryVariables>({
//     query: PostsDocument,
//   });

//   return {
//     props: {
//       posts: data.posts as Post[],
//     },
//   };
// }

const Index = ({ posts }: { posts: Post[] }) => {
  // const { loading: postsLoading, error, data: postsResponse } = usePostsQuery({
  //   skip: typeof window === "undefined",
  // });
  // console.log(`loading:${postsLoading}`);
  // let body = null;
  // if (postsLoading) {
  //   body = <div>loading</div>;
  // } else {
  //   body = (
  //     <>
  //       {postsResponse?.posts.map((post) => {
  //         console.log(post);
  //         return <div key={post.id}>{post.title + "hello"}</div>;
  //       })}
  //     </>
  //   );
  // }

  return (
    <Container>
      <NavBar />

      {/* <Box w={200} h={400} bgColor="teal">
        {body}
      </Box> */}
    </Container>
  );
};

export default Index;
