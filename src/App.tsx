import "./App.css";
// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
// import * as WebCredentialHandler from "web-credential-handler";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import Register from "./pages/Register";

// const credentialQuery:any = {
//   // "web" means to ask the user to select a credential handler, aka
//   // "wallet", that can provide Web-based credentials (as opposed to
//   // asking for a local stored password or 2FA credential)
//   web: {
//     // one type of Web-based credential that can be asked for is a
//     // "VerifiablePresentation" that contains Verifiable Credentials
//     VerifiablePresentation: {
//       // this data is not read or understood by the credential mediator;
//       // it must be understood by the user-selected credential handler;
//       // this example uses the Verifiable Presentation Request (VPR) format;
//       // any other JSON-based format can also be used
//       query: [{
//         type: "QueryByExample",
//         credentialQuery: {
//           reason: "A university degree is required to complete your application.",
//           example: {
//             "@context": [
//               "https://www.w3.org/2018/credentials/v1",
//               "https://www.w3.org/2018/credentials/examples/v1"
//             ],
//             "type": ["UniversityDegreeCredential"]
//           }
//         }
//       ]
//     },
//     // these are credential handler origins that can be recommended to
//     // the user if they don't have a credential handler, aka "wallet", they
//     // want to use already
//     recommendedHandlerOrigins: [
//       "https://wallet.example.chapi.io"
//     ]
//   }
// };

function App() {
  useEffect(() => {
    // const getWallet = async () => {
    //   // await CredentialHandlerPolyfill.loadOnce();
    //   // console.log("Ready to work with credentials!");
    //   const polyfill = await window.credentialHandlerPolyfill.loadOnce();
    //   const { CredentialManager, CredentialHandlers } = polyfill;
    //   const webCredential = await navigator.credentials.get(credentialQuery);
    //   if(!webCredential) {
    //     console.log('no credentials received');
    //   }
    //   const result = await CredentialManager.requestPermission();
    //   // if (result !== "granted") {
    //   //   throw new Error("Permission denied.");
    //   // }
    //   console.log("polyfill", polyfill);
    //   console.log("result", result);
    //   // await WebCredentialHandler.installHandler();
    //   // console.log("Wallet installed.");
    // };
    // getWallet();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Otp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
