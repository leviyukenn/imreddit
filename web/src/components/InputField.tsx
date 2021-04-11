import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const TextInputField = ({
  label,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField<string>(props.name);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input id={field.name} {...field} {...props} pr="4.5rem" />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export const PasswordInputField = ({
  label,
  size: _,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField<string>(props.name);
  const [showPassword, setshowPassword] = React.useState(false);
  const handleClick = () => setshowPassword(!showPassword);
  

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={field.name}
          {...field}
          {...props}
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
