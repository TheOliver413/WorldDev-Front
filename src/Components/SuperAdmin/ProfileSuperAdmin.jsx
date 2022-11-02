import React from 'react'
import ProfileAdmin from '../Admin/ProfileAdmin/ProfileAdmin';
import { Link } from 'react-router-dom';

const ProfileSuperAdmin = () => {
  return (
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

    </div>
  )
}

export default ProfileSuperAdmin;
