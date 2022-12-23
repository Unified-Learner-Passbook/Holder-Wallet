import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [aadhaar, setAadhaar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try{
      const res = await axios.post('https://localhost:3001/kyc/register', {
      otp,
      name,
      password,
      // aadhaar
    })
    if(res){
      navigate('/login');
    }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="text-xl text-center md:w-[40vw] sm:w-[50vw] m-auto mt-20 p-10 rounded-lg	shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <h1>Enter Your OTP</h1>
      <div className="items-center flex flex-col w-[300px] m-auto">
        <input
          className="border-2 m-2 p-1 text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={4}
          required
        />
        <h1>Username</h1>
        <input
          type="name"
          className="border-2 m-2 p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h1>Password</h1>
        <input
          type="password"
          className="border-2 m-2 p-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <h1>Aadhaar</h1>
        <input
          type="id"
          className="border-2 m-2 p-1"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required
        /> */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default Otp;
