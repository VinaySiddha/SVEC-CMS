import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { LoadingProvider } from '../contexts/LoadingContext';
import { useEffect } from 'react';
import Router from 'next/router';
import GlobalLoader from '@/components/GlobalLoader';
import { useLoading } from '@/contexts/LoadingContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

function RouteChangeLoader() {
  const { setLoading, setLoadingText } = useLoading();

  useEffect(() => {
    let startedAt = 0;

    const clearAfterPaintWithMinDelay = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, 500 - elapsed);
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setLoading(false);
          });
        });
      }, remaining);
    };

    const handleStart = () => {
      setLoadingText('Loading page...');
      startedAt = Date.now();
      setLoading(true);
    };
    const handleDone = () => {
      clearAfterPaintWithMinDelay();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleDone);
    Router.events.on('routeChangeError', handleDone);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleDone);
      Router.events.off('routeChangeError', handleDone);
    };
  }, [setLoading, setLoadingText]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <RouteChangeLoader />
      <GlobalLoader />
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </LoadingProvider>
  );
}

export default MyApp;
