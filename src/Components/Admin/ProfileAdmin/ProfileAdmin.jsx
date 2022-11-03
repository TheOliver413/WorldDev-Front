import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from '../../../redux/action/actionAuth'

const ProfileAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const datosA = useSelector(state => state.reducerAuth.users)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [user])



  return (
    <div>
      {
        datosA.rol === 'admin' || datosA.rol === 'superAdmin' ?
          <div>
            <div>
              {
                datosA.rol === "superAdmin" ?
                  <Link to='/profileSuperAdmin/adminTable'>
                    <button>Back</button>
                  </Link> : null
              }
            </div>
            <div>
              <h2>{datosA.name} {datosA.lastname}</h2>
            </div>
            <div>
              <h3>Data</h3>
              <h4>Email: {datosA.email}</h4>
              <h4>Rol: {datosA.rol}</h4>
              <h4>Date of birth: {datosA.dateOfBirth}</h4>
              <h4>DNI: {datosA.dni}</h4>
              <h4>Hotel: {datosA.hotel}</h4>
              <h4>Address: {datosA.address}</h4>
              <h4>City: {datosA.city}</h4>
              <h4>Country: {datosA.country}</h4>
            </div>
            <div>
              {
                datosA?.hotel
                  ? <Link to='/profileAdmin/formsAdmin'>
                    <button className="btn btn-primary mt-1" type="button">Edit Forms</button>
                  </Link>
                  :
                  <button disabled className="btn btn-primary mt-1" type="button">Edit Forms</button>

              }
            </div>
            <div>
              <Link to='/stock'>
                <button className="btn btn-primary mt-1" type="button">Bookings</button>
              </Link>
            </div>
            <div>
              <Link to='/userTable'>
                <button className="btn btn-primary mt-1" type="button">User Table</button>
              </Link>
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
          </div> :
          <>
            {
              datosA.rol === 'user' ? <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button> : <h2>Successfully created administrator</h2>
            }
          </>
      }
    </div>
  );
};

export default ProfileAdmin;