import { ApiProvider } from '../Context/ApiContext';


function MyApp({ Component, pageProps }: any) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
    </ApiProvider>
  );
}

export default MyApp;
