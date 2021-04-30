import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "../components/Container";
import CreatePostCard from "../components/post/CreatePostCard";
import PostCard from "../components/post/PostCard";
import { usePostsQuery } from "../generated/graphql";

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
      width: theme.spacing(80),
    },
  })
);

// { posts }: { posts: Post[] }
const Index = () => {
  const classes = useStyles();
  const { loading: postsLoading, error, data: postsResponse } = usePostsQuery({
    skip: typeof window === "undefined",
  });

  return (
    <Container>
      <Grid item className={classes.mainContentHeart}>
        <CreatePostCard />
        {postsResponse?.posts.map((post) => {
          return <PostCard post={post} key={post.id}></PostCard>;
        })}
      </Grid>
    </Container>
  );
};

export default Index;
