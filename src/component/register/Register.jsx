import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/register";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => {
    return state.register;
  });

  console.log(success);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      await dispatch(registerUser(formData));
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/chat");
    } catch (err) {
      console.log(err);
      navigate("/register");
    }
  };
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">W</span>
          </div>
        </div>

        {success && (
          <p className=" fixed top-4 left-1/2 z-40  text-green-500 text-sm mb-4">
            {success}
          </p>
        )}

        <h1 className="text-3xl font-semibold text-center">Create Account</h1>

        <p className="text-gray-500 text-center mt-2 mb-6">Join WhatsApp</p>

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
