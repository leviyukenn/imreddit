import { createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Container from "../components/Container";
import CreatePostCard from "../components/post/CreatePostCard";
import { LoadingPostCard, PostCard } from "../components/post/PostCard";
import PostDetailModal from "../components/post/PostDetailModal";
import { RegularPostFragment, usePostsQuery } from "../generated/graphql";

// export async function getServerSideProps() {
//   const { data } = await apolloClient.query<PostsQuery, PostsQueryVariables>({
//     query: PostsDocument,
//   });
//   console.log(data);
//   return {
//     props: {
//       posts: data.posts as Post[],
//     },
//   };
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      maxWidth: "740px",
      width: "calc(100% - 32px)",
    },
    backToTopButton: {
      position: "sticky",
      top: "calc(100vh - 80px)",
      right: 0,
    },
  })
);

const Index = () => {
  const classes = useStyles();
  const {
    loading: postsLoading,
    error,
    data: postsResponse,
    fetchMore,
  } = usePostsQuery({
    skip: typeof window === "undefined",
    variables: { limit: 10 },
  });

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const posts: RegularPostFragment[] = useMemo(
    () => (postsResponse ? postsResponse.posts.posts : []),
    [postsResponse]
  );

  const hasMore = useMemo(
    () => (postsResponse ? postsResponse.posts.hasMore : false),
    [postsResponse]
  );

  return (
    <Container>
      <Grid item className={classes.mainContentHeart}>
        <CreatePostCard />
        <InfiniteScroll
          dataLength={posts.length || 0}
          next={() => {
            fetchMore({
              variables: {
                limit: 10,
                cursor: posts[posts.length - 1].createdAt,
              },
            });
          }}
          hasMore={hasMore}
          loader={<LoadingPostCard />}
        >
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </InfiniteScroll>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        onClick={backToTop}
        className={classes.backToTopButton}
      >
        <NavigationIcon />
        Back to Top
      </Fab>
      <PostDetailModal />
    </Container>
  );
};

export default Index;
