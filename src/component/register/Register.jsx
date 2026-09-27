import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
// hook 
import { UserContext } from "../../Hook/UserContext";


const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });


  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

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
        "/user/register",
        formData
      );

      setUser(formData)
      const OTPData = response.data

      setSuccess(OTPData.success)
      setMessage(OTPData.message)

      setLoading(false)

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/OtpVerification")
    } catch (err) {
      setError("Server err")
      console.log(err);
      navigate("/register");
    }
  };

  console.log(loading);
  return (
    <div className="h-[93vh] bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
        </div>

        {success && (
          <p className=" fixed top-4 left-1/2 z-40  text-green-500 text-sm mb-4">
            {message}
          </p>
        )}

        <h1 className="text-3xl font-semibold text-center">Create Account</h1>

        <p className="text-gray-500 text-center mt-2 mb-6">Join WordWav</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>

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

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#25D366]"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {message && <p className=" fixed top-2  right-1/2  translate-x-1/2 ">{message}</p>}

          {/* Success */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-semibold active:scale-95 transition-all duration-150"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?
        </p>

        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-2 text-[#128C7E] font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
