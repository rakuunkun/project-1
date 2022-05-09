// // import { Provider } from "next-auth/client";
import "../styles/globals.css";
import { store } from "./../redux/reducers";
import AuthProvider from "../components/authProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
