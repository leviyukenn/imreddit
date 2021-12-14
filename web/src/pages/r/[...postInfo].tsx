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
  useCommunityQuery,
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
  let postDetail: PostDetailQuery["postDetail"] = null;
  let community: CommunityQuery["community"] = null;

  if (communityName && postId) {
    let { data } = await client.query<PostDetailQuery>({
      query: PostDetailDocument,
      variables: { postId },
    });
    postDetail = data.postDetail;
  }

  if (!postId && communityName) {
    const { data } = await client.query<CommunityQuery>({
      query: CommunityDocument,
      variables: { communityName },
    });

    community = data.community;
  }

  return {
    props: {
      postDetail,
      community,
    },
    revalidate: 10,
  };
};

interface CommunityPostHomeProps {
  postDetail: PostDetailQuery["postDetail"];
  community: CommunityQuery["community"];
}

const useClientCommunityPost = () => {
  const router = useRouter();

  const postInfo = useMemo(() => (router.query.postInfo || []) as string[], [
    router,
  ]);

  const communityName = useMemo(() => postInfo[0] || "", [postInfo]);
  const postId = useMemo(() => postInfo[1] || "", [postInfo]);
  const modalPostId = useMemo(() => router.query.modalPostId || "", [router]);

  const isPostDetailPage = useMemo(
    () => !!(communityName && postId && !modalPostId),

    [postId, communityName, modalPostId]
  );
  const { data: postDetailResponse } = usePostDetailQuery({
    skip: typeof window === "undefined" || !isPostDetailPage,
    variables: { postId },
  });

  const clientSidePost = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const { data: communityResponse } = useCommunityQuery({
    skip: typeof window === "undefined" || isPostDetailPage,
    variables: { communityName },
  });

  const clientSideCommunity = useMemo(() => communityResponse?.community, [
    communityResponse,
  ]);

  return { isPostDetailPage, clientSidePost, clientSideCommunity };
};

const CommunityPostHome = ({
  postDetail: serverSidePost,
  community: serverSideCommunity,
}: CommunityPostHomeProps) => {
  const {
    clientSidePost,
    clientSideCommunity,
    isPostDetailPage,
  } = useClientCommunityPost();

  return (
    <HomeContainer>
      {isPostDetailPage ? (
        <PostDetail post={clientSidePost || serverSidePost} />
      ) : clientSideCommunity || serverSideCommunity ? (
        <CommunityPostsInfiniteScroll
          communityName={
            (clientSideCommunity?.name || serverSideCommunity?.name)!
          }
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
