import '../styles/globals.css';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../context/AuthContext';
import { CVContextProvider } from '../context/CVContext';

function MyApp({ Component, pageProps }) {
  // console.log(user);

  return (
    <>
      <AuthContextProvider>
        <CVContextProvider>
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
        </CVContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
