import {
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Tooltip,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { Field, Form, Formik } from "formik";
import React, { useCallback, useRef, useState } from "react";
import * as Yup from "yup";
import { SmallTextInputField } from "../../../InputField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      width: "370px",
      padding: "16px",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    formContainer: {
      width: "calc(100% - 16px)",
    },
    formItem: {
      width: "100%",
    },
    formButton: {
      borderRadius: "9999px",
    },
  })
);

interface LinkFormProps {
  onChange: (
    action: string,
    title: string,
    target: string,
    targetOption: string
  ) => void;
  title: string;
  target: string;
}

type FormData = {
  title: string;
  target: string;
};

const LinkForm = (props: LinkFormProps) => {
  const { onChange, title, target } = props;
  const addLink = useCallback(
    (values: FormData) => {
      onChange("link", values.title, values.target, "_blank");
    },
    [onChange]
  );
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ title, target }}
      validationSchema={Yup.object({
        target: Yup.string()
          .matches(
            /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
            "Link doesn't look right"
          )
          .required("Link doesn't look right"),
      })}
      onSubmit={addLink}
    >
      {({ submitForm, isSubmitting }) => (
        <Form
          className={classes.form}
          onClick={(event) => event.stopPropagation()}
        >
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.formContainer}
            spacing={1}
          >
            <Grid item className={classes.formItem}>
              <Field
                component={SmallTextInputField}
                name="title"
                type="text"
                label="LINK TITLE"
                placeholder="Title of Link(Optional)"
              />
            </Grid>
            <Grid item className={classes.formItem}>
              <Field
                component={SmallTextInputField}
                type="text"
                label="LINK TARGET"
                name="target"
                placeholder="Paste or type a link"
              />
            </Grid>
            <Grid
              item
              container
              justify="flex-end"
              className={classes.formItem}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                size="small"
                className={classes.formButton}
              >
                Insert
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

interface LinkComponentProps {
  onChange: (
    action: string,
    title: string,
    target: string,
    targetOption: string
  ) => void;
  onExpandEvent: () => void;
  currentState: {
    link?: { title: string; target: string };
    selectionText: string;
  };
  expanded?: boolean;
}

const LinkComponent = (props: LinkComponentProps) => {
  const { onChange, onExpandEvent, currentState, expanded } = props;
  const [showModal, setShowModal] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkTarget, setLinkTarget] = useState("");

  const signalExpandShowModal = useCallback(() => {
    const { link, selectionText } = currentState;

    onExpandEvent();

    setShowModal(true);
    setLinkTitle(link?.title || selectionText || "");
    setLinkTarget(link?.target || "");
  }, [currentState, onExpandEvent]);

  const anchorRef = useRef();
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Link">
        <IconButton
          onClick={signalExpandShowModal}
          aria-haspopup="true"
          aria-expanded={showModal}
          buttonRef={anchorRef}
        >
          <LinkIcon />
        </IconButton>
      </Tooltip>
      <Popover
        classes={{ paper: classes.popover }}
        open={!!expanded && showModal}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <LinkForm onChange={onChange} title={linkTitle} target={linkTarget} />
      </Popover>
    </>
  );
};

export default LinkComponent;
