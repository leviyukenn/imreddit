import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { createPostLink } from "../../../utils/links";

interface CreatePostCardProps {
  avatar: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: theme.spacing(2),
      borderRadius: 4,
      border: "1px solid #ccc",
      padding: 12,
    },
    textField: {
      height: 38,
    },
    smallAvatar: {
      width: 38,
      height: 38,
      marginRight: theme.spacing(1),
    },
    content: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const CreatePostCard = ({ avatar }: CreatePostCardProps) => {
  const classes = useStyles();
  const router = useRouter();

  const goToCreatePost = useCallback(() => {
    router.push(createPostLink);
  }, [router]);

  return (
    <Box className={classes.root}>
      <img className={classes.smallAvatar} src={avatar} />
      <TextField
        label="create post"
        variant="outlined"
        fullWidth
        size="small"
        className={classes.textField}
        onFocus={goToCreatePost}
      />
    </Box>
  );
};
export default CreatePostCard;
