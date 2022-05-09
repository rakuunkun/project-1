import { useRouter } from "next/router";
import { Form, FormikProvider, useFormik } from "formik";
import { connect, useSelector } from "react-redux";
import { registerAction } from "../redux/actions";
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
  column,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import ButtonDir from "../components/button";
import { useState } from "react";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const registerSchema = Yup.object({
  username: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be less than 20 characters")
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

  email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, {
    excludeEmptyString: true,
    message: "format email salah",
  }),
  password: Yup.string().password(),
});

const Register = ({ registerAction }) => {
  const router = useRouter();
  // form validation
  const { error_mes } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordRepeat: "",
      fullname: "",
      birthDate: "",
    },
    // validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("ini" + values);
      registerAction(values, router);
    },
  });

  const [strength, setStrength] = useState("");
  const [showCheck, setShowCheck] = useState(false);

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  // pw strength checker
  const passwordCheck = (event) => {
    formik.handleChange(event);
    let pass = event.target.value;
    if (strongPassword.test(pass)) {
      setStrength("Strong");
      setShowCheck(true);
    } else if (mediumPassword.test(pass)) {
      setStrength("Medium");
      setShowCheck(false);
    } else if (pass.length == 0) {
      setStrength("");
      setShowCheck(false);
    } else {
      setStrength("Weak");
      setShowCheck(false);
    }
  };

  const isButtonDisabled =
    formik.values.email == "" ||
    formik.values.username == "" ||
    formik.values.password == "" ||
    formik.values.passwordRepeat == "" ||
    formik.values.fullname == "" ||
    formik.values.birthDate == "" ||
    strength !== "Strong" ||
    formik.values.password !== formik.values.passwordRepeat;

  const showFeedback = formik.values.password.length > 8;
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" flexDir={column}>
        <FormikProvider value={formik}>
          <Form>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Username"
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="fullname">Fullname</FormLabel>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  placeholder="Fullname"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="birthDate">Date of Birth</FormLabel>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.birthDate}
                  placeholder="Date of Birth"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={passwordCheck}
                  value={formik.values.password}
                  placeholder="Password"
                />
                <div className="flex items-center space-between">
                  <span>{strength}</span>
                  {showCheck ? (
                    <div
                      id="password-feedback"
                      aria-live="polite"
                      className="feedback text-sm"
                    >
                      {"✓"}
                    </div>
                  ) : null}
                </div>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Repeat Password</FormLabel>
                <Input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.passwordRepeat}
                  placeholder="Repeat Password"
                />
              </FormControl>
              {/* <Box> */}
              <Text fontSize="sm" color="tomato" py="-2">
                {error_mes}
              </Text>

              <Button
                type="submit"
                colorScheme="red"
                isFullWidth
                isDisabled={isButtonDisabled}
              >
                Create Account
              </Button>
            </VStack>
            {/* </form> */}
          </Form>
        </FormikProvider>
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
export default connect(null, { registerAction })(Register);
