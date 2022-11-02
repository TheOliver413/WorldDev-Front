import React, { useEffect} from "react";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser} from '../../../redux/action/actionAuth'



const ProfileAdmin = () => {
  const dispatch= useDispatch()
  const datosA= useSelector(state => state.reducerAuth.users)
  const {user} = useAuth()

  console.log('useeeers', datosA)

  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      dispatch(getDetailUser(user.uid))
    }
   }, [user])

  return (
    <div>
      <div>

        {
        datosA.rol==="superAdmin"?
        <Link to='/profileSuperAdmin/adminTable'>
          <button>Back</button>
        </Link>:null
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
      
      {/* {
      datosA.rol==="superAdmin"?
      <div>
        <Link to='/profileAdmin/editAdmin'>
          <button>Edit</button>
        </Link>
      </div>:null
      } */}

      <div>
        <Link to='/profileAdmin/formsAdmin'>
          <button>Edit forms</button>        
        </Link>
      </div>

      <div>
        <Link to='/stock'>
          <button>Bookings</button>
        </Link>
      </div>

      <div>
        <Link to='/userTable'>
          <button>User Table</button>        
        </Link>
      </div>


    </div>
  );
};

export default ProfileAdmin;