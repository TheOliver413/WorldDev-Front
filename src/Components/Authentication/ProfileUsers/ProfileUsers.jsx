import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProfileUser = () => {
  // const dispatch= useDispatch()
  // const data_users= useSelector( state=> state.reducerAuth.users)


  const { user } = useAuth();
  // const [inputU, setInputU] = useState({
  //   id: '',
  //   name: '',
  //   lastname: '',
  //   verificated: boolean,
  //   photoURL:'',
  //   superadmin: boolean,
  //   country: '',
  //   city: '',
  //   adress: ''
  // });

  // useEffect(() => {
  //   dispatch()
  // })

  // function handleChangeData(e) {
  //   e.preventDefault();
  //   setInputU({
  //     ...inputU,
  //     [e.target.name]: e.target.value
  //   })
  // }



  return (
    <form>
      <div class="conteiner-users">
        <div class="form-group col-md-6">
          <img src={user.photoURL? user.photoURL : "https://www.clarkstontolldentalpractice.com/wp-content/uploads/2020/06/default-img-2-1.jpg"} class="rounded mx-auto d-block" alt="Cinque Terre"></img>
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail4"><h2>Welcome {user.displayName? user.displayName : user.email}!</h2></label>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Name</label>
          <input type="text" class="form-control" id="inputName" placeholder="Name" /*onChange= {handleChangeData}*/></input>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Lastname</label>
          <input type="text" class="form-control" id="inputLastname" placeholder="Lastname" /*onChange= {handleChangeData}*/></input>
        </div>
        <div class="form-group col-md-6">
          <label for="inputAddress">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" /*onChange= {handleChangeData}*//>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" /*onChange= {handleChangeData}*//>
          </div>
          <div class="form-group col-md-6">
            <label for="inputCity">Country</label>
            <input type="text" class="form-control" id="inputCity" /*onChange= {handleChangeData}*//>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
      <p></p>
      <Link to='/carrito'><button type="button" class="btn btn-primary">Reservation</button></Link>
    </form>
  )
}

export default ProfileUser;
