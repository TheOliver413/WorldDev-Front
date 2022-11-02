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

  const [showPwd, setShowPwd] = useState(false)

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
      if (error.code === 'auth/wrong-password') {
        toast.error('Wrong password', { position: 'bottom-right' })
      }
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found', { position: 'bottom-right' })
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
      navigate("/login");
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
          <div className="input-group-text login">
            <img src={userico} alt="username-icon" className="user" style={{ height: "1rem" }} />
          </div>
          <input className="form-control bg-light" type="email" name="email" id="email" placeholder="youremail@company.tld" onChange={handleChange} />
        </div>

        <div className="input-group mt-1">
          <div className="input-group-text login">
            <img src={passwordico} alt="password-icon" style={{ height: "1rem" }} />
          </div>
          <input className="form-control bg-light" type={showPwd ? "text" : "password"} name="password" id="password" placeholder="*************" onChange={handleChange} />
          <div className="input-group-text loging" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>}
          </div>
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

        <div className="d-flex gap-1 justify-content-center mt-1">
          <div>By signing in or creating an account, you agree to our
            <Link to="/terms">
              <a href="#" className="login-text text-decoration-none fw-semibold">Terms and Conditions</a>
            </Link> and
            <Link to="/privacy">
              <a href="#" className="login-text text-decoration-none fw-semibold"> Privacy Policy</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}