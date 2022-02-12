import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";

interface TextPostContentProps {
  title: string;
  text: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textPostContent: {
      position: "relative",
      maxHeight: "300px",
      overflow: "hidden",
    },
    addMask: {
      "&::after": {
        content: '""',
        background: " linear-gradient(rgba(255, 255, 255, 0.001),white)",
        position: "absolute",
        bottom: 0,
        height: "60px",
        width: "100%",
      },
    },
  })
);

const TextPostContent = ({ text, title }: TextPostContentProps) => {
  const classes = useStyles();
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldAddMask, setShouldAddMask] = useState(false);
  useEffect(() => {
    setShouldAddMask((contentRef.current?.clientHeight || 0) >= 300);
  }, [contentRef.current]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div
        className={`${classes.textPostContent} ${
          shouldAddMask ? classes.addMask : ""
        }`}
        ref={contentRef}
      >
        <Box
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        ></Box>
      </div>
    </Box>
  );
};
export default TextPostContent;
