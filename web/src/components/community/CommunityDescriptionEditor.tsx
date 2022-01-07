import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React, { useCallback, useState } from "react";
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

const CommunityDescriptionEditor = ({
  description,
  setShowDescriptionEditor,
}: CommunityDescriptionEditorProps) => {
  const classes = useStyles();

  const [openSaveOrNotDialog, setOpenSaveOrNotDialog] = useState<boolean>(
    false
  );

  const handleCloseSaveOrNotDialog = useCallback(() => {
    setOpenSaveOrNotDialog(false);
    setShowDescriptionEditor(false);
  }, []);

  return (
    <>
      <Formik<FormData>
        initialValues={{ description }}
        validationSchema={editCommunityDescriptionValidationSchema}
        onSubmit={() => {}}
      >
        {({ submitForm, isSubmitting, values, handleBlur }) => (
          <Form>
            <Box className={classes.fieldContainer}>
              <Field
                component={TextAreaField}
                name="description"
                type="description"
                onBlur={(
                  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setOpenSaveOrNotDialog(true);
                  handleBlur(e);
                }}
              />
              <Box display="flex" alignItems="center">
                <Typography variant="caption" className={classes.remainingText}>
                  {`${300 - values.description.length} Characters remaining`}
                </Typography>
                <Button
                  size="small"
                  className={classes.cancelButton}
                  onClick={() => setShowDescriptionEditor(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  className={classes.saveButton}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <AlertDialog
        open={openSaveOrNotDialog}
        handleClose={handleCloseSaveOrNotDialog}
      />
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
const TextAreaField = ({ children, ...props }: TextFieldProps) => {
  const classes = useStyles();

  return (
    <TextField
      autoFocus
      multiline
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

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
}

function AlertDialog({ open, handleClose }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Save changes before leaving?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have made some changes to your community, do you wish to leave
          this menu without saving?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default CommunityDescriptionEditor;
