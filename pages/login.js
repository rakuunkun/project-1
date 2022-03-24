import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik, Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#D84727",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#D84727",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {},
//     "&:hover fieldset": {
//       borderColor: "#D84727",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#D84727",
//     },
//   },
// });

const loginSchema = Yup.object({
  username: Yup.string().matches(
    /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
    // /hi/,
    { excludeEmptyString: true, message: "format username atau email salah" }
  ),
});

const Login = () => {
  const [pesanError, setPesanError] = useState("");
  const router = useRouter();
  // form validation
  const formik = useFormik({
    initialValues: {
      // email: "",
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (
        (values.username === "ampuh@gmail.com" ||
          values.username === "ampuhh") &&
        values.password === "ganteng123"
      ) {
        router.replace("/");
      } else {
        setPesanError("Username or Password is Incorrect!");
      }
    },
  });
  const isButtonDisabled =
    formik.values.username == "" || formik.values.password == "";

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl
              isInvalid={formik.errors.username && formik.touched.username}
            >
              <FormLabel htmlFor="username">
                Username or Email Address
              </FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            {/* <Box> */}
            <Text fontSize="sm" color="tomato" py="-2">
              {pesanError}
            </Text>
            {/* </Box> */}
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              Remember me?
            </Checkbox>
            <Button
              type="submit"
              colorScheme="messenger"
              isFullWidth
              isDisabled={isButtonDisabled}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default Login;
