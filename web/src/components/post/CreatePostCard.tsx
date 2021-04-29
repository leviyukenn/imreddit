import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface CreatePostCardProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    textField: {
      height: theme.spacing(5),
    },
  })
);

const CreatePostCard = ({}: CreatePostCardProps) => {
  const classes = useStyles();
  const router = useRouter();

  const goToCreatePost = useCallback(() => {
    router.push("/create-post");
  }, [router]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          label="create post"
          variant="outlined"
          fullWidth
          size="small"
          className={classes.textField}
          onFocus={goToCreatePost}
        />
      </CardContent>
    </Card>
  );
};
export default CreatePostCard;
