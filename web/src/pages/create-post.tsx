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
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import CreatePostForm from "../components/post/CreatePostForm";
import SelectCommunity from "../components/post/SelectCommunity";
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
      marginTop: "24px",
    },
  })
);

const CreatePost = () => {
  const classes = useStyles();

  //if not loged in, redirect to login page
  const { me, meLoading } = useIsAuth();
  const router = useRouter();
  useEffect(() => {
    if (!me && !meLoading) {
      router.push("/login");
    }
  }, [me, meLoading]);

  const [postType, setPostType] = useState<PostType>(PostType.TEXT_POST);
  const [communityId, setCommunityId] = useState<string>("");

  const handleChange = useCallback((_: any, value: PostType) => {
    setPostType(value);
  }, []);

  if (!me) {
    return null;
  }

  return (
    <Container>
      <Grid container justify="center" spacing={4}>
        <Grid item className={classes.mainContentHeart}>
          <SelectCommunity
            {...{ communityId, setCommunityId, userId: me.id }}
          />
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
              <CreatePostForm postType={postType} communityId={communityId} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreatePost;
