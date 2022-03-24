// // import { Provider } from "next-auth/client";
import "../styles/globals.css";

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

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
