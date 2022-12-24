import * as WebCredentialHandler from 'web-credential-handler';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const WalletUiStore = () => {
  const MEDIATOR =
    'https://authn.io/mediator' +
    '?origin=' +
    encodeURIComponent(window.location.origin);
  // const WALLET_LOCATION = window.location.origin + '/';

  function loadCurrentUser() {
    return Cookies.get('username') || '';
  }
  function resetCurrentUser() {
    console.log('Clearing login cookie.');
    Cookies.remove('username', { path: '' });
  }

  function clearWalletDisplay() {
    const contents = document.getElementById('walletContents');
    while (contents.firstChild) contents.removeChild(contents.firstChild);
  }

  function clearWalletStorage() {
    Cookies.remove('walletContents', { path: '' });
  }

  function addToWalletDisplay({ text, vc, button }) {
    const li = document.createElement('li');

    if (button) {
      const buttonNode = document.createElement('a');
      buttonNode.classList.add('waves-effect', 'waves-light', 'btn-small');
      buttonNode.setAttribute('id', vc.id);
      buttonNode.appendChild(document.createTextNode(button.text));
      li.appendChild(buttonNode);
    }

    li.appendChild(document.createTextNode(' ' + text));

    document.getElementById('walletContents').appendChild(li);

    if (button) {
      document.getElementById(vc.id).addEventListener('click', () => {
        const vp = {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://www.w3.org/2018/credentials/examples/v1',
          ],
          type: 'VerifiablePresentation',
          verifiableCredential: vc,
        };
        console.log('wrapping and returning vc:', vp);
        button.sourceEvent.respondWith(
          Promise.resolve({ dataType: 'VerifiablePresentation', data: vp })
        );
      });
    }
  }

  function getCredentialType(vc) {
    if (!vc) {
      return 'Credential';
    }
    const types = Array.isArray(vc.type) ? vc.type : [vc.type];
    return types.length > 1 ? types.slice(1).join('/') : types[0];
  }

  function refreshUserArea({ shareButton } = {}) {
    const currentUser = loadCurrentUser();
    document.getElementById('username').innerHTML = currentUser;

    if (currentUser) {
      document.getElementById('logged-in').classList.remove('hidden');
      document.getElementById('logged-out').classList.add('hidden');
    } else {
      // not logged in
      document.getElementById('logged-in').classList.add('hidden');
      document.getElementById('logged-out').classList.remove('hidden');
    }

    // Refresh the user's list of wallet contents
    clearWalletDisplay();
    const walletContents = loadWalletContents();

    if (!walletContents) {
      return addToWalletDisplay({ text: 'none' });
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
        button: shareButton,
      });
    }
  }

  function getCredentialId(vp) {
    const vc = Array.isArray(vp.verifiableCredential)
      ? vp.verifiableCredential[0]
      : vp.verifiableCredential;
    return vc.id;
  }

  function loadWalletContents() {
    const walletContents = Cookies.get('walletContents');
    if (!walletContents) {
      return null;
    }
    return JSON.parse(atob(walletContents));
  }

  function storeInWallet(verifiablePresentation) {
    const walletContents = loadWalletContents() || {};
    const id = getCredentialId(verifiablePresentation);
    walletContents[id] = verifiablePresentation;

    // base64 encode the serialized contents (verifiable presentations)
    const serialized = btoa(JSON.stringify(walletContents));
    Cookies.set('walletContents', serialized, {
      path: '',
      secure: true,
      sameSite: 'None',
    });
  }

  const handleStoreEvent = async () => {
    const event = await WebCredentialHandler.receiveCredentialEvent();
    console.log('Store Credential Event:', event.type, event);

    const credential = event.credential;

    // document.getElementById('requestOrigin').innerHTML = event.credentialRequestOrigin;
    // document.getElementById('hintKey').innerHTML = credential.hintKey || '';
    // document.getElementById('credentialContents').innerHTML = JSON.stringify(credential.data, null, 2);

    // Display the credential details, for confirmation
    const vp = credential.data;
    const vc = Array.isArray(vp.verifiableCredential)
      ? vp.verifiableCredential[0]
      : vp.verifiableCredential;
    document.getElementById('credentialType').innerHTML = getCredentialType(vc);
    document.getElementById('credentialIssuer').innerHTML = vc.issuer;

    // Set up the event handlers for the buttons
    document.getElementById('cancelButton').addEventListener('click', () => {
      returnToUser(event, null); // Do nothing, close the CHAPI window
    });

    document.getElementById('confirmButton').addEventListener('click', () => {
      document.getElementById('userArea').classList.remove('hidden');
      document.getElementById('confirm').classList.add('hidden');

      storeInWallet(credential.data); // in mock-user-management.js
      refreshUserArea();
    });

    document.getElementById('doneButton').addEventListener('click', () => {
      returnToUser(event, vp);
    });
  };

  /**
   * @param storeEvent
   * @param {VerifiablePresentation|null} data - Return (to client application)
   *   exactly what was stored, or a `null` if canceled by the user.
   */

  function returnToUser(storeEvent, data) {
    storeEvent.respondWith(
      new Promise((resolve) => {
        return data
          ? resolve({ dataType: 'VerifiablePresentation', data })
          : resolve(null);
      })
    );
  }

  function onDocumentReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  function logout() {
    resetCurrentUser();
    clearWalletDisplay();
    clearWalletStorage();
    refreshUserArea();
  }

  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR).then(handleStoreEvent);

    onDocumentReady(() => {
      // document.getElementById('loginButton').addEventListener('click', login);
      document.getElementById('logoutButton').addEventListener('click', logout);
      refreshUserArea();
    });
  });

  return (
    <div className='container'>
      <div className='card-panel hidden' id='logged-in'>
        <div id='confirm'>
          <h2>Learner Application</h2>
          <p>
            A credential has been issued to you by Christ University for
            diploma.
          </p>

          <p>
            <strong>type:</strong> <span id='credentialType'></span>
          </p>

          <p>
            <strong>issuer:</strong> <span id='credentialIssuer'></span>
          </p>

          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='confirmButton'>
            Store
          </button>
          <button
            className='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='cancelButton'>
            Cancel
          </button>
          <button
            className='text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='cancelButton'>
            Download
          </button>
        </div>

        <div id='userArea' className='hidden'>
          <p>
            <strong>Logged in:</strong> <span id='username'></span>
          </p>
          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='logoutButton'>
            Reset and Logout
          </button>

          <p>
            <strong>Credential stored!</strong>
          </p>

          <h6>Wallet Contents:</h6>
          <ol id='walletContents'></ol>

          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='doneButton'>
            Done
          </button>
        </div>
      </div>

      <div className='card-panel hidden' id='logged-out'>
        <p>In order to store a credential:</p>

        <ol>
          <li>
            Register a wallet with your browser (for example, the{' '}
            <a href='https://wallet.example.chapi.io/'>Demo Wallet</a>).
          </li>
          <li>
            Click the <strong>Login</strong> button.
          </li>
        </ol>

        <button
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
          id='loginButton'>
          Login
        </button>
      </div>
    </div>
  );
};

export default WalletUiStore;

