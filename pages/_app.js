import "../styles/globals.css";
import { TripProvider } from "../context/TripContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <TripProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TripProvider>
  );
}

export default MyApp;
