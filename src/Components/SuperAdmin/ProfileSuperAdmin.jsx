import React from 'react'
import ProfileAdmin from '../Admin/ProfileAdmin/ProfileAdmin';
import { Link } from 'react-router-dom';

const ProfileSuperAdmin = () => {
  return (
    <div>
      <h1>WORLD DEVELOPER</h1>
      <div>
        <Link to='/profileSuperAdmin/formsSuperAdmin'>
          <button>Edit Forms</button>        
        </Link>
      </div>
      
      <div>
        <Link to='/profileSuperAdmin/adminTable'>
          <button>Admin Table</button>        
        </Link>
      </div>

      <div>
        <Link to='/userTable'>
          <button>User Table</button>        
        </Link>
      </div>

      <div>
        <Link to='/profileSuperAdmin/registerAdmin'>
          <button>Administrator Registration</button>    
        </Link>
      </div>

      <div>
        <Link to='/stock'>
          <button>Bookings</button>
        </Link>
      </div>

    </div>
  )
}

export default ProfileSuperAdmin;
