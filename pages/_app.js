// // import { Provider } from "next-auth/client";
import "../styles/globals.css";
import { store } from "./../redux/reducers";

// function MyApp({ Component, pageProps }) {
//   return (
//     <Component {...pageProps} />
//     // <Provider session={pageProps.session}>
//     //   <Component {...pageProps} />
//     // </Provider>
//   );
// }

// export default MyApp;

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
