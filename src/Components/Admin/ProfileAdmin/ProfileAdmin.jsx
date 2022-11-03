import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from "../../../redux/action/actionAuth";

const ProfileAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datosA = useSelector((state) => state.reducerAuth.users);
  const { user } = useAuth();
  console.log('user',user);
  console.log('datosA',datosA);

  useEffect(() => {
    if (user && user.hasOwnProperty("uid")) {
      dispatch(getDetailUser(user.uid));
    }
  }, [user]);

  return (
    <div className="profileUser-container d-flex flex-column gap-0 w-75 mx-auto my-4 card p-4 p-md-5" style={{ maxWidth: "600px" }}>
      {datosA.rol === "admin" || datosA.rol === "superAdmin" ? (
        <div>
          {datosA.rol === "superAdmin" ? (
            <Link to="/profileSuperAdmin/adminTable">
              <button>Back</button>
            </Link>
          ) : null}

          <div className="d-flex flex-column flex-md-row align-items-md-center gap-4 mb-3 mb-md-4">
            {user?.photoURL
              ? <img src={user?.photoURL} alt={user?.displayName} />
              : <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
                  <path d="M124.688 120.062C117.781 108.062 104.812 100 90 100H70C55.1875 100 42.2188 108.062 35.3125 120.062C46.3125 132.312 62.25 140 80 140C97.75 140 113.688 132.281 124.688 120.062ZM160 80C160 124.188 124.188 160 80 160C35.8125 160 0 124.188 0 80C0 35.8125 35.8125 0 80 0C124.188 0 160 35.8125 160 80ZM80 85C92.4375 85 102.5 74.9375 102.5 62.5C102.5 50.0625 92.4375 40 80 40C67.5625 40 57.5 50.0625 57.5 62.5C57.5 74.9375 67.5625 85 80 85Z" fill="#56A5AF" />
                </svg>
            }
            <h2 className="overflow-auto col">Welcome, {user?.displayName || datosA.displayName ? user?.displayName || datosA.displayName : datosA.email}</h2>
          </div>

          <h4>Personal info</h4>
          <p className="my-1">Email: {datosA.email}</p>
          <p className="my-1">Rol: {datosA.rol}</p>
          <p className="my-1">Date of birth: {datosA.dateOfBirth}</p>
          <p className="my-1">DNI: {datosA.dni}</p>
          <p className="my-1">Hotel: {datosA.hotel}</p>
          <p className="my-1">Address: {datosA.address}</p>
          <p className="my-1">City: {datosA.city}</p>
          <p className="my-1">Country: {datosA.country}</p>
          
          <div className="d-flex flex-column gap-2 mt-3">
            {datosA?.hotel ? (
              <button onClick={() => navigate('/profileAdmin/formsAdmin')} className="btn btn-primary" type="button">
                Edit Forms
              </button>
            ) : (
              <button disabled className="btn btn-primary" type="button">
                Edit Forms
              </button>
            )}
            <button onClick={()=> navigate('/stock')} className="btn btn-primary" type="button">
              Bookings
            </button>
            <button onClick={() => navigate('/userTable')} className="btn btn-primary" type="button">
              User Table
            </button>
          </div>
          {/* <div>
            <button
              onClick={() => navigate("/favorite")}
              type="button"
              className="btn btn-primary"
            >
            Favorites
            </button>
          </div> */}
        </div>
      ) : (
        datosA.rol === "user" ? (
          <button
            className="btn btn-primary mt-1 mx-5 my-4"
            type="button"
            onClick={() => navigate(-1)}
          >
            Unauthorized entry, go back
          </button>
        ) : (
          <h2 className="my-4 py-4">Administrator created successfully</h2>
        )
      )}
    </div>
  );
};

export default ProfileAdmin;
