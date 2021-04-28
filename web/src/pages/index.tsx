import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      backgroundColor: theme.palette.background.default,
    },
  })
);
// { posts }: { posts: Post[] }
const Index = () => {
  const classes = useStyles();
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
    <Grid
      container
      direction="column"
      justify="flex-start"
      className={classes.root}
    >
      <NavBar />

      {/* <Box w={200} h={400} bgColor="teal">
        {body}
      </Box> */}
    </Grid>
  );
};

export default Index;
