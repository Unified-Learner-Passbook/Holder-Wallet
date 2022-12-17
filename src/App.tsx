import "./App.css";
// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
// import * as WebCredentialHandler from "web-credential-handler";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const getWallet = async () => {
      // await CredentialHandlerPolyfill.loadOnce();
      // console.log("Ready to work with credentials!");
      const polyfill = await window.credentialHandlerPolyfill.loadOnce();
      const { CredentialManager, CredentialHandlers } = polyfill;

      const result = await CredentialManager.requestPermission();
      // if (result !== "granted") {
      //   throw new Error("Permission denied.");
      // }

      console.log("polyfill", polyfill);
      console.log("result", result);

      // await WebCredentialHandler.installHandler();
      // console.log("Wallet installed.");
    };
    getWallet();
  }, []);
  return <h1 className="text-3xl font-bold">Hello world!</h1>;
}

export default App;
