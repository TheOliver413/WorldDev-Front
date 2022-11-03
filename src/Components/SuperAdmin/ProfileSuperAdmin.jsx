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
            <h1 className='mx-5'>World Developers</h1>

            <div class="jumbotron bg-gray p-4">
              <h1 class="display-5">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <p class="lead">
                <Link to='/profileSuperAdmin/formsSuperAdmin'>
                  <button className="btn btn-primary mt-1" type="button">Edit Forms</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <p class="lead">
                <Link to='/profileSuperAdmin/adminTable'>
                  <button className="btn btn-primary mt-1" type="button">Admin Table</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <p class="lead">
                <Link to='/userTable'>
                  <button className="btn btn-primary mt-1" type="button">User Table</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5">
              <h1 class="display-5">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
              <p class="lead">
                <Link to='/profileSuperAdmin/registerAdmin'>
                  <button className="btn btn-primary mt-1" type="button">Admin Registration</button>
                </Link>
              </p>
            </div>

            <div class="jumbotron bg-gray p-4 mt-5 mb-5">
              <h1 class="display-5">Hello, world!</h1>
              <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr class="my-4" />
              <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
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
