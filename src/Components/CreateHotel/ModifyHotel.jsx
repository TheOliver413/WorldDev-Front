import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHotels, getHotels, getState, getDepartment, getCity } from '../../redux/action/action';
import '../Create/Styles.css';
import { toast } from "react-toastify";


export default function ModifyHotel() {
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)

  const get_state = useSelector(state=>state.reducerHotel.location_state)
  const get_department = useSelector(state=>state.reducerHotel.location_department)
  const get_city = useSelector(state=>state.reducerHotel.location_city)
//---------------------------------------------------//
  const [input_hotels, input_sethotels] = useState({
    id: "",
    name: "",
    image: [""],
    qualification: 1,
    description: "",
    address:"",
    idLocation:"",

  })
//---------------------------------------------------//
  const [location, setlocation] = useState({
    state: "",
    department: "",
    city: "",
  })
//---------------------------------------------------//
useEffect(() => {
  !hotels.length && dispatch(getHotels());
  dispatch(getState());
}, [dispatch, hotels])

//----------------------------------------------------//
function handleChangeLocation(e) {
  e.preventDefault();
  setlocation({
    ...location,
    [e.target.name]: e.target.value
  })
  if( e.target.name === "state" ){
    dispatch(getDepartment(e.target.value))
  }
  if( e.target.name === "department" ){
    dispatch(getCity(e.target.value))
  }
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }

  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  //  const validate = (input_hotels) => {
  //   let errors = {}

  //   if (!input.name.length) {
  //     errors.name = 'Title cannot be empty'
  //   }

  //   if (!validateName.test(input.name)) {
  //     errors.name = 'Special characters or numbers are not allowed'
  //   }

  //   if (recipes.find((e) => e.name.toLowerCase() === input.name.toLowerCase())) {
  //     alert(`The name ${input.name} already exist, please choose another one!`)
  //   }

  //   return errors;

  // } 
  
  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    //console.log("estado actual:", input_create)
    input_sethotels({
      ...input_hotels,
      [e.target.name]: e.target.value
    })
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }
 
  //---------------- HANDLE SUBMIT HOTELS------------------//
  function handleSubmit(e) {
    e.preventDefault()
    if (input_hotels) {

      // dispatch(createHotels(input_hotels))

    if(input_hotels) {
        dispatch(updateHotels(input_hotels))
        toast.success('Hotel modified successfully', { position: 'bottom-right' })
      }

      input_sethotels({
        id: "",
        name: "",
        image: [""],
        qualification: 1,
        description: "",
        address:"",
        idLocation:"",
    
      })
    } else {
      toast.error('Check the fields', { position: 'bottom-right' })
    }
  }

  return (
    <div className="cardHotels-container">
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-group">
          <h1>✯ Hotel ✯</h1>

          {/*-----------------------NAME------------------------ */}
          <div className="form-row" >
          <select
          className="form-control" name = "id" value= {input_hotels.id} onChange={(e) => handleChange(e)}>
          <option disabled selected >Hotels...</option>
          {data_hotels?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele.name}</option>
            )
          })}
        </select>

              {/*--------------------------REMANE------------------- */}
            <div className=''>
              <input
                className="form-control"
                placeholder="Rename Hotel..."
                type="text"
                value={input_hotels.name}
                name="name"
                onChange={(e) => handleChange(e)} />
            </div>


            {/*--------------------------IMAGE------------------- */}
            <div className=''>
              <input
                className="form-control"
                type="file"
                value={input_hotels.image}
                name="image"
                onChange={(e) => handleChange(e)} />
            </div>

            {/*--------------------------DESCRIPTION----------------------- */}
            <div >
              <textarea
                className="form-control"
                placeholder="Description..."
                type="text"
                value={input_hotels.description}
                name="description"
                maxLength="1000"
                onChange={(e) => handleChange(e)}>
              </textarea>
            </div>

            {/*--------------------------QUALIFICATION----------------------- */}

            <div >
              <h4>Category</h4>
              <input
                className="form-control"
                type="range"
                min="1"
                max="5"
                value={input_hotels.qualification}
                name="qualification"
                maxLength="1000"
                onChange={(e) => handleChange(e)}>
              </input>
              {<p className="" > Value : {input_hotels.qualification}</p>}
            </div>

            {/*--------------------------ADRESS----------------------- */}
            <h4>Location</h4>
            <div >
              <input
                className="form-control"
                placeholder="Address..."
                type="text"
                value={input_hotels.address}
                name="address"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>

              {/*--------------------------STATE----------------------- */}          
               
             <select  name="state" value={ location.state }  onChange={(e) => handleChangeLocation(e)} >
               <option   disabled selected >State...</option>
              { get_state?.map((ele,i)=>{
                return(
                  <option  value= { ele } key={i} > { ele } </option>
                )
              })
                }
             </select>

             {/*--------------------------DEPARTMENT----------------------- */}          
              
             <select  name="department" value={ location.department } onChange={(e) => handleChangeLocation(e)} >
               <option disabled selected >Department...</option>
               { get_department?.map((ele,i)=>{
                return(
                  <option  value= { ele } key= {i} > { ele } </option>
                )
              })
                }      
             </select>
                     
             {/*--------------------------CITY----------------------- */}          
              
             <select  name="idLocation" value={ input_hotels.idLocation } onChange={(e) => handleChange(e)} >
               <option disabled selected >City...</option>
               { get_city?.map((ele,i)=>{
                return(
                  <option  value= { ele.id } key={i} > { ele.city } </option>
                )
              })
                }
             </select>
              
            {/*----------------------------BUTTON------------------------ */}
            <div>
              <button className='btn btn-primary mb-2'
                type="submit"
                onClick={(e) => handleSubmit(e)}>Send</button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}




