import Head from "next/head";

import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>myCharts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
