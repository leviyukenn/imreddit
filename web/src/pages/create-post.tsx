import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import Container from "../components/Container";
import CreatePostForm from "../components/post/CreatePostForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      width: theme.spacing(80),
    },
  })
);

const CreatePost = () => {
  const classes = useStyles();
  return (
    <Container>
      <Grid item className={classes.mainContentHeart}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              create post
            </Typography>
            <CreatePostForm></CreatePostForm>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};
export default CreatePost;
