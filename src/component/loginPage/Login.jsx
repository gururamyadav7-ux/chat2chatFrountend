import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

import { LoginContext } from "../../Hook/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const { setUser } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true)
      const response = await api.post(
        "/user/login",
        formData
      );
      
      setUser(formData)

      const OTPData = response.data

      setSuccess(OTPData.success)
      setMessage(OTPData.message)

      setLoading(false)
      setFormData({
        email: "",
        password: "",
      });

      navigate("/Login-OtpVerification");
    } catch (err) {
      setError("OTP not send")
      console.log(err);
      navigate("/login");
    }
  };

  return (
    <div className="h-[93vh] bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* WhatsApp Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800">
          WordWav
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-7">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone</label>

            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              required
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none  w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          <span className="text-sm text-gray-600 font-bold mb-5">or</span>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-semibold active:scale-95 transition-all duration-150"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">Don't have an account?</p>

        <button
          onClick={() => navigate("/register")}
          className="block mx-auto mt-2 text-[#128C7E] font-semibold"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
