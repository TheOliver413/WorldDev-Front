import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHotels, getHotels, getState, getDepartment, getCity, getDetailHotel } from '../../redux/action/action';
import '../Create/Styles.css';
import { toast } from "react-toastify";

const validate = (input_hotels) => {
  let errors = {};
  if(!input_hotels.id) errors.id = 'Hotel name is required'
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

export default function ModifyHotel() {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const get_state = useSelector(state => state.reducerHotel.location_state)
  const get_department = useSelector(state => state.reducerHotel.location_department)
  const get_city = useSelector(state => state.reducerHotel.location_city)
  const detailHotel = useSelector(state => state.reducerHotel.detailHotel)


  const [input_hotels, input_sethotels] = useState({
    id: "",
    name: "",
    image: [],
    qualification: 0,
    description: "",
    address: "",
    idLocation: "",
  })
 
  const [input_location, setInputLocation] = useState({
    state: "",
    department: "",
  })

  const [error, setError] = useState({})
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getState());
  }, [dispatch, hotels])

  //----------------------------------------------------//
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
  function handleChangeHotel(e) {
    e.preventDefault();
    input_sethotels({
      ...input_hotels,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_hotels,
      [e.target.name]: e.target.value
  }))
  dispatch(getDetailHotel(e.target.value))
  }
  console.log('locatiooooon', detailHotel?.Locations)

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
        dispatch(updateHotels(input_hotels))    
      setInputLocation({
        state: "",
        department: "",
      })
      input_sethotels({
        id: "",
        name: "",
        image: [],
        qualification: 1,
        description: "",
        address: "",
        idLocation: "",        
      })
      toast.success('Hotel modified successfully', { position: 'bottom-right' })
    } else {
      toast.error('Check the fields', { position: 'bottom-right' })
    }
  }

  return (
    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">
          <h1>Modify Hotels</h1>
        </div>

        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Hotel Name</label>
                <select class="form-select" name="id" value={input_hotels.id} onChange={(e) => handleChangeHotel(e)}>
                  <option hidden selected>Select hotel name</option>
                  {hotels?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) =>(
                      <option value={ele.id} key={i}>{`${ele.name}, ${(ele.Locations).map(ele=>
                        `${ele.state},${ele.department}, ${ele.city.toLowerCase()}`)}`}</option>
                    ))}
                </select>
                <div class="nombre text-danger "></div>
                <div>
                {errors.id && (<p>{errors.id}</p>)}
            </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-plus-circle"></i> Name</label>
                <input 
                type="text" 
                class="form-control" 
                placeholder="Hotel name" 
                defaultValue={input_hotels.name || detailHotel?.name} 
                name="name"
                onChange={(e) => handleName(e)} />
                <div class="nombre text-danger "></div>
                <div>
                {errors.name && (<p>{errors.name}</p>)}
            </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_hotels.image.map((imag) => (
                    <div>
                      <img src={imag.url} />
                    </div>
                  ))}
                </div>
                <div class="nombre text-danger "></div>
                <div>
                {errors.image && (<p>{errors.image}</p>)}
            </div>
              </div>
            </div>

            <div className="mb-4">
              <label for="nombre"><i className="bi bi-geo-alt"></i> Address</label>
              <input 
              type="text" 
              className="form-control" 
              placeholder="Address"
              defaultValue={input_hotels.address || detailHotel?.address} name="address" onChange={(e) => handleChange(e)} />
              <div className="nombre text-danger "></div>
              <div>
                {errors.address && (<p>{errors.address}</p>)}
            </div>
            </div>

            <div className="mb-4">
              <label for="nombre"><i className="bi bi-house"></i> State</label>
              <select className="form-select" name="state" defaultValue={input_location.state } onChange={(e) => handleChangeLocation(e)}>
                <option defaultValue={input_location.state} hidden selected >Select state</option>
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
                <select className="form-select " name="department" defaultValue={input_location.department} onChange={(e) => handleChangeLocation(e)}>
                  <option defaultValue={input_location.department} hidden selected>Select department</option>
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
                <select className="form-select" name="idLocation" defaultValue={input_hotels.idLocation} onChange={(e) => handleChange(e)}>
                  <option  defaultValue={input_hotels.idLocation} hidden selected>Select city</option>
                  {get_city?.sort((a,b)=>{
                                if(a.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) => (
                      <option value={ele.id} key={i} > {ele.city.toLowerCase()} </option>
                    ))}                  
                </select>
                <div className="nombre text-danger "></div>
                <div>
                {errors.idLocation && (<p>{errors.idLocation}</p>)}
            </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-star"></i> Qualification</label>
                <input 
                class="form-range" 
                type="range" 
                min="1" 
                max="5" 
                defaultValue={input_hotels.qualification || detailHotel?.qualification} name="qualification"
                maxLength="1000" 
                onChange={(e) => handleChange(e)} />
                {<p className=""> <i class="bi bi-star"></i> : {input_hotels.qualification || detailHotel?.qualification}</p>}
                <div class="nombre text-danger "></div>
                <div>
                {errors.qualification && (<p>{errors.qualification}</p>)}
            </div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea 
              id="mensaje" 
              class="form-control" 
              placeholder="Description" 
              defaultValue={input_hotels.description|| detailHotel.description}
              name="description" 
              maxLength="1000" 
              onChange={(e) => handleChange(e)}>
              </textarea>
              <div class="mensaje text-danger"></div>
              <div>
                {errors.description && (<p>{errors.description}</p>)}
            </div>
            </div>

            <div class="mb-4">
            {!input_hotels.id ||!input_hotels.name || !input_hotels.image.length || !input_hotels.qualification || !input_hotels.description || !input_hotels.address ||!input_hotels.idLocation || !input_location.state || !input_location.department || Object.keys(errors).length?
              <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                <span>Modify</span><i id="icono" class="bi bi-cursor-fill "></i>
              </button> 
              : <button class="col-12 btn btn-primary d-flex justify-content-between" type="submit" >
                <span>Modify</span><i id="icono" class="bi bi-cursor-fill "></i>
              </button>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )}