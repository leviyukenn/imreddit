import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { SERVER_URL } from "../../../const/const";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageDropZoneTitle: {
      color: "#878a8c",
    },
    preview: {
      position: "relative",
      height: 100,
      width: "100%",
      margin: "0.25rem 0",
      backgroundColor: "#f6f7f8",
      border: "1px solid #edeff1",
      borderRadius: "4px",
      backgroundPosition: "50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    deleteBar: {
      width: "100%",
      position: "absolute",
      backgroundColor: "rgba(28,28,28,.9)",
      bottom: 0,
      left: 0,
      padding: "0.25rem",
      textAlign: "right",
    },
    deleteIcon: {
      color: "#fff",
    },
  })
);

interface CommunityImagePreviewProps {
  uploadedImagePath: string;
  setUploadedImagePath: (path: string) => void;
}
const CommunityImagePreview = ({
  uploadedImagePath,
  setUploadedImagePath,
}: CommunityImagePreviewProps) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.preview}
      style={{ backgroundImage: `url(${SERVER_URL + uploadedImagePath})` }}
    >
      <Box className={classes.deleteBar}>
        <IconButton
          size="small"
          onClick={() => {
            setUploadedImagePath("");
          }}
        >
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default CommunityImagePreview;
