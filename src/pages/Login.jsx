import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import walletImage from '../wallet-icon.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    // Login user from email and password here by FusionAuth
    let user = null;
    try{
      user = await axios.post('/api/login', {
        email,
        password,
      }); 
    }catch(err) {
      console.error(err);
    }
    if(!user) saveCurrentUser('JaneDoe');
    else saveCurrentUser(user.fullName);
    navigate('/home');
  };

  function saveCurrentUser(name) {
    console.log('Setting login cookie.');
    Cookies.set('username', name, { path: '', secure: true, sameSite: 'None' });
  }

  return (
    <div className='flex items-center text-center min-h-screen'>
      <div className='flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 w-[80vw] h-[100vh] m-auto'>
        <div className='p-32 py-6 text-white bg-blue-500 md:w-100 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly'>
          <div className='my-3 text-4xl font-bold tracking-wider text-center'>
            <p>Holder Wallet</p>
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
                htmlFor='email'
                className='text-sm font-semibold text-gray-500'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={() => setEmail(email)}
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
                onChange={() => setPassword(password)}
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
