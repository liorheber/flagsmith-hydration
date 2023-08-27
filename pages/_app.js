import App from "next/app";

import { FlagsmithProvider } from "flagsmith/react";
import flagsmith, { createFlagsmithInstance } from "flagsmith/isomorphic";

function BaseApp({ Component, flagsmithState, pageProps }) {
  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      <Component {...pageProps} />
    </FlagsmithProvider>
  );
}

BaseApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const flagsmithSSR = createFlagsmithInstance();
  await flagsmithSSR.init({
    environmentID: process.env.FLAGSMITH_SECRET,
    identity: "my_user_id",
  });
  return {
    ...appProps,
    flagsmithState: flagsmithSSR.getState(),
  };
};

export default BaseApp;
