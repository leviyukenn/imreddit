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
import { FrontendError } from "../../const/errors";
import { editCommunityDescriptionValidationSchema } from "../../fieldValidateSchema/fieldValidateSchema";
import { useEditCommunityDescriptionMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

interface CommunityDescriptionEditorProps {
  communityId: string;
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

const useSaveDescription = () => {
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const [saveDescription] = useEditCommunityDescriptionMutation();
  const onSaveDescription = useCallback(
    async (communityId: string, description: string) => {
      const result = await saveDescription({
        variables: { communityId, description },
      }).catch(() => null);
      if (!result) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      if (result.errors) {
        onOpenSnackbarAlert({
          message: result.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      const communityResponse = result.data?.editCommunityDescription;
      if (communityResponse?.errors) {
        onOpenSnackbarAlert({
          message: communityResponse.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return;
      }

      if (communityResponse?.community) {
        onOpenSnackbarAlert({
          message: `Community settings updated successfully`,
          severity: AlertSeverity.SUCCESS,
        });
        return;
      }
    },
    []
  );

  return {
    onSaveDescription,
  };
};

const CommunityDescriptionEditor = ({
  communityId,
  description,
  setShowDescriptionEditor,
}: CommunityDescriptionEditorProps) => {
  const classes = useStyles();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [openSaveOrNotDialog, setOpenSaveOrNotDialog] = useState<boolean>(
    false
  );

  const handleCloseSaveOrNotDialog = useCallback(() => {
    setOpenSaveOrNotDialog(false);
    setShowDescriptionEditor(false);
  }, []);

  const { onSaveDescription } = useSaveDescription();

  const handleSave = useCallback(
    (values: FormData) => {
      onSaveDescription(communityId, values.description);
      setOpenSaveOrNotDialog(false);
      setShowDescriptionEditor(false);
    },
    [communityId]
  );

  //   const onSaveDescription = useCallback(() => {
  //     callback;
  //   }, [input]);
  //   const remainingCharacterNumber = 300 - values.description.length;

  return (
    <>
      <Formik<FormData>
        initialValues={{ description }}
        validationSchema={editCommunityDescriptionValidationSchema}
        onSubmit={handleSave}
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
                  if (isButtonClicked) {
                    return;
                  }
                  if (description === values.description) {
                    setShowDescriptionEditor(false);
                    handleBlur(e);
                    return;
                  }
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
                  onMouseDown={() => setIsButtonClicked(true)}
                  onMouseUp={() => setIsButtonClicked(false)}
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
            <AlertDialog
              open={openSaveOrNotDialog}
              handleClose={handleCloseSaveOrNotDialog}
              handleSave={submitForm}
            />
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

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
}

function AlertDialog({ open, handleClose, handleSave }: AlertDialogProps) {
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
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          autoFocus
          variant="outlined"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default CommunityDescriptionEditor;
