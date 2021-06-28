import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import CreatePostForm from "../components/post/CreatePostForm";
import { PostType } from "../components/types/types";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContentHeart: {
      marginTop: "24px",
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

  const [postType, setPostType] = useState<PostType>(PostType.TEXT_POST);

  const handleChange = useCallback((_: any, value: PostType) => {
    setPostType(value);
  }, []);

  return (
    <Container>
      <Grid container justify="center" spacing={4}>
        <Grid item className={classes.mainContentHeart}>
          <Card className={classes.createPostCard}>
            <CardContent>
              <Tabs
                value={postType}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon label tabs example"
              >
                <Tab
                  icon={<DescriptionOutlinedIcon />}
                  label="Posts"
                  value={PostType.TEXT_POST}
                />
                <Tab
                  icon={<ImageOutlinedIcon />}
                  label="Images"
                  value={PostType.IMAGE_POST}
                />
              </Tabs>
              <CreatePostForm postType={postType} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreatePost;
