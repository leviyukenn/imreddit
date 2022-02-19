import {
  Button,
  ButtonProps,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

interface ToolBarButtonProps extends ButtonProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      lineHeight: "1.5rem",
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "#9b9b9b",
      borderRadius: 4,
      textTransform: "none",
    },
  })
);

const ToolBarButton = ({ children, ...props }: ToolBarButtonProps) => {
  const classes = useStyles();
  return (
    <Button classes={{ root: classes.button }} {...props}>
      {children}
    </Button>
  );
};
export default ToolBarButton;
