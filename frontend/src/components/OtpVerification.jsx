import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyOtpAndRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import FormContainer from "../components/FormContainer";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [verifyOtpAndRegister, { isLoading }] = useVerifyOtpAndRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const verificationData = {
        name: location.state.name,
        username: location.state.username,
        email: location.state.email,
        password: location.state.password,
        token: location.state.token,
        country: location.state.country,
        gender: location.state.gender,
        edu: location.state.edu,
        otp: otp.trim(),
      };

      const res = await verifyOtpAndRegister(verificationData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold">OTP Verification</h1>

      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label htmlFor="otp" className="block mb-1">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Verify OTP & Register
        </button>
      </form>
    </FormContainer>
  );
};

export default OtpVerification;
