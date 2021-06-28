import {
  Chip,
  createStyles,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  SelectProps,
  Theme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useField, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React, { useCallback, useMemo, useRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      width: "100%",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      color: theme.palette.primary.main,
      backgroundColor: "#f6f7f8",
    },
    popover: {
      maxHeight: "260px",
      overflow: "auto",
    },
  })
);

export const TextInputField = ({ children, ...props }: TextFieldProps) => {
  const classes = useStyles();

  return (
    <TextField variant="outlined" {...props} className={classes.field}>
      {children}
    </TextField>
  );
};

export const SmallTextInputField = ({ children, ...props }: TextFieldProps) => {
  const classes = useStyles();

  return (
    <TextField
      size="small"
      variant="outlined"
      {...props}
      className={classes.field}
    >
      {children}
    </TextField>
  );
};

export const TextAreaField = ({ children, ...props }: TextFieldProps) => {
  const classes = useStyles();

  return (
    <TextField
      multiline
      rows={10}
      variant="outlined"
      {...props}
      className={classes.field}
    >
      {children}
    </TextField>
  );
};

interface SelectFieldProps extends SelectProps {
  name: string;
  label: string;
  options: { id: string; title: string }[];
}

export const SelectField = ({
  label,
  name,
  options,
  ...props
}: SelectFieldProps) => {
  const [field, meta] = useField<string[]>(name);
  const anchorRef = useRef(null);
  const classes = useStyles();
  const remainingOptions = useMemo(
    () => options.filter((option) => !field.value.includes(option.id)),
    [field, options]
  );
  const { setFieldValue } = useFormikContext();

  const deleteChip = useCallback(
    (id: string) => () => {
      const filteredValue = field.value.filter(
        (selectedOption) => selectedOption !== id
      );
      setFieldValue(name, filteredValue);
    },
    [field, name]
  );

  return (
    <FormControl
      className={classes.field}
      error={!!(meta.touched && meta.error)}
    >
      <InputLabel id={props.id}>{label}</InputLabel>
      <Select
        {...field}
        labelId={props.id}
        multiple
        ref={anchorRef}
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((id) => (
              <Chip
                key={id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                label={options.find((option) => option.id === id)?.title}
                className={classes.chip}
                onClick={deleteChip(id)}
                onDelete={deleteChip(id)}
                deleteIcon={<CloseIcon fontSize="small" />}
              />
            ))}
          </div>
        )}
        MenuProps={{
          anchorEl: anchorRef.current,
          getContentAnchorEl: null,
          anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
          },
          classes: { paper: classes.popover },
        }}
      >
        {remainingOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};
