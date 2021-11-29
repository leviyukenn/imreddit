import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import client from "../../apollo-client/apollo-client";
import HomeContainer from "../../components/HomeLayout";
import PostDetail from "../../components/post/PostDetail";
import { CommunityPostsInfiniteScroll } from "../../components/post/PostInfiniteScroll";
import {
  AllPostsDocument,
  AllPostsQuery,
  CommunitiesDocument,
  CommunitiesQuery,
  CommunityDocument,
  CommunityQuery,
  PostDetailDocument,
  PostDetailQuery,
  usePostDetailQuery,
} from "../../generated/graphql";

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { allPosts: posts },
  } = await client.query<AllPostsQuery>({
    query: AllPostsDocument,
  });

  const {
    data: { communities },
  } = await client.query<CommunitiesQuery>({
    query: CommunitiesDocument,
  });
  // console.log("communities");
  // console.log(communities);

  const communityPaths = communities.map((community) => ({
    params: {
      postInfo: [community!.name],
    },
  }));
  const postPaths = posts.map((post) => ({
    params: {
      postInfo: [post.community.name, post.id],
    },
  }));

  // ...
  return { paths: [...communityPaths, ...postPaths], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [communityName, postId] = context.params!.postInfo as string[];
  let postQuery: PostDetailQuery | null = null;
  let communityQuery: CommunityQuery | null = null;

  if (communityName && postId) {
    let { data } = await client.query<PostDetailQuery>({
      query: PostDetailDocument,
      variables: { postId },
    });
    postQuery = data;
  }

  if (!postId && communityName) {
    const { data } = await client.query<CommunityQuery>({
      query: CommunityDocument,
      variables: { communityName },
    });

    communityQuery = data;
  }

  return {
    props: {
      postQuery,
      communityQuery,
    },
    revalidate: 10,
  };
};

// export async function getStaticProps({ params }) {
//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       post: {},
//     },
//   };
// }
interface CommunityPostHomeProps {
  postQuery: PostDetailQuery | null;
  communityQuery: CommunityQuery | null;
}

const CommunityPostHome = ({
  postQuery,
  communityQuery,
}: CommunityPostHomeProps) => {
  const router = useRouter();

  const postInfo = useMemo(() => (router.query.postInfo || []) as string[], [
    router,
  ]);

  const communityName = useMemo(() => postInfo[0] || "", [postInfo]);
  const postId = useMemo(() => postInfo[1] || "", [postInfo]);

  const modalPostId = useMemo(() => router.query.modalPostId || "", [router]);
  const serverSidePost = useMemo(() => postQuery?.postDetail, [postQuery]);

  const isPostDetailPage = useMemo(
    () => communityName && postId && !modalPostId,
    [postId, communityName, modalPostId]
  );

  const { data: postDetailResponse } = usePostDetailQuery({
    skip: typeof window === "undefined" || !isPostDetailPage,
    variables: { postId },
  });

  const clientSidePost = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  return (
    <HomeContainer>
      {isPostDetailPage ? (
        <PostDetail post={clientSidePost || serverSidePost || null} />
      ) : communityQuery?.community?.name ? (
        <CommunityPostsInfiniteScroll
          communityName={communityQuery.community.name}
        />
      ) : null}
    </HomeContainer>
  );
};

export default CommunityPostHome;

// const CommunityPostHome = () => {
//   const router = useRouter();

//   const communityName = useMemo(
//     () => ((router.query.postInfo as string[]) || [])[0] || "",
//     [router]
//   );
//   const postId = useMemo(
//     () => ((router.query.postInfo as string[]) || [])[1] || "",
//     [router]
//   );

//   const modalPostId = useMemo(() => router.query.postId || "", [router]);

//   const isPostDetailPage = useMemo(
//     () => postId && communityName && !modalPostId,
//     [postId, communityName, modalPostId]
//   );

//   return (
//     <HomeContainer>
//       {isPostDetailPage ? (
//         <PostDetail postId={postId} />
//       ) : communityName ? (
//         <CommunityPostsInfiniteScroll communityName={communityName} />
//       ) : null}
//     </HomeContainer>
//   );
// };

// export default CommunityPostHome;
