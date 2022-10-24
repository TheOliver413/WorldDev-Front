import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Alert } from "../Alert/Alert";

import "./Styles.css"
import { toast } from "react-toastify";

import loginico from "./login-icon.svg";
import userico from "./username-icon.svg"
import passwordico from "./password-icon.svg"
import googleico from "./google-icon.svg"

export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate('/home')
    } catch (error) {
      console.log(error.code)
      if(error.code === 'auth/wrong-password'){
        setError('Wrong password')
      }
      if(error.code === 'auth/user-not-found'){
        setError('User not found')
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return toast.error('Write an email to reset password', { position: 'bottom-right' })

    try {
      await resetPassword(user.email);
      toast.info('We sent you an email. Check your inbox', { position: 'bottom-right' })
    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
        <div className="d-flex justify-content-center">
          <img src={loginico} alt="login-icon" style={{ height: "7rem" }} />
        </div>

        <div className="text-center fs-1 fw-bold">Login</div>

        <div className="input-group mt-4">
          <div className="input-group-text loging">
            <img src={userico} alt="username-icon" className="user" style={{ height: "1rem" }} />
          </div>
          <input className="form-control bg-light" type="email" name="email" id="email" placeholder="youremail@company.tld" onChange={handleChange} />
        </div>

        <div className="input-group mt-1">
          <div className="input-group-text loging">
            <img src={passwordico} alt="password-icon" style={{ height: "1rem" }} />
          </div>
          <input className="form-control bg-light" type="password" name="password" id="password" placeholder="*************" onChange={handleChange} />
        </div>

        <div className="d-flex justify-content-around mt-1">
          {/* <div className="d-flex align-items-center gap-1">
            <input className="form-check-input" type="checkbox" />
            <div className="pt-1" style={{ "font-size": "0.9rem" }}>Remember me</div>
          </div> */}

          <div className="pt-1">
            <a href="#" className="login-text text-decoration-none fw-semibold fst-italic" style={{ "font-size": "0.9rem" }} onClick={handleResetPassword}>Forgot
              your password?</a>
          </div>
        </div>

        <div>
          {
            !user.email || !user.password || user.password.length < 6 ?
              <button className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" type="submit" disabled>Login</button>
              :
              <button className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" type="submit">Login</button>
          }
        </div>

        <div className="d-flex gap-1 justify-content-center mt-1">
          <div>Don't have an account?</div>
          <Link to="/register">
            <a href="#" className="login-text text-decoration-none fw-semibold">Register</a>
          </Link>
        </div>

        <div className="p-3">
          <div className="border-bottom text-center" style={{ height: "0.9rem" }}>
            <span className="bg-white px-3">or</span>
          </div>
        </div>

        <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm">
          <img src={googleico} alt="google-icon" style={{ height: "1.6rem" }} />
          <div className="fw-semibold text-secondary" onClick={handleGoogleSignin}>Continue with Google</div>
        </div>

      </form>
    </div>
  );
}