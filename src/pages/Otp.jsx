import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Otp = () => {
  document.body.style= "background-color:#EBEEF7";
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // const aadhaar = Cookies.get('aadhaar');
    if(otp.length === 4){
      navigate('/login')
    }
    // try{
    //   const res = await axios.post('http://64.227.185.154:3000/kyc/register', {
    //   otp,
    //   name,
    //   password,
    //   aadhaar
    // })
    // if(res){
    //   Cookies.remove('aadhaar', { path: '' });
    //   navigate('/login');
    // }
    // }catch(err){
    //   console.log(err);
    // }
  }

  return (
    <div className="bg-white font-medium text-blue-500 text-xl text-center md:w-[40vw] sm:w-[50vw] lg:w-[400px] m-auto mt-20 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <h1 className="pt-10">Enter Your OTP</h1>
      <div className="flex flex-col w-fit m-auto p-4">
        <input
          className="outline-blue-500 border-2 m-2 p-1 text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={4}
          required
        />
        <h1>Username</h1>
        <input
          type="name"
          className="outline-blue-500 border-2 m-2 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h1>Password</h1>
        <input
          type="password"
          className="outline-blue-500 border-2 m-2 p-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <h1>Aadhaar</h1>
        <input
          type="id"
          className="outline-blue-500 border-2 m-2 p-1"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required
        /> */}
        <div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded w-fit" onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
