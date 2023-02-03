import React, { useEffect } from 'react';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
// import * as WebCredentialHandler from 'web-credential-handler';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Certificate from '../templates/certificate';
import axios from 'axios';

const ReportCard = () => {
  // const MEDIATOR =
  //   'https://authn.io/mediator' +
  //   '?origin=' +
  //   encodeURIComponent(window.location.origin);
  const navigate = useNavigate();

  function loadCurrentUser() {
    return Cookies.get('username') || '';
  }

  function onDocumentReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function loadWalletContents() {
    const walletContents = Cookies.get('walletContents');
    if (!walletContents) {
      return null;
    }
    return JSON.parse(atob(walletContents));
  }

  // function clearWalletStorage() {
  //   Cookies.remove('walletContents', { path: '' });
  // }

  function clearWalletDisplay() {
    const contents = document.getElementById('walletContents');
    while (contents.firstChild) contents.removeChild(contents.firstChild);
  }

  function addToWalletDisplay({ text, vc, button }) {
    let li = document.createElement('li');

    if (button) {
      const buttonNode = document.createElement('button');
      const buttonNode2 = document.createElement('button');
      // UNIQUE ID FOR EACH VIEW AND DOWNLOAD BUTTON
      buttonNode.setAttribute('id', `${vc.id}view`);
      buttonNode2.setAttribute('id', `${vc.id}download`);

      buttonNode.setAttribute(
        'class',
        'bg-[#18224E] hover:bg-[#111837] text-white font-bold py-1 px-4 rounded w-fit'
      );
      buttonNode2.setAttribute(
        'class',
        'bg-[#008000] hover:bg-[#008000] text-white font-bold py-1 px-4 mx-2 rounded w-fit'
      );
      buttonNode.appendChild(document.createTextNode(button.text));
      buttonNode2.appendChild(document.createTextNode('Download'));
      li.appendChild(buttonNode2);
      li.appendChild(buttonNode);
    }

    if (text === 'No Report Cards Yet!') {
      li = document.createElement('p');
    }
    li.appendChild(document.createTextNode(' ' + text));
    document.getElementById('walletContents').appendChild(li);

    if (button) {
      document.getElementById(`${vc.id}view`).addEventListener('click', () => {
        const vp = {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://www.w3.org/2018/credentials/examples/v1',
          ],
          type: 'VerifiablePresentation',
          verifiableCredential: vc,
        };
        console.log('wrapping and returning vc:', vp);

        // code to view certificate
        document.getElementById('certificate').classList.remove('hidden');
      });

      document.getElementById(`${vc.id}download`).addEventListener('click', downloadHandler);
    }
  }

  function downloadHandler() {
    // DOWNLOAD PDF CODE
    alert('pdf downloadng....');
  }

  function getCredentialType(vc) {
    if (!vc) {
      return 'Credential';
    }
    const types = Array.isArray(vc.type) ? vc.type : [vc.type];
    return types.length > 1 ? types.slice(1).join('/') : types[0];
  }

  function refreshUserArea({ DownloadButton } = {}) {
    const currentUser = loadCurrentUser();
    document.getElementById('username').innerHTML = currentUser;

    // if (currentUser) {
    //   document.getElementById('logged-in').classList.remove('hidden');
    //   // document.getElementById('logged-out').classList.add('hidden');
    // } else {
    //   // not logged in
    //   document.getElementById('logged-in').classList.add('hidden');
    //   // document.getElementById('logged-out').classList.remove('hidden');
    // }

    // Refresh the user's list of wallet contents
    clearWalletDisplay();
    const walletContents = loadWalletContents();

    if (!walletContents) {
      return addToWalletDisplay({ text: 'No Report Cards Yet!' });
    }

    for (const id in walletContents) {
      const vp = walletContents[id];
      // TODO: Add support for multi-credential VPs
      const vc = Array.isArray(vp.verifiableCredential)
        ? vp.verifiableCredential[0]
        : vp.verifiableCredential;
      addToWalletDisplay({
        text: `${getCredentialType(vc)} from ${vc.issuer}`,
        vc,
        button: DownloadButton,
      });
    }
  }

  const testCredential = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/2018/credentials/examples/v1',
    ],
    id: 'http://example.edu/credentials/1872',
    type: ['VerifiableCredential', '12th Marksheet'],
    issuer: 'UP Board',
    issuanceDate: '2023-01-01T19:53:24Z',
    credentialSubject: {
      id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      alumniOf: {
        id: 'did:example:c276e12ec21ebfeb1f712ebc6f1',
        name: {
          '@value': 'UP Board',
          '@language': 'en',
        },
      },
    },
    proof: {
      type: 'Ed25519Signature2018',
      created: '2017-06-18T21:19:10Z',
      proofPurpose: 'assertionMethod',
      verificationMethod: 'https://example.edu/issuers/keys/1',
      jws: 'eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM',
    },
  };

  const testPresentation = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/2018/credentials/examples/v1',
    ],
    type: 'VerifiablePresentation',
    verifiableCredential: [testCredential],
  };

  async function onClickReceive() {
    // document.getElementById('storeResults').innerHTML = ''; // clear results

    // Construct the WebCredential wrapper around the credential to be stored
    const credentialType = 'VerifiablePresentation';
    const webCredentialWrapper = new CredentialHandlerPolyfill.WebCredential(
      credentialType,
      testPresentation,
      {
        recommendedHandlerOrigins: ['https://wallet.example.chapi.io/'],
      }
    );

    // Use Credential Handler API to store
    const result = await navigator.credentials.store(webCredentialWrapper);
    if (!result)
      document.getElementById('storeResults').innerText =
        'Storing credential...';

    document.getElementById('resultsPanel').classList.remove('hide');
    // document.getElementById('storeResults').innerText = JSON.stringify(
    //   result,
    //   null,
    //   2
    // );

    console.log('Result of receiving via store() request:', result);
    //
    // if(!result) {
    //   document.getElementById('storeResults').innerHTML = 'null result';
    //   return;
    // }

    // document.getElementById('storeResults').innerHTML = JSON.stringify(result.data, null, 2);
  }

  useEffect(() => {
    if (loadCurrentUser() === '') {
      alert('Please Login first.');
      navigate('/login');
      return;
    }
    // console.log('Registering wallet...');
    // const installWallet = async () => {
    //   try {
    //     await CredentialHandlerPolyfill.loadOnce(MEDIATOR);
    //     console.log('Ready to work with credentials!');
    //     await WebCredentialHandler.installHandler();
    //     console.log('Wallet installed.');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // installWallet();
    onDocumentReady(() => {
      document
        .getElementById('receiveButton')
        .addEventListener('click', onClickReceive);
      const currentUser = loadCurrentUser();
      document.getElementById('username').innerHTML = currentUser;

      refreshUserArea({
        DownloadButton: {
          text: 'View',
        },
      });
    });
  });

  return (
    <div className='bg-[#41CEF2] min-h-screen text-white pt-1'>
      <div className='text-right m-1'>
        <strong className='pr-1'>Welcome</strong>
        <span id='username'></span>
      </div>
      <div className='text-4xl font-bold'>Report Cards</div>
      <div
        onClick={() =>
          document.getElementById('certificate').classList.add('hidden')
        }
        id='certificate'
        className='hidden absolute z-10 l-0 r-0 mt-5 w-full'>
        <Certificate />
      </div>
      <button
        id='receiveButton'
        className='m-auto flex items-center justify-center mt-5 h-fit text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-4'>
        Fetch
      </button>
      
      <div className='block w-full my-2 text-center p-6' id='logged-in'>
        <span>
          <h6 className='text-xl font-bold'>Wallet Contents:</h6>
          <ol className='list-decimal p-6' id='walletContents'>
            <li>none</li>
          </ol>
        </span>
      </div>
    </div>
  );
};

export default ReportCard;
