import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/features/authSlice";
import { setCredentials } from "../../Redux/features/authState";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      // Save token to localStorage as backup
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("authUser", JSON.stringify(res.user));
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-100 lg:h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] p-4 lg:p-5 rounded-md">
        <div className="grid md:grid-cols-2 items-stretch gap-y-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto w-full p-4 md:p-6"
          >
            <div className="mb-8">
              <img
                src={logo}
                alt="Sastik Hospital"
                className="w-16 h-16 object-contain"
              />
              <h2 className="text-slate-900 text-2xl font-bold mt-3">
                Swastik Hospital
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Admin Portal — Login to continue
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" />
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      />
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                    </g>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full text-sm text-slate-900 bg-slate-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-slate-100 focus:border-blue-600 outline-none transition-all"
                  />
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full shadow-xl py-2 px-4 text-[15px] tracking-wide font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm mt-6 text-center text-slate-600">
                © {new Date().getFullYear()} Swastik Hospital. All rights
                reserved.
              </p>
            </div>
          </form>

          {/* Right image panel */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop"
              className="w-full h-full object-cover rounded-md"
              alt="hospital"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
