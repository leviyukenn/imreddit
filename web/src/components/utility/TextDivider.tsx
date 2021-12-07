import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface DividerProps {
  text: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 280,
    },
    title: {
      marginBottom: "3rem",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      margin: "1.5rem 0",
    },
    dividerLine: {
      borderTop: "1px solid #a5a4a4",
      width: "40%",
    },
    dividerText: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "18px",
      color: "#878a8c",
    },
  })
);

const TextDivider = ({ text }: DividerProps) => {
  const classes = useStyles();
  return (
    <div className={classes.divider}>
      <span className={classes.dividerLine}></span>
      <span className={classes.dividerText}>{text}</span>
      <span className={classes.dividerLine}></span>
    </div>
  );
};
export default TextDivider;
