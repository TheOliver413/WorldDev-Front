import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRooms, getHotels, getAllServicesRoom } from '../../redux/action/action';
import { getCity, getDepartment, getState } from "../../redux/action/action";
import { toast } from "react-toastify";
import '../CreateRooms/Styles.css';

const validate = (input_rooms) => {
  let errors = {};
  if(!input_rooms.id) errors.id = 'Hotel name is required'
  if(!input_rooms.name) errors.name = 'Room name is required'
  if(!input_rooms.image.length) errors.image = 'Upload at least one image'
  if(!input_rooms.price) errors.price = 'The price is required'
  if(/^\d+$^\d+$/.test(input_rooms.price)) errors.price = 'The price must be in integers'  
  if(!input_rooms.description) errors.description = 'Description is required'
  if(!input_rooms.category) errors.category = 'Category is required'
  if(!/^[a-zA-Z ]*$/.test(input_rooms.category)) errors.category = 'Invalid category: must only contain letters'
  if(!input_rooms.services.length) errors.services = 'Services is required'
  if(!input_rooms.stock) errors.stock = 'The stock is required'
  if(/^\d+$^\d+$/.test(input_rooms.stock)) errors.stock = 'The stock must be in integers'
  return errors;
}

export default function CreateRooms() {
 
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const servicios = useSelector(state => state.reducerRoom.servicesRoom)  
  
  const [input_rooms, input_setrooms] = useState({
    id: "", //DEL HOTEL
    name: "",
    image: [],
    price: 0,
    description: "",
    category: "",
    services: [],
    stock: 0,
  })

  const [errors, setErrors] = useState({})  
  
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getAllServicesRoom());
  }, [dispatch, hotels])
  
 

  //------------------ HANDLE CHANGE ROOMS-------------------//
  function handleChange (e) {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_rooms,
      [e.target.name] : e.target.value
  }))
}
  

  function handleServices(e) {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      services: input_rooms.services.includes(e.target.value) ? input_rooms.services : [...input_rooms.services, e.target.value]
    })
    setErrors(validate({
      ...input_rooms,
      services : [...input_rooms.services, e.target.value]
  }))
  }

  //-----------------------CLOUDINARY--------------------------//
  async function handleOpenWidget() {
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5',
      uploadPreset: 'wwtvto96'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        input_setrooms({
          ...input_rooms,
          image: [...input_rooms.image, { url: result.info.url, public_id: result.info.public_id }]
        })
        setErrors(validate({
          ...input_rooms,
          image: [...input_rooms.image, { url: result.info.url, public_id: result.info.public_id }]
        }))
      }
    })
    myWidget.open()
  }
  //--------------------------------------------//

  const onHandleDelete = (e) => {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      services: input_rooms.services.filter(el => el !== e.target.value)
    })
  }
  function handleSubmit(e) {
    e.preventDefault()  
    if (input_rooms && !Object.keys(errors).length) {
      dispatch(createRooms(input_rooms))
      input_setrooms({
        id: "",
        name: "",
        image: [],
        price: 0,
        description: "",
        category: "",
        services: [],
        stock: 0,
      })
      toast.success('Rooms created successfully', { position: 'bottom-right' })
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }

  return (
    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">

          <h1>Rooms</h1>
        </div>
        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Hotels</label>
                <select class="form-select " name="id" value={input_rooms.id} onChange={(e) =>
                  handleChange(e)}>
                  <option hidden selected>Hotels...</option>
                  {hotels?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map((ele, i) => (
                      <option value={ele.id} key={i}>{`${ele.name}, ${(ele.Locations).map(ele=>
                        `${ele.state},${ele.department}, ${ele.city.toLowerCase()}`)}`}</option>
                    )
                  )}
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.id && (<p>{errors.id}</p>)}
            </div> 

            <div class="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"><i class="bi bi-house"></i> Name</label>
                <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)}>
                  <option hidden selected>Name...</option>
                  <option value="double" >double</option>
                  <option value="family" >family</option>
                  <option value="single" >single</option>
                  <option value="suite" >suite</option>
                </select>
                <div class="nombre text-danger "></div>
              </div>
              <div>
                {errors.name && (<p>{errors.name}</p>)}
            </div> 

              <div>
                <label for="nombre"> <i class="bi bi-tag"></i> Categories</label>
                <select class="form-select" value={input_rooms.category} name='category' className="form-control" onChange={(e) => handleChange(e)}>
                  <option hidden selected>Categories...</option>
                  <option value="premium">Premium</option>
                  <option value="presidential">Presidential</option>
                  <option value="standard">Standard</option>
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.category && (<p>{errors.category}</p>)}
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_rooms.image.map((imag) => (
                    <div>
                      <img src={imag.url} />
                    </div>
                  ))}

                </div>
                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.image && (<p>{errors.image}</p>)}
            </div> 
            

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-gear"></i> Services</label>
                <select class="form-select " value={input_rooms.services} onChange={(e) => handleServices(e)}>
                  <option hidden selected >Services...</option>
                  {servicios?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map(e => <option key={e.id} value={e.name}>{e.name.toLowerCase()}</option>)}
                </select>
                <div class="nombre text-danger "></div>
              </div>
              <div>
                {errors.services && (<p>{errors.services}</p>)}
              </div>

              <ul>{input_rooms.services.map(el =>
                <li className='punto-list' key={el}>{el}<button value={el} onClick={(e) => onHandleDelete(e)}>x</button> </li>)}
              </ul>
            </div>
            

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-currency-dollar"></i> Stock</label>
                <input class="form-range" type="range" min="1" max="50"
                  value={input_rooms.stock} name="stock" onChange={(e) => handleChange(e)} />
                {<p>Available : {input_rooms.stock}</p>}

                <div class="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.stock && (<p>{errors.stock}</p>)}
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-currency-dollar"></i> Price</label>
                <input class="form-range" type="range" min="10" max="1000" value={input_rooms.price} name="price" onChange={(e) => handleChange(e)} />
                {<p>Value USD {input_rooms.price}</p>}
                <div class="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.price && (<p>{errors.price}</p>)}
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea class="form-control" placeholder="Description..." type="text"
                value={input_rooms.description} name="description" maxLength="500"
                onChange={(e) => handleChange(e)}></textarea>
              <div class="mensaje text-danger"></div>
            </div>
            <div>
                {errors.description && (<p>{errors.description}</p>)}
            </div>


            <div class="mb-2">
              {!input_rooms.id || !input_rooms.name || !input_rooms.image.length || !input_rooms.price || !input_rooms.description || !input_rooms.category ||!input_rooms.services.length || !input_rooms.stock || Object.keys(errors).length?
              <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                <span>Create </span><i id="icono" class="bi bi-cursor-fill "></i>
              </button>
              : <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
              <span>Create </span><i id="icono" class="bi bi-cursor-fill "></i>
          </button>}
            </div>

          </form>
        </div>
      </div>
    </section> 
  )}