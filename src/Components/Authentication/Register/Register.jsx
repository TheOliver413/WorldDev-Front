import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Alert } from "../Alert/Alert";
import "./Styles.css"
import { toast } from "react-toastify";
import loginico from "./login-icon.svg";
import userico from "./username-icon.svg"
import passwordico from "./password-icon.svg"
import { createUsers } from "../../../redux/action/actionAuth";
import { useDispatch } from "react-redux";



export default function Register() {
  const dispatch= useDispatch();
  const { signup, sendE, login, emailLink } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    rol:"user",
    displayName: "",
    photoURL: "",
    favorites:[]
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password, user.rol, user.displayName, user.photoURL, user.favorites);
      let credential= {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        id: user.uid,
        favorites: user.favorites
      }
      dispatch(createUsers(credential))
      navigate("/home")
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        toast.error("Email invalid", { position: 'bottom-right' })
      }
      if (error.code === 'auth/weak-password') {
        toast.info("Weak password", { position: 'bottom-right' })
      }
    }
  };

  // const handleSendEmailVerification = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await sendE(user.email)
  //     toast.info('We sent you an email. Check your inbox', { position: 'bottom-right' })
  //     navigate("/");
  //     await login(user.email, user.password)
  //     await emailLink(user.email, user.password)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
        <div class="d-flex justify-content-center">
          <img src={loginico} alt="login-icon" style={{ height: "7rem" }} />
        </div>

        <div class="text-center fs-1 fw-bold">Register</div>

        <div class="input-group mt-4">
          <div class="input-group-text loging">
            <img src={userico} alt="username-icon" className="user" style={{ height: "1rem" }} />
          </div>
          <input class="form-control bg-light" type="email" name='email' placeholder="youremail@company.tld" onChange={handleChange} />
        </div>

        <div class="input-group mt-1">
          <div class="input-group-text loging">
            <img src={passwordico} alt="password-icon" style={{ height: "1rem" }} />
          </div>
          <input class="form-control bg-light" type="password" name='password' id="password" placeholder="*****" onChange={handleChange} />
        </div>

        {/* <div>
          {
            !user.email || !user.password || user.password.length < 6 ?
            <button onClick={handleSendEmailVerification} className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" disabled type="submit">Register</button>
            :
              <button onClick={handleSendEmailVerification} className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" type="submit">Register</button>
          }
        </div> */}

        <button className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" type="submit">Register</button>

        <div class="d-flex gap-1 justify-content-center mt-1">
          <div>Do you already have an account</div>
          <Link to="/login">
            <a href="#" class="login-text text-decoration-none fw-semibold">Login</a>
          </Link>
        </div>
      </form>
    </div>
  );
}