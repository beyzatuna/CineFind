import { ApiProvider } from '../Context/ApiContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  );
}

export default MyApp;
