import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import walletImage from '../wallet-img.png'

const Register = () => {
  const [aadhaar, setAadhaar] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Create user from email and password here
    try {
      const res = await axios.post('http://localhost:3001/kyc/triggerKyc', {
        aadhaar
        // password
      });
      if(res){
        navigate('/otp');
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-200 justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 w-[80vw] h-[80vh]"
      >
        <div
          className="p-4 py-6 text-white bg-blue-500 md:w-100 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Holder Wallet</a>
          </div>
          <img className="w-[65%] m-auto" src={walletImage}/>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1 m-auto">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Registration</h3>
          <form action="#" className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Aadhaar Number</label>
              <input
                type="aadhaar"
                id="aadhaar"
                onChange={(e) => setAadhaar(e.target.value)}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-4/6 m-auto"
              />
            </div>
            {/* <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-4/6 m-auto"
              />
            </div> */}
            <div>
              <button
                type="submit"
                onClick={handleClick}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4 w-7/12 m-auto"
              >
                Register
              </button>
              <p>Already have an account? <a className='text-blue-600 hover:underline' href="/login">Login here.</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
