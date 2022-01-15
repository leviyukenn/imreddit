import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useAlertDialog } from "../../redux/hooks/useAlertDialog";

interface AlertDialogProps {}

function AlertDialog({}: AlertDialogProps) {
  const { title, text, onConfirm, confirmButtonName, close } = useAlertDialog();

  return (
    <Dialog
      open={!!text}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          autoFocus
          variant="outlined"
        >
          {confirmButtonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
