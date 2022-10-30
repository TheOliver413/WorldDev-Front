import React, { useEffect} from "react";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser} from '../../../redux/action/actionAuth'



const ProfileUsers = () => {
  const dispatch= useDispatch()
  const datos= useSelector(state => state.reducerAuth.users)
  const {user} = useAuth()


  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      dispatch(getDetailUser(user.uid))
    }
   }, [user])

  return (
    <div>
      <div>
        <img src={datos.photoURL ? datos.photoURL : "https://www.clarkstontolldentalpractice.com/wp-content/uploads/2020/06/default-img-2-1.jpg"} class="rounded mx-auto d-block" alt="Cinque Terre"></img>
      </div>
      <div class="form-group col-md-6">
        <h1>Welcome {datos.name? datos.name : datos.email}!</h1>
      </div>
      <div>
        <h2>{datos.name} {datos.lastname}</h2>
      </div>
      <div>
        <h3>Mis datos</h3>
        <h4>Address: {datos.address}</h4>
        <h4>City: {datos.city}</h4>
        <h4>Country: {datos.country}</h4>
      </div>
      <div>
        <Link to='/profileusers/EditUser'>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileUsers;
