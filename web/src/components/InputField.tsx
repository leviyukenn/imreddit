import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { TextField, TextFieldProps } from "formik-material-ui";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      width: "100%",
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

// export const PasswordInputField = ({
//   label,
//   size: _,
//   ...props
// }: InputFieldProps) => {
//   const [field, meta] = useField<string>(props.name);
//   const [showPassword, setshowPassword] = React.useState(false);
//   const handleClick = () => setshowPassword(!showPassword);

//   return (
//     <FormControl isInvalid={meta.touched && !!meta.error}>
//       <FormLabel htmlFor={field.name}>{label}</FormLabel>
//       <InputGroup>
//         <Input
//           id={field.name}
//           {...field}
//           {...props}
//           pr="4.5rem"
//           type={showPassword ? "text" : "password"}
//         />
//         <InputRightElement width="4.5rem">
//           <Button h="1.75rem" size="sm" onClick={handleClick}>
//             {showPassword ? "Hide" : "Show"}
//           </Button>
//         </InputRightElement>
//       </InputGroup>

//       <FormErrorMessage>{meta.error}</FormErrorMessage>
//     </FormControl>
//   );
// };
