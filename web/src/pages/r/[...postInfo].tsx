import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import client from "../../apollo-client/apollo-client";
import CommunityHomeHeartContent from "../../components/community/CommunityHomeHeartContent";
import CommunityHomePage from "../../components/community/CommunityHomePage";
import PostDetailPage from "../../components/post/PostDetailPage";
import {
  AllPostsDocument,
  AllPostsQuery,
  CommunitiesDocument,
  CommunitiesQuery,
  CommunityDocument,
  CommunityQuery,
  PostDetailDocument,
  PostDetailQuery,
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

const useIsPostDetailPage = () => {
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

  return { isPostDetailPage, postId, communityName };
};

const CommunityPostHome = ({
  postDetail: serverSidePost,
  community: serverSideCommunity,
}: CommunityPostHomeProps) => {
  const { isPostDetailPage, postId, communityName } = useIsPostDetailPage();

  return (
    <>
      {isPostDetailPage ? (
        <CommunityHomePage
          communityName={communityName}
          serverSideCommunity={serverSideCommunity}
        >
          <PostDetailPage postId={postId} serverSidePost={serverSidePost} />
        </CommunityHomePage>
      ) : communityName ? (
        <CommunityHomePage
          communityName={communityName}
          serverSideCommunity={serverSideCommunity}
        >
          <CommunityHomeHeartContent communityName={communityName} />
        </CommunityHomePage>
      ) : null}
    </>
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
