import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { SERVER_URL } from "../../const/const";
import DefaultCommunityIcon from "../utility/DefaultCommunityIcon";

interface CommunityIconProps {
  icon: string;
  size: "small" | "medium" | "large";
}

const useImageStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: 20,
      height: 20,
      backgroundColor: "rgb(0 121 211)",
      borderRadius: "100%",
    },
    medium: {
      borderRadius: "100%",
      border: "4px solid #fff",
      height: "56px",
      width: "56px",
      background: "#0E75D2",
    },
    large: {
      borderRadius: "100%",
      border: "4px solid #fff",
      height: "72px",
      width: "72px",
      background: "#0E75D2",
    },
  })
);

const useDefaultIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      height: 20,
      width: 20,
      boxSizing: "border-box",
      background: "#ffffff",
      display: "inline-block",
      fill: "#0079d3",
    },
    medium: {
      borderRadius: "100%",
      border: "4px solid #fff",
      height: "72px",
      width: "72px",
      boxSizing: "border-box",
      background: "#ffffff",
      display: "inline-block",
      fill: "#0079d3",
    },
    large: {
      borderRadius: "100%",
      border: "4px solid #fff",
      height: "56px",
      width: "56px",
      boxSizing: "border-box",
      background: "#ffffff",
      display: "inline-block",
      fill: "#0079d3",
    },
  })
);
const CommunityIcon = ({ icon, size }: CommunityIconProps) => {
  const imageClasses = useImageStyles();
  const iconClasses = useDefaultIconStyles();

  return icon ? (
    <img src={SERVER_URL + icon} className={imageClasses[size]} />
  ) : (
    <DefaultCommunityIcon className={iconClasses[size]} />
  );
};
export default CommunityIcon;
