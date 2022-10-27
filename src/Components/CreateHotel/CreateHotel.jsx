import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createHotels, updateHotels, getHotels } from '../../redux/action/action';
import { getCity, getDepartment, getState } from "../../redux/action/action";
import { toast } from "react-toastify";
import '../Create/Styles.css';


const validate = (input_hotels) => {
  let errors = {};
  if(!input_hotels.name) errors.name = 'Hotel name is required'
  if(!input_hotels.image.length) errors.image = 'Upload at least one image'
  if(!input_hotels.qualification) errors.qualification = 'The qualification is required'
  if(/^\d+$^\d+$/.test(input_hotels.qualification)) errors.qualification = 'The qualification must be in integers'  
  if(!input_hotels.description) errors.description = 'Description is required'
  if(!input_hotels.address) errors.address = 'Address is required'  
  if(!input_hotels.idLocation) errors.idLocation = 'City is required'
  return errors;
}

const validateTwo = (input_location) => {
  let error = {};
  if (!input_location.state) error.state = 'State is required'
  if(!input_location.department) error.department = 'Department is required'
  return error;
}


export default function Create() {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const get_state = useSelector(state => state.reducerHotel.location_state)
  const get_city = useSelector(state => state.reducerHotel.location_city)
  const get_department = useSelector(state => state.reducerHotel.location_department)

  const [input_hotels, input_sethotels] = useState({
    name: "",
    image: [],
    qualification: 0,
    description: "",
    address: "",
  })

  const [input_location, setInputLocation] = useState({
    state: "",
    department: "",
    city: "",
  })

  const [error, setError] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getState());
  }, [dispatch, hotels])

  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChangeLocation(e) {
    e.preventDefault();
    setInputLocation({
      ...input_location,
      [e.target.name]: e.target.value
    })
    setError(validateTwo({
      ...input_location,
      [e.target.name]: e.target.value
  })) 
    if (e.target.name === "state") {
      dispatch(getDepartment(e.target.value))
    }
    if (e.target.name === "department") {
      dispatch(getCity(e.target.value))
    }
  }
    
  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    input_sethotels({
      ...input_hotels,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_hotels,
      [e.target.name]: e.target.value
  }))
  }

  function handleName(e) {
    e.preventDefault();
    input_sethotels({
      ...input_hotels,
     name: e.target.value.toLowerCase()
    })
    setErrors(validate({
      ...input_hotels,
      name: e.target.value
  }))
  }

  //-----------------------CLOUDINARY--------------------------//
  async function handleOpenWidget() {
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5',
      uploadPreset: 'wwtvto96'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info); 
        //setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        input_sethotels({
          ...input_hotels,
          image: [...input_hotels.image, { url: result.info.url, public_id: result.info.public_id }]
        })
        setErrors(validate({
          ...input_hotels,
          image: [...input_hotels.image, { url: result.info.url, public_id: result.info.public_id }]
      }))
      }
    })
    myWidget.open()
  }


  //---------------- HANDLE SUBMIT HOTELS------------------//
  function handleSubmit(e) {
    e.preventDefault()
    if (input_hotels && !Object.keys(errors).length) {    
        dispatch(createHotels(input_hotels))
        setInputLocation({
          state: "",
          department: "",
        })
        input_sethotels({
          name: "",
          image: [],
          qualification: 0,
          description: "",
          address: "",
          idLocation: "",  
        })
        toast.success('Hotel created successfully', { position: 'bottom-right' }) 
    } else {
      toast.error('Check the fields', { position: 'bottom-right' })
    }
  }

  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div className="mb-4 d-flex justify-content-start align-items-center">
          <h1>Hotel</h1>
        </div>

        <div className="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-building"></i> Name</label>
                <input type="text" className="form-control" placeholder="Name..." value={input_hotels.name}
                  name="name" onChange={(e) => handleName(e)} />
                <div className="nombre text-danger "></div>
              </div>
              <div>
                {errors.name && (<p>{errors.name}</p>)}
            </div>
            </div>

            <div className="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_hotels.image.map((imag) => (
                    <div>
                      <img src={imag.url} />
                    </div>
                  ))}

                </div>
                <div className="nombre text-danger "></div>
              </div>
              <div>
                {errors.image && (<p>{errors.image}</p>)}
            </div>
            </div>

            <div className="mb-4">
              <div>
                <label for="nombre"><i className="bi bi-star"></i> Qualification</label>
                <input type="range" className="form-range" min="1" max="5" value={input_hotels.qualification}
                  name="qualification" maxLength="1000" onChange={(e) =>
                    handleChange(e)} />
                {<p className="" > <i className="bi bi-star"></i> : {input_hotels.qualification}</p>}
                <div className="nombre text-danger "></div>
                <div>
                {errors.qualification && (<p>{errors.qualification}</p>)}
            </div>
              </div>

              <div className="mb-4">
                <label for="nombre"><i className="bi bi-geo-alt"></i> Adress</label>
                <input type="text" className="form-control" placeholder="Address..."
                  value={input_hotels.address} name="address" onChange={(e) => handleChange(e)} />
                <div className="nombre text-danger "></div>
                <div>
                {errors.address && (<p>{errors.address}</p>)}
            </div>
              </div>

              <div className="mb-4">
                <label for="nombre"><i className="bi bi-house"></i> State</label>
                <select className="form-select" name="state" value={input_location.state} onChange={(e) => handleChangeLocation(e)}>
                  <option hidden selected >State...</option>
                  {get_state?.sort((a,b)=>{
                                if(a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) => {
                    return (
                      <option value={ele} key={i} > {ele} </option>
                    )
                  })
                  }
                </select>
                <div className="nombre text-danger "></div>
                <div>
                {error.state && (<p>{error.state}</p>)}
            </div>
              </div>

              <div className="mb-4 d-flex justify-content-between">
              <div>
                  <label for="apellido"><i className="bi bi-pin"></i> Department</label>
                  <select className="form-select " name="department" value={input_location.department} onChange={(e) => handleChangeLocation(e)}>
                    <option hidden selected>Department...</option>
                    {get_department?.sort((a,b)=>{
                                if(a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) => {
                      return (
                        <option value={ele} key={i} > {ele} </option>
                      )
                    })
                    }
                  </select>
                  <div className="apellido text-danger"></div>
                  <div>
                {error.department && (<p>{error.department}</p>)}
            </div>
                </div>

                <div>
                  <label for="nombre"><i className="bi bi-pin-map"></i> City</label>
                  <select className="form-select" name="idLocation" value={input_hotels.idLocation} onChange={(e) => handleChange(e)}>
                    <option hidden selected>City...</option>
                    {get_city?.sort((a,b)=>{
                                if(a.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) => {
                      return (
                        <option value={ele.id} key={i} > {ele.city.toLowerCase()} </option>
                      )
                    })
                    }
                  </select>
                  <div className="nombre text-danger "></div>
                  <div>
                {errors.idLocation && (<p>{errors.idLocation}</p>)}
            </div>
                </div>
              </div>

              <div className="mb-4">
                <label for="mensaje"> <i className="bi bi-chat-left-dots" required></i> Description</label>
                <textarea className="form-control" placeholder="Description..." value={input_hotels.description}
                  name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
                <div className="mensaje text-danger"></div>
                <div>
                {errors.description && (<p>{errors.description}</p>)}
            </div>
              </div>

              <div className="mb-2">
              {!input_hotels.name || !input_hotels.image.length || !input_hotels.qualification || !input_hotels.description || !input_hotels.address ||!input_hotels.idLocation || !input_location.state || !input_location.department || Object.keys(errors).length?
              <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                <span>Create </span><i id="icono" class="bi bi-cursor-fill "></i>
              </button> 
                : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                  <span>Create </span><i id="icono" className="bi bi-cursor-fill "></i>
                </button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    )}