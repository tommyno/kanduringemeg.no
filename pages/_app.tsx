import type { AppProps } from "next/app";

import "styles/main.scss";

const CallMeApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default CallMeApp;
