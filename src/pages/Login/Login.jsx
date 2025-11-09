import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const { login, loginWithGoogle, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser) {
        navigate(location.state ? location.state : "/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen px-4 sm:px-6 md:px-8">
      <div className="py-2 my-12 card bg-base-100 w-full max-w-sm shadow-2xl">
        <h2 className="font-bold text-2xl text-center pt-5">Login</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full"
              required
            />

            <div>
              <Link
                className="text-secondary link link-hover text-sm sm:text-base"
                to="/auth/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            {/* {error && (
              <p className="text-red-500 text-sm mt-2 break-words">{error}</p>
            )} */}

            <button type="submit" className="btn btn-primary mt-4 w-full">
              Login
            </button>

            <button
              onClick={handleLoginWithGoogle}
              type="button"
              className="btn bg-[#1A77F2] text-white border-[#e5e5e5] w-full flex items-center justify-center gap-2 mt-3"
            >
              <svg
                className="rounded-xl"
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            <p className="font-semibold text-center pt-5 text-sm sm:text-base">
              Don’t Have An Account?{" "}
              <Link className="text-secondary" to="/auth/signup">
                Signup
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
