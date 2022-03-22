// import { Provider } from "next-auth/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
    // <Provider session={pageProps.session}>
    //   <Component {...pageProps} />
    // </Provider>
  );
}

export default MyApp;
