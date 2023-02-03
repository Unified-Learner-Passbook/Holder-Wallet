import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import walletImage from '../wallet-icon.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    // Login user from email and password here by FusionAuth
    let user = null;
    try{
      user = await axios.post('https://auth.konnect.samagra.io/api/login', {
        username,
        password,
        applicationId: "a789504e-06e5-4213-b326-e6c75a7489e8",
      }, "kO_ehNNYDrHxu9TrpTEE57GvtfOomP14g1Dd85-POZE_Zcawjpf5k20_"); 
    }catch(err) {
      console.error(err);
    }
    if(!user) saveCurrentUser('Aakash');
    else saveCurrentUser(username);
    navigate('/home');
  };

  function saveCurrentUser(name) {
    console.log('Setting login cookie.');
    Cookies.set('username', name, { path: '', secure: true, sameSite: 'None' });
  }

  return (
    <div className='flex items-center text-center min-h-screen'>
      <div className='flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 w-[80vw] h-[100vh] m-auto'>
        <div className='lg:p-32 py-6 text-white bg-blue-500 md:w-100 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly'>
          <div className='my-3 text-4xl font-bold tracking-wider text-center'>
            <p>ULP Wallet</p>
          </div>
          
          <img className='w-[65%] m-auto' src={walletImage} alt='wallet-img' />
          <p className='mt-6 text-sm text-gray-300'>
            Read our terms and conditions
          </p>
        </div>
        <div className='p-5 bg-white md:flex-1 m-auto'>
          <h3 className='my-4 text-2xl font-semibold text-gray-700'>
            Account Login
          </h3>
          <form className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='name'
                className='text-sm font-semibold text-gray-500'>
                Username
              </label>
              <input
                type='name'
                id='name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-4/6 m-auto'
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='password'
                className='text-sm font-semibold text-gray-500'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-4/6 m-auto'
              />
            </div>
            <div>
              <button
                onClick={handleClick}
                className='w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4 w-7/12 m-auto'>
                Login
              </button>
              <p>
                Do not have an account?{' '}
                <a className='text-blue-600 hover:underline' href='/'>
                  Register here.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
