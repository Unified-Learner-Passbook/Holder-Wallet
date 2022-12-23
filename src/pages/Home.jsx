import React, { useEffect } from 'react';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import * as WebCredentialHandler from 'web-credential-handler';
// import Cookies from 'js-cookie';

const Home = () => {
  const MEDIATOR =
    'https://authn.io/mediator' +
    '?origin=' +
    encodeURIComponent(window.location.origin);

  const WALLET_LOCATION = window.location.origin + '/';
  // const workerUrl = WALLET_LOCATION + 'wallet-worker.html';

  // const credentialQuery = {
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
  //       query: [
  //         {
  //           type: 'QueryByExample',
  //           credentialQuery: {
  //             reason:
  //               'A university degree is required to complete your application.',
  //             example: {
  //               '@context': [
  //                 'https://www.w3.org/2018/credentials/v1',
  //                 'https://www.w3.org/2018/credentials/examples/v1',
  //               ],
  //               type: ['UniversityDegreeCredential'],
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     // these are credential handler origins that can be recommended to
  //     // the user if they don't have a credential handler, aka "wallet", they
  //     // want to use already
  //     recommendedHandlerOrigins: ['https://localhost:3000/home'],
  //   },
  // };

  // function login() {
  //   saveCurrentUser('JaneDoe');
  //   refreshUserArea();
  // }

  // function logout() {
  //   resetCurrentUser();
  //   clearWalletDisplay();
  //   clearWalletStorage();
  //   refreshUserArea();
  // }

  // function refreshUserArea({ shareButton } = {}) {
  //   const currentUser = loadCurrentUser();
  //   document.getElementById('username').innerHTML = currentUser;

  //   if (currentUser) {
  //     document.getElementById('logged-in').classList.remove('hidden');
  //     document.getElementById('logged-out').classList.add('hidden');
  //   } else {
  //     // not logged in
  //     document.getElementById('logged-in').classList.add('hidden');
  //     document.getElementById('logged-out').classList.remove('hidden');
  //   }

  //   // Refresh the user's list of wallet contents
  //   clearWalletDisplay();
  //   const walletContents = loadWalletContents();

  //   if (!walletContents) {
  //     return addToWalletDisplay({ text: 'none' });
  //   }

  //   for (const id in walletContents) {
  //     const vp = walletContents[id];
  //     // TODO: Add support for multi-credential VPs
  //     const vc = Array.isArray(vp.verifiableCredential)
  //       ? vp.verifiableCredential[0]
  //       : vp.verifiableCredential;
  //     addToWalletDisplay({
  //       text: `${getCredentialType(vc)} from ${vc.issuer}`,
  //       vc,
  //       button: shareButton,
  //     });
  //   }
  // }

  /**
   * Wallet Storage / Persistence
   */

  // function loadWalletContents() {
  //   const walletContents = Cookies.get('walletContents');
  //   if (!walletContents) {
  //     return null;
  //   }
  //   return JSON.parse(atob(walletContents));
  // }

  // function clearWalletStorage() {
  //   Cookies.remove('walletContents', { path: '' });
  // }

  // function clearWalletDisplay() {
  //   const contents = document.getElementById('walletContents');
  //   while (contents.firstChild) contents.removeChild(contents.firstChild);
  // }

  // function addToWalletDisplay({ text, vc, button }) {
  //   const li = document.createElement('li');

  //   if (button) {
  //     const buttonNode = document.createElement('a');
  //     buttonNode.classList.add('waves-effect', 'waves-light', 'btn-small');
  //     buttonNode.setAttribute('id', vc.id);
  //     buttonNode.appendChild(document.createTextNode(button.text));
  //     li.appendChild(buttonNode);
  //   }

  //   li.appendChild(document.createTextNode(' ' + text));

  //   document.getElementById('walletContents').appendChild(li);

  //   if (button) {
  //     document.getElementById(vc.id).addEventListener('click', () => {
  //       const vp = {
  //         '@context': [
  //           'https://www.w3.org/2018/credentials/v1',
  //           'https://www.w3.org/2018/credentials/examples/v1',
  //         ],
  //         type: 'VerifiablePresentation',
  //         verifiableCredential: vc,
  //       };
  //       console.log('wrapping and returning vc:', vp);
  //       button.sourceEvent.respondWith(
  //         Promise.resolve({ dataType: 'VerifiablePresentation', data: vp })
  //       );
  //     });
  //   }
  // }

  // function getCredentialId(vp) {
  //   const vc = Array.isArray(vp.verifiableCredential)
  //     ? vp.verifiableCredential[0]
  //     : vp.verifiableCredential;
  //   return vc.id;
  // }

  // function getCredentialType(vc) {
  //   if (!vc) {
  //     return 'Credential';
  //   }
  //   const types = Array.isArray(vc.type) ? vc.type : [vc.type];
  //   return types.length > 1 ? types.slice(1).join('/') : types[0];
  // }

  /**
   * User Storage / Persistence
   */

  // function loadCurrentUser() {
  //   return Cookies.get('username') || '';
  // }

  // function saveCurrentUser(name) {
  //   console.log('Setting login cookie.');
  //   Cookies.set('username', name, { path: '', secure: true, sameSite: 'None' });
  // }

  // function resetCurrentUser() {
  //   console.log('Clearing login cookie.');
  //   Cookies.remove('username', { path: '' });
  // }

  useEffect(() => {
    // const getWallet = async () => {
    //   try {
    //     await CredentialHandlerPolyfill.loadOnce();
    //     console.log('Ready to work with credentials!');
    //     const webCredential = await navigator.credentials.get(credentialQuery);
    //     if (!webCredential) {
    //       console.log('no credentials received');
    //     }
    //     const result =
    //       await CredentialHandlerPolyfill.CredentialManager.requestPermission();
    //     // if (result !== "granted") {
    //     //   throw new Error("Permission denied.");
    //     // }
    //     console.log('result', result);
    //   } catch (e) {
    //     console.error(e);
    //   }

    //   try {
    //     await WebCredentialHandler.installHandler();
    //     console.log('Wallet installed.');
    //   } catch (e) {
    //     console.error('Wallet installation failed', e);
    //   }
    // };
    // getWallet();

    console.log('Registering wallet...');
    const installWallet = async () => {
      try {
        await CredentialHandlerPolyfill.loadOnce(MEDIATOR);
        console.log('Ready to work with credentials!');
        await WebCredentialHandler.installHandler();
        console.log('Wallet installed.');
      } catch (error) {
        console.error(error);
      }
    };
    installWallet();
  });

  // 3001/did/resolve/id // to resolve a did into document

  return (
    <div className='m-2 text-left'>
      <div className='block w-fit m-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
        <h5 className='mb-2 text-2xl font-bold'>Demo Wallet</h5>
        <p>
          By clicking 'Accept' on page load, you have registered this page with
          your browser, and now it can act as a test wallet.
        </p>

        <div
          className='block w-full my-2 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md hidden'
          id='logged-in'>
          <span>
            <strong>Logged in:</strong> <span id='username'></span>
            <h6>Wallet Contents:</h6>
            <ol className='list-decimal p-6' id='walletContents'>
              <li>none</li>
            </ol>
          </span>
          <button
            // onClick={logout}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
            id='logoutButton'>
            Reset and Logout
          </button>
        </div>

        <div
          className='block w-full my-2 m-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md'
          id='logged-out'>
          <p>
            To start using the wallet, click the <strong>Login</strong> button.
          </p>
          <p>
            For purposes of this demo, we will skip Registration and just use a
            test account.
          </p>
          <button
            // onClick={login}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='loginButton'>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
