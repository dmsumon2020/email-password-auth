import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccess(false);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    const name = e.target.name.value;
    const photo = e.target.photo.value;

    {
      if (password.length < 6) {
        setErrorMessage("Password should be at least 6 characters long, okay?");
        return;
      }
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?[\]\\;',./`~|=+-]).{8,}$/;

    if (!passwordPattern.test(password)) {
      setErrorMessage(
        "Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character"
      );
      return;
    }

    if (!terms) {
      setErrorMessage("You must accept Terms and Conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setSuccess(true);

        // send verification email

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });

        // update profile

        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="photo"
                  placeholder="photo"
                  className="input input-bordered"
                  name="photo"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="btn btn-xs absolute right-4 top-12"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input type="checkbox" name="terms" className="checkbox" />
                  <span className="ml-2 label-text">
                    Accept our Terms & Conditions
                  </span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            {errorMessage && (
              <p className="w-10/12 mx-auto text-red-500 text-xl mb-8">
                {errorMessage}
              </p>
            )}
            {success && (
              <p className="w-10/12 mx-auto text-green-500 text-xl mb-8">
                You have successfully created an account
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
