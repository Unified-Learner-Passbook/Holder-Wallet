import React from 'react';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import * as WebCredentialHandler from 'web-credential-handler';

const Home = () => {
  const credentialQuery = {
    // "web" means to ask the user to select a credential handler, aka
    // "wallet", that can provide Web-based credentials (as opposed to
    // asking for a local stored password or 2FA credential)
    web: {
      // one type of Web-based credential that can be asked for is a
      // "VerifiablePresentation" that contains Verifiable Credentials
      VerifiablePresentation: {
        // this data is not read or understood by the credential mediator;
        // it must be understood by the user-selected credential handler;
        // this example uses the Verifiable Presentation Request (VPR) format;
        // any other JSON-based format can also be used
        query: [
          {
            type: 'QueryByExample',
            credentialQuery: {
              reason:
                'A university degree is required to complete your application.',
              example: {
                '@context': [
                  'https://www.w3.org/2018/credentials/v1',
                  'https://www.w3.org/2018/credentials/examples/v1',
                ],
                type: ['UniversityDegreeCredential'],
              },
            },
          },
        ],
      },
      // these are credential handler origins that can be recommended to
      // the user if they don't have a credential handler, aka "wallet", they
      // want to use already
      recommendedHandlerOrigins: ['https://wallet.example.chapi.io'],
    },
  };

  const getWallet = async () => {
    try {
      await CredentialHandlerPolyfill.loadOnce();
      console.log('Ready to work with credentials!');
      const webCredential = await navigator.credentials.get(credentialQuery);
      if (!webCredential) {
        console.log('no credentials received');
      }
      const result =
        await CredentialHandlerPolyfill.CredentialManager.requestPermission();
      // if (result !== "granted") {
      //   throw new Error("Permission denied.");
      // }
      console.log('result', result);
    } catch (e) {
      console.error(e);
    }
    try {
      await WebCredentialHandler.installHandler();
      console.log('Wallet installed.');
    } catch (e) {
      console.error('Wallet installation failed', e);
    }
  };

  // 3001/did/resolve/id // to resolve a did into document

  return (
    <div>
      <button
        className='my-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        onClick={getWallet}>
        Get Wallet
      </button>
    </div>
  );
};

export default Home;
