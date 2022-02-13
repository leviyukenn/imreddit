import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import { useCallback, useState } from "react";
import { editUserAboutValidationSchema } from "../../../fieldValidateSchema/fieldValidateSchema";
import { useSaveUserAbout } from "../../../graphql/hooks/useSaveUserAbout";
import { useAlertDialog } from "../../../redux/hooks/useAlertDialog";

interface UserAboutEditorProps {
  about: string;
  closeUserAboutEditor: () => void;
}
interface FormData {
  about: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldContainer: {
      border: "1px solid #0079d3",
      borderRadius: "4px",
      backgroundColor: "#f6f7f8",
      padding: "1em 1em 0 1em",
    },
    field: {
      width: "100%",
      padding: 0,
      marginBottom: "1em",
    },
    inputBase: {
      fontSize: "0.875rem",
      fontWeight: 400,
      padding: 0,
    },
    remainingText: {
      flex: 1,
      color: "#7c7c7c",
    },
    cancelButton: {
      color: "#ff0000",
      textTransform: "none",
      fontWeight: 700,
      padding: 0,
      minWidth: "48px",
    },
    saveButton: {
      textTransform: "none",
      fontWeight: 700,
      padding: 0,
      minWidth: "48px",
    },
  })
);

const UserAboutEditor = ({
  about,
  closeUserAboutEditor,
}: UserAboutEditorProps) => {
  const classes = useStyles();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { open: openAlertDialog, close: closeAlertDialog } = useAlertDialog({
    title: "Discard unsaved changes before leaving?",
    text:
      "You have made some changes to your profile, do you wish to leave this editor without saving?",
    confirmButtonName: "Discard",
    onConfirm: () => {
      closeAlertDialog();
      closeUserAboutEditor();
    },
  });

  const { onSaveAbout } = useSaveUserAbout();

  const handleSave = useCallback(
    async (values: FormData) => {
      setIsSubmitting(true);
      //   closeAlertDialog();
      const success = await onSaveAbout(values.about);
      setIsSubmitting(false);

      if (success) closeUserAboutEditor();
    },
    [onSaveAbout, closeUserAboutEditor, setIsSubmitting]
  );

  //   const onSaveDescription = useCallback(() => {
  //     callback;
  //   }, [input]);
  //   const remainingCharacterNumber = 300 - values.description.length;

  return (
    <>
      <Formik<FormData>
        initialValues={{ about }}
        validationSchema={editUserAboutValidationSchema}
        onSubmit={handleSave}
      >
        {({ submitForm, values, handleBlur }) => (
          <Form>
            <Box className={classes.fieldContainer}>
              <Field
                component={TextAreaField}
                name="about"
                type="about"
                onBlur={(
                  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  if (isButtonClicked) {
                    return;
                  }
                  if (about === values.about) {
                    closeUserAboutEditor();
                    handleBlur(e);
                    return;
                  }
                  openAlertDialog();
                  handleBlur(e);
                }}
              />
              <Box display="flex" alignItems="center">
                <Typography variant="caption" className={classes.remainingText}>
                  {`${300 - values.about.length} Characters remaining`}
                </Typography>
                <Button
                  size="small"
                  className={classes.cancelButton}
                  onClick={closeUserAboutEditor}
                  onMouseDown={() => setIsButtonClicked(true)}
                  onMouseUp={() => setIsButtonClicked(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className={classes.saveButton}
                  onMouseDown={() => setIsButtonClicked(true)}
                  onMouseUp={() => setIsButtonClicked(false)}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
const TextAreaField = ({ children, ...props }: TextFieldProps) => {
  const classes = useStyles();

  return (
    <TextField
      autoFocus
      multiline
      inputProps={{ maxLength: 300 }}
      {...props}
      className={classes.field}
      InputProps={{
        className: classes.inputBase,
        disableUnderline: true,
      }}
    >
      {children}
    </TextField>
  );
};

export default UserAboutEditor;
