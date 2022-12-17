import { useState } from "react";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [state, setState] = useState("");
  return (
    <OtpInput
      value={state}
      onChange={(otp: any) => setState(otp)}
      numInputs={6}
      separator={<span>-</span>}
    />
  );
};

export default Otp;
