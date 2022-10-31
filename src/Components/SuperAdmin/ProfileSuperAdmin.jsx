import React from 'react'
import ProfileAdmin from '../Admin/ProfileAdmin/ProfileAdmin';
import { Link } from 'react-router-dom';

const ProfileSuperAdmin = () => {
  return (
    <div>
      {/* <ProfileAdmin/> */}
{/* esto tiene que ir dentro de la tabla de pato
      <div>
        <Link to='/profileAdmin/editAdmin'>
          <button>Edit</button>
        </Link>
      </div> */}
      <h1>WORLD DEVELOPER</h1>
      <div>
        <Link to='/profileSuperAdmin/formsSuperAdmin'>
          <button>Edit Forms</button>        
        </Link>
      </div>
      
    </div>
  )
}

export default ProfileSuperAdmin;


//se supone que aca viene la tabla de pato con todos los admin y con sus botones para editar(le paso el link de arriba) cada uno de sus perfiles, dependiendo de su id

//tambien va el boton para registrar a un admin