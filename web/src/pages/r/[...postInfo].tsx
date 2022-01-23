import { GetStaticPaths, GetStaticProps } from "next";
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
import { usePostInfoRoute } from "../../utils/hooks/usePostInfoRoute";

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

const CommunityPostHome = ({
  postDetail: serverSidePost,
  community: serverSideCommunity,
}: CommunityPostHomeProps) => {
  const { isPostDetailPage, postId, communityName } = usePostInfoRoute();

  return (
    <CommunityHomePage
      communityName={communityName}
      serverSideCommunity={serverSideCommunity}
    >
      {isPostDetailPage ? (
        <PostDetailPage postId={postId} serverSidePost={serverSidePost} />
      ) : communityName ? (
        <CommunityHomeHeartContent communityName={communityName} />
      ) : null}
    </CommunityHomePage>
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
