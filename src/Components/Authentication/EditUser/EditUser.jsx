import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUsers, modifyUsers } from '../../../redux/action/actionAuth';

const EditUser = (id) => {

  const usersG= useSelector( state => state.reducerAuth.users)
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const {user} =  useAuth()
  // console.log('holaaaa',user)
 

  const [inputU, setInputU] = useState({
    id: '',
    email:'',
    displayName:'',
    name: '',
    lastname: '',
    rol: 'user',
    photoURL:'',
    country: '',
    city: '',
    address: '',
    favorite:[],
    create: true,
  });
  
  function refreshPage() {
    window.location.reload()
    setTimeout(()=>{
        window.location.reload(false);
    }, 100);
    console.log('page to reload')
  }
  
  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      //console.log("esto es un id",user.uid)
      setInputU({ 
        ...inputU,
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL, 
        email: user.email, 
        favorite: user.favorite
      })
    }
  },[user])

  function handleChangeData(e) {
    e.preventDefault();
    setInputU({
      ...inputU,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    // const {user} = useAuth()
    // let createUser= {
    //   id: user.uid,
    //   name: inputU.name,
    //   displayName: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    //   lastname: inputU.lastname,
    //   rol: 'user',
    //   country: inputU.country,
    //   city: inputU.city,
    //   address: inputU.address,
    //   create: true,
    // };
    if( inputU.create === true){
      dispatch(modifyUsers(inputU))
      navigate('/profileusers')
      refreshPage()
    } else {
      dispatch(createUsers(inputU))
      navigate('/profileusers') 
      refreshPage()
    }
    // }
    // setInputU({
    //   id: "",
    //   name: "",
    //   lastname: '',
    //   rol: 'user',
    //   country: '',
    //   city: '',
    //   address: ''
    // })
  }
  


  return (
    <form onSubmit={handleSubmit}>
      <div class="conteiner-users">
        <div class="form-group col-md-6">
          <img src={user.photoURL? user.photoURL : "https://www.clarkstontolldentalpractice.com/wp-content/uploads/2020/06/default-img-2-1.jpg"} class="rounded mx-auto d-block" alt="Cinque Terre"></img>
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail4"><h2>Welcome {user.displayName  || inputU.name? user.displayName : user.email || inputU.name}!</h2></label>
        </div>
        <div class="form-group col-md-6">
          <label>Name</label>
          <input type="text" class="form-control" id="inputName" value={inputU.name} name='name' placeholder="Name" onChange= {handleChangeData}></input>
        </div>
        <div class="form-group col-md-6">
          <label>Lastname</label>
          <input type="text" class="form-control" id="inputLastname" value={inputU.lastname} name='lastname' placeholder="Lastname" onChange= {handleChangeData}></input>
        </div>
        <div class="form-group col-md-6">
          <label>Address</label>
          <input type="text" class="form-control" id="inputAddress" value={inputU.address} name='address' placeholder="1234 Main St" onChange= {handleChangeData}/>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>City</label>
            <input type="text" class="form-control" id="inputCity" value={inputU.city} name='city' placeholder='City...' onChange= {handleChangeData}/>
          </div>
          <div class="form-group col-md-6">
            <label>Country</label>
            <input type="text" class="form-control" id="inputCity" value={inputU.country} name='country' placeholder='Country...' onChange= {handleChangeData}/>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
      <p></p>
    </form>
  )
}

export default  EditUser
