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
    <div className='container'>
      {
        datosTotal.rol === 'superAdmin' ?
          <div>
            <h1 className='mx-5'>✯ Dashboard ✯</h1>

            <div class="jumbotron bg-gray p-4">
              <h1 class="display-5">Forms to create and modify</h1>
              <p class="lead">In this section you will be able to create and modify the hotels, rooms, hotel services, services of each room and create events associated with a hotel.</p>
              <hr class="my-4" /> 
              <p></p>
              <p class="lead">
                <Link to='/profileSuperAdmin/formsSuperAdmin'>
                  <button className="btn btn-primary mt-1" type="button">Edit Forms</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">Register for admins</h1>
              <p class="lead">This section directs you to a login to register a hotel manager. You can then upload their contact information.</p>
              <hr class="my-4" />
              <p></p>
              <p class="lead">
                <Link to='/profileSuperAdmin/registerAdmin'>
                  <button className="btn btn-primary mt-1" type="button">Admin Registration</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">Admin views</h1>
              <p class="lead">In this section you can see the administrators of each hotel, with their contact information. You can edit and delete the information of each hotel administrator.</p>
              <hr class="my-4" />
              <p></p>
              <p class="lead">
                <Link to='/profileSuperAdmin/adminTable'>
                  <button className="btn btn-primary mt-1" type="button">Admin Table</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">User views</h1>
              <p class="lead">In this section you can see the users with their contact information. You can delete each user's information as needed.</p>
              <hr class="my-4" />
              <p></p>
              <p class="lead">
                <Link to='/userTable'>
                  <button className="btn btn-primary mt-1" type="button">User Table</button>
                </Link>
              </p>
            </div>



            <div class="jumbotron bg-gray p-4 mt-5 mb-5">
              <h1 class="display-5">Reservation management</h1>
              <p class="lead">In this section you will have the views of the reservations, you can filter them by name, order them, filter them by status and cancel them.</p>
              <hr class="my-4" />
              <p></p>
              <p class="lead">
              <Link to='/stock'>
                <button className="btn btn-primary mt-1" type="button">Bookings</button>
              </Link>
              </p>
            </div>

          </div> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}

export default ProfileSuperAdmin;
