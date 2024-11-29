import { AppProps } from 'next/app'; // AppProps'u içe aktar
import { ApiProvider } from '../Context/ApiContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  );
}

export default MyApp;
