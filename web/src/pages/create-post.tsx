import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Container from "../components/Container";
import CreatePostForm from "../components/post/CreatePostForm";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      maxWidth: "740px",
      width: "100%",
    },
    createPostCard: {
      overflow: "visible",
    },
  })
);

const CreatePost = () => {
  const classes = useStyles();
  const { checkIsAuth } = useIsAuth();

  useEffect(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  return (
    <Container>
      <Grid item className={classes.mainContentHeart}>
        <Card className={classes.createPostCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              create post
            </Typography>
            <CreatePostForm />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};
export default CreatePost;
