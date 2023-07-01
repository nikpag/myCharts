import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import 'bootstrap/dist/css/bootstrap.css';

const App = ({ Component, pageProps }) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>
					myCharts
				</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default App;
