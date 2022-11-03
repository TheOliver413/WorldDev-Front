import React, { useEffect } from 'react'
import ProfileAdmin from '../Admin/ProfileAdmin/ProfileAdmin';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailUser } from '../../redux/action/actionAuth';
import { useAuth } from '../../context/AuthContext';

const ProfileSuperAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth()

  const datosTotal = useSelector(state => state.reducerAuth.users)

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [user])

  return (
    <div>
      {
        datosTotal.rol === 'superAdmin' ?
          <div>
            <h1>WORLD DEVELOPER</h1>
            <div>
              <Link to='/profileSuperAdmin/formsSuperAdmin'>
                <button className="btn btn-primary mt-1" type="button">Edit Forms</button>
              </Link>
            </div>

            <div>
              <Link to='/profileSuperAdmin/adminTable'>
                <button className="btn btn-primary mt-1" type="button">Admin Table</button>
              </Link>
            </div>

            <div>
              <Link to='/userTable'>
                <button className="btn btn-primary mt-1" type="button">User Table</button>
              </Link>
            </div>

            <div>
              <Link to='/profileSuperAdmin/registerAdmin'>
                <button className="btn btn-primary mt-1" type="button">Admin Registration</button>
              </Link>
            </div>

            <div>
              <Link to='/stock'>
                <button className="btn btn-primary mt-1" type="button">Bookings</button>
              </Link>
            </div>

            {/* <div>
      <button
          onClick={() => navigate("/favorite")}
          type="button"
          className="btn btn-primary mt-1"
        >
          Favorites
        </button>
      </div> */}

          </div> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}

export default ProfileSuperAdmin;
