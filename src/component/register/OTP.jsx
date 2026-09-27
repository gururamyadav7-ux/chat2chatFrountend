
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// api Verifi
import { RegisterVeryfai } from "../../features/Register"
// Hook
import { UserContext } from "../../Hook/UserContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const OTP_LENGTH = 6;

const OtpVerification = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef([]);
    // Hook 
    const { user } = useContext(UserContext);
    const emailUser = user.email
    // Timer
    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Input change
    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Next input
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Paste OTP
    const handlePaste = (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pastedData) return;

        const newOtp = Array(OTP_LENGTH).fill("");

        pastedData.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        const nextIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    // Verify
    const handleVerify = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== OTP_LENGTH) {
            alert("Please enter complete OTP");
            return;
        }

        console.log("OTP:", finalOtp);

        const OTPData = {
            otp: finalOtp,
            email: emailUser
        }

        await dispatch(RegisterVeryfai(OTPData));
        navigate("/chat")
    };

    // Resend
    const handleResend = () => {
        if (timeLeft > 0) return;

        setOtp(Array(OTP_LENGTH).fill(""));
        setTimeLeft(60);

        inputRefs.current[0]?.focus();

        console.log("OTP Resend");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl top-10 left-10" />
            <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl bottom-10 right-10" />

            {/* OTP Card */}
            <div className="relative w-full max-w-md">
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-8 shadow-2xl">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-white text-center">
                        Verify OTP
                    </h1>

                    <p className="text-gray-400 text-center mt-3 text-sm">
                        Enter the 6-digit verification code
                    </p>

                    <p className="text-gray-500 text-center text-sm mt-1">
                        sent to your registered mobile number
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-2 sm:gap-3 mt-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="
                  w-11 h-14 sm:w-12 sm:h-14
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  text-white
                  text-center
                  text-xl
                  font-bold
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:bg-blue-500/10
                "
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <div className="text-center mt-6">
                        {timeLeft > 0 ? (
                            <p className="text-gray-400 text-sm">
                                Resend OTP in{" "}
                                <span className="text-blue-400 font-semibold">{timeLeft}s</span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResend}
                                className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        className="w-full mt-7
                                    py-3.5
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-purple-600
                                    text-white
                                    font-semibold
                                    shadow-lg
                                    shadow-blue-500/20
                                    hover:scale-[1.02]
                                    active:scale-[0.98]
                                    transition-all
                                    "
                    >
                        Verify & Continue
                    </button>

                    {/* Bottom */}
                    <p className="text-center text-gray-500 text-xs mt-6">
                        Didn't receive the code? Check your SMS inbox.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
