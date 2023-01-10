import * as WebCredentialHandler from 'web-credential-handler';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const WalletUiGet = () => {
  const MEDIATOR =
    'https://authn.io/mediator' +
    '?origin=' +
    encodeURIComponent(window.location.origin);

  async function handleGetEvent() {
    const event = await WebCredentialHandler.receiveCredentialEvent();

    console.log('Wallet processing get() event:', event);

    document.getElementById('requestOrigin').innerHTML =
      event.credentialRequestOrigin;

    const vp = event.credentialRequestOptions.web.VerifiablePresentation;
    const query = Array.isArray(vp.query) ? vp.query[0] : vp.query;
    
    if (!query.type === 'QueryByExample') {
      throw new Error(
        'Only QueryByExample requests are supported in demo wallet.'
      );
    }

    const requestReason = query.credentialQuery.reason;
    document.getElementById('requestReason').innerHTML = requestReason;

    refreshUserArea({
      shareButton: {
        text: 'Share',
        sourceEvent: event,
      },
    });

    // const requestOptions = event.credentialRequestOptions || {web:{}};
    // document.getElementById('queryContents').innerHTML = JSON.stringify(requestOptions.web, null, 2);

    // Respond button
    // document.getElementById('respondBtn').addEventListener('click', () => {
    //   const data = JSON.parse(document.getElementById('responseText').value);

    //   event.respondWith(
    //     Promise.resolve({ dataType: 'VerifiablePresentation', data })
    //   );
    // });

    // Cancel button
    // document.getElementById('cancelBtn').addEventListener('click', () => {
    //   event.respondWith(Promise.resolve({dataType: 'Response', data: 'error'}))
    // });
  }

  function addToWalletDisplay({ text, vc, button }) {
    const li = document.createElement('li');

    if (button) {
      const buttonNode = document.createElement('button');
      buttonNode.classList.add('text-white', 'bg-green-700', 'hover:bg-green-800' ,'focus:ring-4' ,'focus:ring-blue-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'mr-2', 'mb-2', 'mt-2');
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

  function loadWalletContents() {
    const walletContents = Cookies.get('walletContents');
    if (!walletContents) {
      return null;
    }
    return JSON.parse(atob(walletContents));
  }

  function loadCurrentUser() {
    return Cookies.get('username') || '';
  }

  function getCredentialType(vc) {
    if (!vc) {
      return 'Credential';
    }
    const types = Array.isArray(vc.type) ? vc.type : [vc.type];
    return types.length > 1 ? types.slice(1).join('/') : types[0];
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
      let issuer = '';
      if (typeof vc.issuer === 'object') issuer = vc.issuer.id;
      else issuer = vc.issuer;
      addToWalletDisplay({
        text: `${getCredentialType(vc)} from ${issuer}`,
        vc,
        button: shareButton,
      });
    }
  }

  function onDocumentReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function saveCurrentUser(name) {
    console.log('Setting login cookie.');
    Cookies.set('username', name, { path: '', secure: true, sameSite: 'None' });
  }

  function login() {
    saveCurrentUser('JaneDoe');
    refreshUserArea();
  }

  function logout() {
    resetCurrentUser();
    clearWalletDisplay();
    clearWalletStorage();
    refreshUserArea();
  }

  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR).then(handleGetEvent);

    onDocumentReady(() => {
      document.getElementById('loginButton').addEventListener('click', login);
      document.getElementById('logoutButton').addEventListener('click', logout);
    });
  });

  return (
    <div className='container'>
      <h1>Learner Application</h1>

      <div className='card-panel hidden' id='logged-in'>
        <div id='confirm'>
          <p>
            Origin <span id='requestOrigin'></span> is requesting information:
          </p>

          <p>
            <span id='requestReason'></span>
          </p>
        </div>

        <div id='userArea'>
          <p>
            <strong>Logged in:</strong> <span id='username'></span>
          </p>
          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='logoutButton'>
            Reset and Logout
          </button>

          <h6>Wallet Contents:</h6>
          <ol id='walletContents'></ol>
        </div>
      </div>

      <div className='card-panel hidden' id='logged-out'>
        <p>In order to share a credential with the requesting party:</p>

        <ol>
          <li>
            Register a wallet with your browser (for example, the{' '}
            <a href='https://wallet.example.chapi.io/'>Demo Wallet</a>).
          </li>
          <li>
            Click the <strong>Login</strong> button.
          </li>
          <li>Click on a Share button next to an appropriate credential.</li>
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

export default WalletUiGet;
