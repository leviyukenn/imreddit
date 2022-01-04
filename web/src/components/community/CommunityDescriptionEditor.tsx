import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React from "react";
import { editCommunityDescriptionValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";

interface CommunityDescriptionEditorProps {
  description: string;
  setShowDescriptionEditor: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormData {
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      width: "100%",
      padding: "0.5em",
    },
    inputBase: {
      fontSize: "0.5rem",
      fontWeight: 400,
    },
  })
);

const CommunityDescriptionEditor = ({
  description,
  setShowDescriptionEditor,
}: CommunityDescriptionEditorProps) => {
  const classes = useStyles();
  return (
    <>
      <Formik<FormData>
        initialValues={{ description }}
        validationSchema={editCommunityDescriptionValidationSchema}
        onSubmit={() => {}}
      >
        {({ submitForm, isSubmitting, values, handleBlur }) => (
          <Form>
            <Field
              component={({ children, ...props }: TextFieldProps) => (
                <TextField
                  autoFocus
                  multiline
                  rows={10}
                  variant="outlined"
                  {...props}
                  classes={{ root: classes.field }}
                  onBlur={(
                    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    // setShowDescriptionEditor(false);
                    handleBlur(e);
                  }}
                >
                  {children}
                </TextField>
              )}
              name="description"
              type="description"
              //   label="Description"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowDescriptionEditor(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
      {/* <SnackbarAlert
        {...{
          message: errorMessage,
          setMessage: setErrorMessage,
          severity: AlertSeverity.ERROR,
        }}
      /> */}
    </>
  );
};
export default CommunityDescriptionEditor;
