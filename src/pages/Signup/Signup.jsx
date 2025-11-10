import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const { Signup, loginWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const photo = form.photo.value.trim();

    if (name.length < 5) {
      setNameError('Name should be more than 5 characters');
      return;
    } else {
      setNameError('');
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 6 characters, including one uppercase, one number, and one special character'
      );
      return;
    } else {
      setError('');
    }

    try {
      await Signup({ name, email, password, photoURL: photo });
      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.error(err);
      setError(err.message || 'Signup failed');
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await loginWithGoogle();
      
      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-2 my-12">
        <h2 className="font-semibold text-2xl text-center">Signup your account</h2>
        <form onSubmit={handleSignup} className="card-body px-4">
          <fieldset>
            <label className="label">Name</label>
            <input name="name" type="text" className="input w-full" placeholder="Name" required />
            {nameError && <span className="text-red-500">{nameError}</span>}

            <label className="label mt-4">Email</label>
            <input name="email" type="email" className="input w-full" placeholder="Email" required />

            <label className="label mt-4">Photo URL</label>
            <input name="photo" type="text" className="input w-full" placeholder="Photo URL" />

            <label className="label mt-4">Password</label>
            <input name="password" type="password" className="input w-full" placeholder="Password" required />
            {error && <span className="text-red-500">{error}</span>}

            <button type="submit" className="btn btn-primary w-full mt-4">
              Signup
            </button>

            <button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="btn bg-[#1A77F2] my-1 w-full text-white border-[#e5e5e5] flex items-center justify-center gap-2"
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
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Signup with Google
            </button>

            <p className="font-semibold text-center pt-5">
              Already have an account?{' '}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
