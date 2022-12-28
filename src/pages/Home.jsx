import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as CredentialHandlerPolyfill from 'credential-handler-polyfill';
import * as WebCredentialHandler from 'web-credential-handler';
import Cookies from 'js-cookie';
import Certificate from '../templates/certificate';

const Home = () => {
  const MEDIATOR =
    'https://authn.io/mediator' +
    '?origin=' +
    encodeURIComponent(window.location.origin);
  const navigate = useNavigate();

  // function login() {
  //   saveCurrentUser('JaneDoe');
  //   refreshUserArea();
  // }

  function logout() {
    resetCurrentUser();
    // clearWalletDisplay();
    // clearWalletStorage();
    refreshUserArea();
    navigate('/login');
  }

  function refreshUserArea({ shareButton } = {}) {
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
      return addToWalletDisplay({ text: 'No Learning History Yet!' });
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

  /**
   * Wallet Storage / Persistence
   */

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
      buttonNode.setAttribute('id', vc.id);
      buttonNode.setAttribute(
        'class',
        'bg-[#18224E] hover:bg-[#111837] text-white font-bold py-1 px-4 rounded w-fit'
      );
      buttonNode.appendChild(document.createTextNode(button.text));
      li.appendChild(buttonNode);
    }
    if (text === 'No Learning History Yet!') {
      li = document.createElement('p');
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

        // code to open credential in new tab
        // let newtabvp = JSON.stringify(vp, null, 2);
        // let x = window.open();
        // x.document.write('<html><body><pre>' + newtabvp + '</pre></body></html>');
        // x.document.close();

        // code to view certificate
        document.getElementById('certificate').classList.remove('hidden');
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

  /**
   * User Storage / Persistence
   */

  function loadCurrentUser() {
    return Cookies.get('username') || '';
  }

  // function saveCurrentUser(name) {
  //   console.log('Setting login cookie.');
  //   Cookies.set('username', name, { path: '', secure: true, sameSite: 'None' });
  // }

  function resetCurrentUser() {
    console.log('Clearing login cookie.');
    Cookies.remove('username', { path: '' });
  }

  function onDocumentReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  useEffect(() => {
    if (loadCurrentUser() === '') {
      alert('Please Login first.');
      navigate('/login');
      return;
    }
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
    onDocumentReady(() => {
      document.getElementById('logoutButton').addEventListener('click', logout);

      refreshUserArea({
        shareButton: {
          text: 'View',
        },
      });
    });
  });

  // 3001/did/resolve/id // to resolve a did into document

  return (
    <div className='flex pr-4 bg-[#FF7040] min-h-screen max-h-screen text-left text-white'>
      <div
        onClick={() =>
          document.getElementById('certificate').classList.add('hidden')
        }
        id='certificate'
        className='hidden absolute z-10 l-0 r-0 mt-5 w-full'>
        <Certificate />
      </div>
      <div className='flex w-full min-h-screen'>
        <div className='flex flex-col bg-[#18224E] w-8/12 md:w-3/12 text-center text-xl font-bold'>
          <div className='mt-4 border-b-4 text-2xl p-4 flex cursor-pointer'>
            <svg
              className='w-10 h-12'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 35 35'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'></path>
            </svg>
            <p className=''>Wallet</p>
          </div>
          <div className='mt-4 p-4 flex rounded bg-[#111837] m-2  cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 35 35'
              strokeWidth='1.5'
              stroke='green'
              className='w-10 h-10'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5'
              />
            </svg>
            <p className='text-green-300'>Learning History</p>
          </div>
          <div className='mt-4 p-4 flex cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 35 35'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-10 h-10'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0'
              />
            </svg>
            <p className=''>Achievements</p>
          </div>
          <div className='mt-4 p-4 flex cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 35 35'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-10 h-10'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
              />
            </svg>
            <p className=''>Skills</p>
          </div>
          <div className='mt-4 p-4 flex cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 35 35'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-10 h-10'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
              />
            </svg>
            <p className=''>Work History</p>
          </div>
          <button
            onClick={logout}
            className='flex items-center justify-center mt-auto h-fit text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-4'
            id='logoutButton'>
            Logout
            <svg
              className='w-10 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
            </svg>
          </button>
        </div>
        <div className='block w-full p-6'>
          <h5 className='mb-2 text-4xl font-bold text-center'>
            Learning History
          </h5>

          <div className='block w-full my-2 text-center p-6' id='logged-in'>
            <span>
              <h6 className='text-xl'>Wallet Contents:</h6>
              <ol className='list-decimal p-6' id='walletContents'>
                <li>none</li>
              </ol>
            </span>
          </div>

          {/* <div
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
            onClick={login}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2'
            id='loginButton'>
            Login
          </button>
        </div> */}
        </div>
      </div>
      <div className='flex text-center w-2/12 pt-2'>
        <svg
          className='w-10 h-10 cursor-pointer'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 35 35'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'></path>
        </svg>
        <strong className='pr-1'>Welcome </strong> <span id='username'></span>
      </div>
    </div>
  );
};

export default Home;
