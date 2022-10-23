//------------------------------------------------------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createHotels,updateHotels, getHotels } from '../../redux/action/action';
import { getCity, getDepartment, getState } from "../../redux/action/action";

import { toast } from "react-toastify";

import '../Create/Styles.css';

export default function Create() {
  const dispatch = useDispatch();
  //const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)

  const get_state = useSelector(state=>state.reducerHotel.location_state)
  const get_city = useSelector(state=>state.reducerHotel.location_city)
  const get_department = useSelector(state=>state.reducerHotel.location_department)

  // console.log("info de estados: ", get_state)
  // console.log("info en componente city: ", get_city)
  // console.log("info en componente department: ", get_department)

  const [input_hotels, input_sethotels] = useState({
    id: "",
    name: "",
    image: [],
    qualification: 1,
    description: "",
    address:"",
    idLocation:"",

  })
  const [location, setlocation] = useState({
    state: "",
    department: "",
    city: "",
  })

  //------------------ HANDLE CHANGE HOTELS -------------------//
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
    // if( e.target.name === "city" ){
    //   dispatch(getCity(e.target.value))
    // }
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }
//------------------------------------------------------//
  useEffect(() => {
    !hotels.length && dispatch(getState());
  }, [dispatch, hotels])

  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  /* const validate = (input_hotels) => {
    // let errors = {}

    // if (!input.title.length) {
    //   errors.title = 'Title cannot be empty'
    // }

    // if (!validateTitle.test(input.title)) {
    //   errors.title = 'Special characters or numbers are not allowed'
    // }

    // if (recipes.find((e) => e.title.toLowerCase() === input.title.toLowerCase())) {
    //   alert(`The title ${input.title} already exist, please choose another one!`)
    // }
    // if (input.image && !validateUrl.test(input.image)) {
    //   errors.image = 'This is not a valid URL'
    // }

    // return errors;

  } */
  
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

 //-----------------------CLOUDINARY--------------------------//
 async function handleOpenWidget(){
  var myWidget = await window.cloudinary.createUploadWidget({
    cloudName: 'dyyoavgq5', 
    uploadPreset: 'wwtvto96'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        // console.log('Done! Here is the image info: ', result.info); 
        //setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        input_sethotels( {
          ...input_hotels,
          image:[...input_hotels.image, {url: result.info.url,public_id: result.info.public_id}]
        })
        console.log(input_hotels)
      }
    })
    myWidget.open()
}


  //---------------- HANDLE SUBMIT HOTELS------------------//
  function handleSubmit(e) {
    e.preventDefault()
    if (input_hotels) {

      // dispatch(createHotels(input_hotels))

      if (input_hotels) {
        dispatch(createHotels(input_hotels))
        toast.success('Hotel created successfully', { position: 'bottom-right' })
      }

      input_sethotels({
        id: "",
        name: "",
        image: [],
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
              <div>
              <input
                className="form-control"
                autoFocus
                placeholder="Name..."
                type="text" value={input_hotels.name}
                name="name"
                onChange={(e) => handleChange(e)} />
              </div>

            {/*--------------------------UPLOAD FILES------------------- */}
            <button type="button" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_hotels.image.map((imag) =>(
                    <div>
                      <img src={imag.url}/>
                    </div>
                  ))}

                </div>

            {/*--------------------------DESCRIPTION----------------------- */}
            <div >
              <textarea
                className="form-control"
                placeholder="Description..."
                type="text"
                value={input_hotels.description}
                name="description"
                maxLength="500"
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