import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call API to login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Check if email is verified
        if (!user.emailVerified) {
          // Set error if email is unverified
          setError("You must verify your email address");
          setSuccess(false);
        } else {
          setSuccess(true);
          setError(""); // Clear any previous errors
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setSuccess(false);

        // Set error message for failed login attempt
        setError("Password and Email didn't match");
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      console.log("Please insert an email address");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Email has been sent");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="btn btn-xs absolute right-4 top-12"
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </button>
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div>
              {success && (
                <p className="text-green-500 text-center mt-4">
                  You have successfully logged in
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
