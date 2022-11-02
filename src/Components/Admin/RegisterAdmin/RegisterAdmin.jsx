import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Alert } from "../../Authentication/Alert/Alert";
import { toast } from "react-toastify";
import { createUsers } from "../../../redux/action/actionAuth";
import { useDispatch } from "react-redux";


export default function RegisterAdmin() {
  const { signup } = useAuth();
  const dispatch=useDispatch()

  const [user, setAdmin] = useState({
    email: "",
    password: "",
    rol: "admin",
    displayName:"",
    photoURL:"",
    favorites: []
  });


  const handleChange = ({ target: { name, value } }) => {
    setAdmin({ ...user, [name]: value })
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
      }
      dispatch(createUsers(credential))
      navigate("/profileAdmin");
    } catch (error) {
      if(error.code === 'auth/invalid-email') {
        toast.error("Email invalid", { position: 'bottom-right' })
      }
      if(error.code === 'auth/weak-password') {
        toast.info("Weak password", { position: 'bottom-right' })
      }
    }
  };

  return (
    <div class="container">
       
      <Link to= "/profileSuperAdmin">
      <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
      </Link>
    <div className="d-flex justify-content-center align-items-center vh-50">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
        <div class="d-flex justify-content-center">
          <img  alt="login-icon" style={{ height: "7rem" }} />
        </div>

        <div class="text-center fs-1 fw-bold">Register Admin</div>

        <div class="input-group mt-4">
          <div class="input-group-text loging">
            <img  alt="username-icon" className="user" style={{ height: "1rem" }} />
          </div>
          <input class="form-control bg-light" type="email" name='email' placeholder="youremail@company.tld" onChange={handleChange} />
        </div>

        <div class="input-group mt-1">
          <div class="input-group-text loging">
            <img  alt="password-icon" style={{ height: "1rem" }} />
          </div>
          <input class="form-control bg-light" type="password"  name='password' id="password" placeholder="***" onChange={handleChange} />
        </div>

        <div>
          <button className="btn btn-info login text-white w-100 mt-4 fw-semibold shadow-sm" type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}