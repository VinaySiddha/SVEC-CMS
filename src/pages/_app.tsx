import type { AppProps } from 'next/app';
import { LoadingProvider } from '../contexts/LoadingContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />
    </LoadingProvider>
  );
}

export default MyApp;
