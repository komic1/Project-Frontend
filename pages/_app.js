import Background from "../components/Layout/background.js";
import Navbar from "../components/Layout/navbar.js";
import "../styles/globals.css";

//document.body.style.backgroundColor="rgba(176, 194, 13, 0.527)";
function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
  );
}

export default MyApp;
