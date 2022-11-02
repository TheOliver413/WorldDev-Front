import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUsers, getAllAdmins, modifyUsers } from '../../../redux/action/actionAuth';
import { getHotels } from '../../../redux/action/action';

const validate = (inputA) => {
  let errors = {};

  if(!inputA.email) errors.email="The administrator's email is required";
  if(!inputA.name) errors.name='Administrator name is required';
  if(!inputA.lastname) errors.lastname="Enter admin last name";
  if(!inputA.dateOfBirth) errors.dateOfBirth="Enter administrator date of birth";
  if(!inputA.dni) errors.dni="Enter administrator ID"
  if(!/^[0-9]+$/.test(inputA.dni)) errors.dni="Must contain only numbers"
  if(!inputA.nameH) errors.nameH = 'Hotel name is required'
  if(!inputA.address) errors.address = "Enter administrator address"
  if(!inputA.city) errors.city= "Enter admin city"
  if(!inputA.country) errors.country= "Enter administrator country"

  return errors;
}

const EditAdmin = (id) => {
  const dispatch = useDispatch()
  const navigate= useNavigate()


  const allAdmin= useSelector( state => state.reducerAuth.allAdmins)

  const allHotels = useSelector(state => state.reducerHotel.hotels)

  const [errors, setErrors] = useState({});


  const { user } = useAuth();

  
  const [inputA, setInputA] = useState({
    email: "",
    name: "",
    lastname: "",
    rol: "admin",
    dateOfBirth: "",
    dni: "",
    hotel: "",
    address: "",
    city: "",
    country: "",
    create: true,
    id: ""
  });
  
  const idAdmin=inputA.email ? allAdmin?.filter(e=>e.email===inputA.email).map(el=>el.id).toString(): null

  if(idAdmin){
    setInputA({id: idAdmin})
  }



  useEffect(()=>{
    dispatch(getAllAdmins())
    if(user && user.hasOwnProperty('uid')){
      setInputA({ 
        ...inputA,
        // id: user.uid,
        // email: user.email
      })
    }
  },[user])






  function handleChangeData(e) {
    e.preventDefault();
    setInputA({
      ...inputA,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...inputA,
      [e.target.name] : e.target.value
    }))
  }

  const handleSelect = (e) => {
    setInputA({
      ...inputA,
      hotel: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate({
      ...inputA,
      [e.target.name]: e.target.value
    }));
    if( inputA.create === true){
      dispatch(modifyUsers(inputA))
      navigate('/profileSuperAdmin/adminTable')
    } else {
      dispatch(createUsers(inputA))
      navigate('/profileSuperAdmin/adminTable') 
    }
    console.log('holis', inputA)
    console.log('holiiiiiis', allAdmin)
  }

  useEffect(()=>{
    dispatch(getHotels())
  },[dispatch])

  return (
    <div class="container">
    <div class="row">
  
  <dd><button className="btn btn-primary mt-1" type="button" onClick={()=>navigate(-1)}>Back</button></dd>
  
    <form onSubmit={handleSubmit}>
      <div class="conteiner-users">
        <div class="form-group col-md-6">
          <h1>Edit Admin Profile</h1>
        </div>
        <div class="form-group col-md-6">
          <label>Email</label>
          <input type="text" class="form-control" id="inputEmail" value={inputA.email} name='email' placeholder="Email" onChange={handleChangeData}></input>
          {
            errors.email ? (<h4>{errors.email}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label>Name</label>
          <input type="text" class="form-control" id="inputName" value={inputA.name} name='name' placeholder="Name" onChange={handleChangeData}></input>
          {
            errors.name ? (<h4>{errors.name}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label >Lastname</label>
          <input type="text" class="form-control" id="inputLastname" value={inputA.lastname} name='lastname' placeholder="Lastname" onChange={handleChangeData}></input>
          {
            errors.lastname ? (<h4>{errors.lastname}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label>Birthday</label>
          <input type="date" class="form-control" id="inputBirth" value={inputA.dateOfBirth} name='dateOfBirth' placeholder="Date of birthday" onChange={handleChangeData}></input>
          {
            errors.dateOfBirth ? (<h4>{errors.dateOfBirth}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label>DNI</label>
          <input type="text" class="form-control" id="inputDNI" value={inputA.dni} name='dni' placeholder="DNI" onChange={handleChangeData}></input>
          {
            errors.dni ? (<h4>{errors.dni}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label>Hotel</label>
          <select onChange={(e)=>handleSelect(e)} value={inputA.hotel}>
            <option hidden>Hotel</option>
            {
              allHotels.map((h) => (
                <option value={h.name} key={h.name}>{h.name}</option>
              ))
            }
          </select>
          {/* <select class="form-select " name="id" value={inputA.id} onChange={handleChangeData}>
            <option hidden selected>Hotels...</option>
            {allHotels?.sort((a, b) => {
              if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
              if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
              return 0;
            }).map((ele, i) => (
              <option value={ele.id} key={i}>{`${ele.name}, ${(ele.Locations).map(ele =>
                `${ele.state},${ele.department}, ${ele.city.toLowerCase()}`)}`}</option>
            )
            )}
          </select> */}

          {
            errors.name ? (<h4>{errors.name}</h4>) : (false)
          }
        </div>
        <div class="form-group col-md-6">
          <label >Address</label>
          <input type="text" class="form-control" id="inputAddress" value={inputA.address} name='address' placeholder="1234 Main St" onChange={handleChangeData} />
          {
            errors.address ? (<h4>{errors.address}</h4>) : (false)
          }
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label >City</label>
            <input type="text" class="form-control" id="inputCity" value={inputA.city} name='city' placeholder='City...' onChange={handleChangeData} />
            {
            errors.city ? (<h4>{errors.city}</h4>) : (false)
            }
          </div>
          <div class="form-group col-md-6">
            <label>Country</label>
            <input type="text" class="form-control" id="inputCity" value={inputA.country} name='country' placeholder='Country...' onChange={handleChangeData} />
            {
            errors.country ? (<h4>{errors.country}</h4>) : (false)
            }
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
      {/* <p></p>
      <Link to='/carrito'><button type="button" class="btn btn-primary">Reservation</button></Link> */}
    </form>
    </div>
        </div>
  )
}

export default EditAdmin;