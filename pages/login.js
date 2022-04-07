import { useRouter } from "next/router";
import { useFormik } from "formik";
import { connect, useSelector } from "react-redux";
import { loginAction } from "../redux/actions";
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
  FormErrorMessage,
  column,
} from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import ButtonDir from "../components/button";

const loginSchema = Yup.object({
  username: Yup.string().matches(
    /^(?:[A-Z\d][A-Z\d_-]{4,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
    // /hi/,
    { excludeEmptyString: true, message: "Format username atau email salah" }
  ),
});

const Login = ({ loginAction }) => {
  const router = useRouter();

  // form validation
  const { error_mes } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      // email: "",
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginAction(values, router);
    },
  });
  const isButtonDisabled =
    formik.values.username == "" || formik.values.password == "";

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" flexDir={column}>
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
                placeholder="Username or Email"
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
                placeholder="Password"
              />
            </FormControl>
            {/* <Box> */}
            <Text fontSize="sm" color="tomato" py="-2">
              {error_mes}
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
              colorScheme="red"
              isFullWidth
              isDisabled={isButtonDisabled}
            >
              Login
            </Button>
          </VStack>
        </form>
        <div className="text-center  text-sky-600 my-2">
          <ButtonDir url="/register" name="Create New Account" />
        </div>
      </Box>
    </Flex>
  );
};
export default connect(null, { loginAction })(Login);
