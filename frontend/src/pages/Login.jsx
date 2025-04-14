import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      onLogin(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left side - Login form */}
        <div className="w-full lg:w-1/2 px-12 py-16">
          <div className="flex items-center mb-8">
            <img
              src="https://i.pinimg.com/736x/32/82/73/328273217d2dde005beae7b3cc19fce4.jpg"
              alt="Logo"
              className=" h-28 w-32 mr-2"
            />
            <span className="text-2xl font-bold text-gray-800">
              BookExchange
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Log in</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email or Phone number
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Log in
            </button>

            <div className="text-center">
              <span className="text-gray-600">Not a member? </span>
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:block lg:w-1/2 bg-purple-50 p-12">
          <div className="flex justify-center items-center h-full">
            <img
              src="https://i.pinimg.com/236x/6a/04/64/6a0464ce6ac6d31609f350d536c0519f.jpg"
              alt="Reading illustration"
              className=" w-96 h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
