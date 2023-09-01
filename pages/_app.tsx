import '../styles/global.css'
import { AppProps } from 'next/app';
import reportWebVitals from '../components/reportWebVitals';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // monitor web performance
    reportWebVitals();
  }, []);

  return <Component {...pageProps} />
}

export default App;