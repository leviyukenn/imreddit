import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "red.600", dark: "gray.800" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
