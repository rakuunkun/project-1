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
  column,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import ButtonDir from "../components/button";

const loginSchema = Yup.object({
  username: Yup.string().matches(
    /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
    // /hi/,
    { excludeEmptyString: true, message: "format username atau email salah" }
  ),
});

const Register = () => {
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
      if ((isButtonDisabled = false)) {
        router.replace("/login");
      } else {
        setPesanError("Username or Password is Incorrect!");
      }
    },
  });
  const isButtonDisabled =
    formik.values.username == "" || formik.values.password == "";

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" flexDir={column}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
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
                placeholder="Username or Email"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder="First Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Last Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                placeholder="Date of Birth"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="Phone Number"
              />
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
                placeholder="Password"
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
              colorScheme="red"
            >
              Remember me?
            </Checkbox>
            <Button
              type="submit"
              colorScheme="red"
              isFullWidth
              isDisabled={isButtonDisabled}
            >
              Login
            </Button>
          </VStack>
        </form>
        <div className=" mt-2 flex items-center">
          <div>Have an account? </div>
          <div className="text-sky-600">
            <ButtonDir my-2 url="/login" name="Log in" />
          </div>
        </div>
      </Box>
    </Flex>
  );
};
export default Register;
