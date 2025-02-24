// import { useEffect, useState, useContext } from "react";
// import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Context from "../context/AppContext";
// import { toast } from "react-toastify";
// import logo from "../assets/image.png";


// function SignupStep1() {
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [activeSection, setActiveSection] = useState("PHONE");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
//   const navigate = useNavigate();

//   useEffect(() => {
//     initOTPless(handleUserData);
//   }, []);

//   const handleUserData = async (otplessUser) => {
//     if (hasNavigated.current) return;

//     const identityValue = otplessUser?.identities?.[0]?.identityValue || "No Identity Found";
//     setMobileNumber(identityValue);
//     setGlobalMobileNumber(identityValue);
  
//     try {
//       const response = await axios.post("/api/auth/signup", { phoneNumber: identityValue });
//       if (response.data.userExists) {
//         navigate("/login");
//       } else {
//         toast.success("OTP verified and login successful");
//         localStorage.setItem("token", response.data.token);
//         navigate("/success-signup");
//       }
//     } catch (error) {
//       console.error("Error checking user existence:", error);
//       toast.error("User already exists, please login.");
//     }
  
//     localStorage.setItem("otplessUser", JSON.stringify(otplessUser));
//   };

//   const switchActiveSection = (e) => {
//     setActiveSection(e.target.value);
//     setPhone("");
//     setEmail("");
//   };

//   const handleProceed = async () => {
//     try {
//       if (activeSection === "PHONE"){
//       const res = await Authenticate({ channel: "PHONE", phone });
//       if (res.success) {
//         setShowOtpInput(true);
//         toast.success("OTP sent to your phone. Check SMS or WhatsApp.");
//       }
//      }
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       toast.error("An error occurred during authentication.");
//     }
//   };

//   const handleVerifyOTP = async () => {
//     try {
//       const res = await verifyOTP({ channel: "PHONE",activeSection, otp, phone });
//       if (res.success) {
//         setOtp("Verified");
//         toast.success("OTP verified successfully.");
//         navigate("/success-signup");
//       } else {
//         toast.error("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during OTP verification:", error);
//       toast.error("An error occurred during OTP verification.");
//     }
//   };

//   return (
//     <div className="p-4 rounded-xl max-w-md mx-auto bg-white shadow-lg">
//       <div className="text-center">
//                 <img src={logo} alt="logo" className="mx-auto w-[170px]" />
        
//         <div className="text-gray-700 font-medium text-sm">
//           Welcome back to <span className="text-gray-900 font-semibold">Mobile OTP Authentication
//           </span>, please log in to continue
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-center w-full space-y-6 mt-4">
//         {!showOtpInput ? (
//           <div id="mobile-section" className="w-full">
//             <input
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
//               placeholder="Enter mobile number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <button
//               onClick={handleProceed}
//               className="w-full py-3 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
//             >
//               Proceed
//             </button>
//           </div>
//         ) : (
//           //otpinput
//           <div id="otp-section" className="w-full">
//             <input
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               minLength={6}
//               maxLength={6}
//             />
//             <button
//               onClick={handleVerifyOTP}
//               className="w-full py-3 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         <button
//           onClick={() => Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })}
//           className="w-full py-3 bg-green-600 text-white rounded-lg mt-3 hover:bg-green-700 transition duration-200 font-semibold shadow-md flex items-center justify-center"
//         >
//           Authenticate with WhatsApp
//         </button>
        
//         <div className="flex items-center justify-between mt-4 w-full">
//         <hr className="flex-1 bg-gray-300 h-[1px]" />
//         <span className="text-gray-500 text-xs px-2">
//         Already have an account?</span>
//         <hr className="flex-1 bg-gray-300 h-[1px]" />
//         </div>
//         <button
//   onClick={() => {
//     navigate("/");
//     location.reload();
//   }}
//   className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg mt-3 hover:bg-gray-300 transition duration-200 font-semibold shadow-md"
// >
//   Login
// </button>

//       </div>
//       <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
//         Already have an account? Login to access your personalized dashboard.
//       </div>
//     </div>
//   );
// }

// export default SignupStep1;



// ------api workin g

import { useEffect, useState, useContext, useRef } from "react";
import { Authenticate, initOTPless, verifyOTP } from "../utils/initOtpless";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../context/AppContext";
import { toast } from "react-toastify";
import logo from "../assets/image.png";

function SignupStep1() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { setMobileNumber: setGlobalMobileNumber } = useContext(Context);
  const navigate = useNavigate();
  const hasNavigated = useRef(false); // Fix: Define hasNavigated to prevent errors

  useEffect(() => {
    initOTPless(handleUserData);
  }, []);

  const handleUserData = async (otplessUser) => {
    if (hasNavigated.current) return;

    const identityValue = otplessUser?.identities?.[0]?.identityValue || "No Identity Found";
    setPhone(identityValue);
    setGlobalMobileNumber(identityValue);

    try {
      const response = await axios.post("/api/auth/signup", { phoneNumber: identityValue });

      if (response.data.userExists) {
        toast.info("User already exists, redirecting to login.");
        navigate("/login");
      } else {
        toast.success("Signup successful! Redirecting...");
        localStorage.setItem("token", response.data.token);
        navigate("/success-signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }

    localStorage.setItem("otplessUser", JSON.stringify(otplessUser));
  };

  const handleProceed = async () => {
    if (!phone) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      const res = await Authenticate({ channel: "PHONE", phone });

      if (res.success) {
        setShowOtpInput(true);
        toast.success("OTP sent successfully. Check SMS or WhatsApp.");
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("Authentication failed. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const res = await verifyOTP({ channel: "PHONE", otp, phone });

      if (res.success) {
        toast.success("OTP verified successfully!");
        await storePhoneNumber(phone); // Store phone number in the database
        navigate("/success-signup");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("OTP verification failed. Try again.");
    }
  };

  const storePhoneNumber = async (phoneNumber) => {
    try {
      await axios.post("/api/auth/store-phone", { phoneNumber });
    } catch (error) {
      console.error("Error storing phone number:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl max-w-md mx-auto bg-white shadow-lg">
      <div className="text-center">
        <img src={logo} alt="logo" className="mx-auto w-[170px]" />
        <div className="text-gray-700 font-medium text-sm">
          Welcome back to <span className="text-gray-900 font-semibold">Mobile OTP Authentication</span>, please log in to continue.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full space-y-6 mt-4">
        {!showOtpInput ? (
          <div id="mobile-section" className="w-full">
            <input
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
        ) : (
          <div id="otp-section" className="w-full">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
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
          onClick={() => Authenticate({ channel: "OAUTH", channelType: "WHATSAPP" })}
          className="w-full py-3 bg-green-600 text-white rounded-lg mt-3 hover:bg-green-700 transition duration-200 font-semibold shadow-md flex items-center justify-center"
        >
          Authenticate with WhatsApp
        </button>

        <div className="flex items-center justify-between mt-4 w-full">
          <hr className="flex-1 bg-gray-300 h-[1px]" />
          <span className="text-gray-500 text-xs px-2">Already have an account?</span>
          <hr className="flex-1 bg-gray-300 h-[1px]" />
        </div>

        <button
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg mt-3 hover:bg-gray-300 transition duration-200 font-semibold shadow-md"
        >
          Login
        </button>
      </div>
      
      <div className="text-center mt-4 text-[#5B6572] text-sm font-normal">
        Already have an account? Login to access your personalized dashboard.
      </div>
    </div>
  );
}

export default SignupStep1;
