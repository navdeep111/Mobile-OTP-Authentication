import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../context/AppContext";
import { toast } from "react-toastify";
import logo from "../assets/image.png";

function LoginStep1() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [activeSection, setActiveSection] = useState("PHONE");
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const hasNavigated = useRef(false);
  const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    initOTPless(handleUserData);
  }, []);

  const handleUserData = async (otplessUser) => {
    if (hasNavigated.current) return;

    const identityValue =
      otplessUser?.identities?.[0]?.identityValue || "No Identity Found";

    setGlobalMobileNumber(identityValue);

    try {
      const response = await axios.post("/api/auth/login", {
        phoneNumber: identityValue,
      });

      if (response.data.message === "Login successful") {
        hasNavigated.current = true;
        toast.success("OTP verified and login successful");
        localStorage.setItem("token", response.data.token);
        navigate("/success-login");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      toast.error("User does not exist, please signup.");
    }

    localStorage.setItem("otplessUser", JSON.stringify(otplessUser));
  };
  const switchActiveSection = (e) => {
    setActiveSection(e.target.value);
    setPhone("");
    setEmail("");
  };

  const handleProceed = () => {
    Authenticate({ channel: "PHONE", phone })
      .then((res) => {
        if (res.success) {
          toast.success("OTP sent on your phone. Check message or WhatsApp");
          setShowOTPInput(true); // Show OTP input after sending OTP
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  const handleVerifyOTP = () => {
    verifyOTP({ channel: "PHONE", activeSection, otp, phone })
      .then((res) => {
        if (res.success) {
          toast.success("OTP verified successfully!");
          setOtp("Verified");
        }
      })
      .catch((error) => {
        console.error("OTP verification error:", error);
        toast.error("Invalid OTP, please try again.");
      });
  };

  return (
    <div className="p-4 rounded-xl max-w-md mx-auto bg-white shadow-lg">
      <div className="text-center">
        <img src={logo} alt="logo" className="mx-auto w-[170px]" />
        <div className="text-gray-700 font-medium text-sm">
          Welcome back to{" "}
          <span className="text-gray-900 font-semibold">
            Mobile OTP Authentication
          </span>
          , please log in to continue
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-6 mt-4">
        {/* Mobile Number Input */}
        {!showOTPInput && activeSection === "PHONE" && (
          <div id="mobile-section" className="w-full">
            <input
            id="mobile-input"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handleProceed}
              className="w-full py-3 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
            >
              Proceed
            </button>
          </div>
        )}

        {/* OTP Input */}
        {showOTPInput && (
          <div id="otp-section" className="w-full">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
              id="otp-input"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              minLength={6}
              maxLength={6}
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
            >
              Verify OTP
            </button>
          </div>
        )}

        <button
          onClick={() =>
            Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })
          }
          className="w-full py-3 bg-green-600 text-white rounded-lg mt-3 hover:bg-green-700 transition duration-200 font-semibold shadow-md flex items-center justify-center"
        >
          Authenticate with WhatsApp
        </button>

        <div className="flex items-center justify-between mt-4 w-full">
          <hr className="flex-1 bg-gray-300 h-[1px]" />
          <span className="text-gray-500 text-xs px-2">
            Don't have an account?
          </span>
          <hr className="flex-1 bg-gray-300 h-[1px]" />
        </div>

        <button
  onClick={() => {
    navigate("/signup");
    location.reload(true);
    
  }}
  className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg mt-3 hover:bg-gray-300 transition duration-200 font-semibold shadow-md"
>
  Sign Up
</button>


        
      </div>
      <div className="text-center mt-4 text-gray-600 text-sm font-normal">
          Don't have an account? Sign up to access your personalized dashboard.
        </div>
    </div>
  );
}

export default LoginStep1;
