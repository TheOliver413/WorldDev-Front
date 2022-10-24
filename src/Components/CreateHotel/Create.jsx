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
    address: "",
    idLocation: "",

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
        address: "",
        idLocation: "",

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

        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Name</label>
                <input type="text" class="form-control" placeholder="Name..." value={input_hotels.name}
                  name="name" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Image</label>
                <input type="file" class=" form-control" value={input_hotels.image} name="image"
                  onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-star"></i> Qualification</label>
                <input type="range" class="form-range" min="1" max="5" value={input_hotels.qualification}
                  name="qualification" maxLength="1000" onChange={(e) =>
                    handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>

              <div class="mb-4">
                <label for="nombre"><i class="bi bi-geo-alt"></i> Adress</label>
                <input type="text" className="form-control" placeholder="Address..."
                  value={input_hotels.address} name="address" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>

              <div class="mb-4">
                <label for="nombre"><i class="bi bi-house"></i> State</label>
                <select class="form-select" name="state" value={location.state} onChange={(e) =>
                  handleChangeLocation(e)}>
                  <option disabled selected>State...</option>
                  {get_state?.map((ele, i) => {
                    return (
                      <option value={ele} key={i}> {ele} </option>
                    )
                  })
                  }
                </select>
                <div class="nombre text-danger "></div>
              </div>

              <div class="mb-4 d-flex justify-content-between">
                <div>
                  <label for="apellido"><i class="bi bi-pin"></i> Department</label>
                  <select class="form-select " name="department" value={location.department}
                    onChange={(e) =>
                      handleChangeLocation(e)}>
                    <option disabled selected>Department...</option>
                    {get_department?.map((ele, i) => {
                      return (
                        <option value={ele} key={i}> {ele} </option>
                      )
                    })
                    }
                  </select>
                  <div class="apellido text-danger"></div>
                </div>

                <div>
                  <label for="nombre"><i class="bi bi-pin-map"></i> City</label>
                  <select class="form-select" value={input_hotels.idLocation} onChange={(e) =>
                    handleChange(e)}>
                    <option disabled selected>City...</option>
                    {get_city?.map((ele, i) => {
                      return (
                        <option value={ele.id} key={i}> {ele.city} </option>
                      )
                    })
                    }
                  </select>
                  <div class="nombre text-danger "></div>
                </div>
              </div>

              <div class="mb-4">
                <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
                <textarea class="form-control" placeholder="Description..." value={input_hotels.description}
                  name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
                <div class="mensaje text-danger"></div>
              </div>

              <div class="mb-2">
                <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between"
                  onClick={(e) =>
                    handleSubmit(e)}>
                  <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}