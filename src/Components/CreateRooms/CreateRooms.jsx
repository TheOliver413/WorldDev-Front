import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRooms, getHotels, getAllServicesRoom } from '../../redux/action/action';
// import { getCity, getDepartment, getState } from "../../redux/action/action";
import { toast } from "react-toastify";
import '../CreateRooms/Styles.css';
import { useNavigate, Link } from "react-router-dom";

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
  
 //--------------------------------------------------------
 const datos = useSelector((state) => state.reducerAuth.users);
 const { user } = useAuth();

 useEffect(() => {
   if (user && user.uid) dispatch(getDetailUser(user.uid));
 }, [dispatch, user]);

useEffect(()=> {
 if (datos && datos.rol === "admin"){
   let hotelFinded = hotels.find(e => e.name === datos.hotel)

   input_setrooms({
     ...input_rooms,
     id: hotelFinded.id
   })
 }
},[datos])

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

const onHandleDeleteimage = (e) => {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      image: input_rooms.image.filter(el => el.public_id !== e.target.value)
  })
}

  const onHandleDelete = (e) => {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      services: input_rooms.services.filter(el => el !== e.target.value)
    })
  }
  
  const navigate = useNavigate()
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
      navigate('/home')
      toast.success('Rooms created successfully', { position: 'bottom-right' })
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }

  return (
    <div class="container">
        <div class="row">
        <Link to= "/profileSuperAdmin/formsSuperAdmin">
      <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
      </Link>
    <section className="d-flex justify-content-center align-items-center">
      <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div className="mb-4 d-flex justify-content-start align-items-center">

          <h1>Rooms</h1>
        </div>
        <div className="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-building"></i> Hotels</label>
                {datos && datos.rol === "superAdmin" ? 
                <select className="form-select " name="id" value={input_rooms.id} onChange={(e) =>
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
                </select>:
                <option disabled value={datos.id}> {datos.hotel} </option>}
                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.id && (<p>{errors.id}</p>)}
            </div> 

            <div className="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"><i className="bi bi-house"></i> Name</label>
                <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)}>
                  <option hidden selected>Name...</option>
                  <option value="double" >double</option>
                  <option value="family" >family</option>
                  <option value="single" >single</option>
                  <option value="suite" >suite</option>
                </select>
                <div className="nombre text-danger "></div>
              </div>
              <div>
                {errors.name && (<p>{errors.name}</p>)}
            </div> 

              <div>
                <label for="nombre"> <i className="bi bi-tag"></i> Categories</label>
                <select className="form-select form-control" value={input_rooms.category} name='category' onChange={(e) => handleChange(e)}>
                  <option hidden selected>Categories...</option>
                  <option value="premium">Premium</option>
                  <option value="presidential">Presidential</option>
                  <option value="standard">Standard</option>
                </select>
                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.category && (<p>{errors.category}</p>)}
            </div>

            <div className="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_rooms.image.map((imag) => (
                    <div key={imag.public_id}>
                      <img src={imag.url} alt='images room'></img><button value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
                    </div>
                  ))}
                </div>
                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.image && (<p>{errors.image}</p>)}
            </div> 
            

            <div className="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-gear"></i> Services</label>
                <select className="form-select " value={input_rooms.services} onChange={(e) => handleServices(e)}>
                  <option hidden selected >Services...</option>
                  {servicios?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map(e => <option key={e.id} value={e.name}>{e.name.toLowerCase()}</option>)}
                </select>
                <div className="nombre text-danger "></div>
              </div>
              <div>
                {errors.services && (<p>{errors.services}</p>)}
              </div>

              <ul>{input_rooms.services.map(el =>
                <li className='punto-list' key={el}>{el}<button value={el} onClick={(e) => onHandleDelete(e)}>x</button> </li>)}
              </ul>
            </div>
            

            <div className="mb-4">
              <div>
                <label for="nombre"><i className="bi bi-currency-dollar"></i> Stock</label>
                <input className="form-range" type="range" min="1" max="50"
                  value={input_rooms.stock} name="stock" onChange={(e) => handleChange(e)} />
                {<p>Available : {input_rooms.stock}</p>}

                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.stock && (<p>{errors.stock}</p>)}
            </div>

            <div className="mb-4">
              <div>
                <label for="nombre"><i className="bi bi-currency-dollar"></i> Price</label>
                <input className="form-range" type="range" min="10" max="1000" value={input_rooms.price} name="price" onChange={(e) => handleChange(e)} />
                {<p>Value USD {input_rooms.price}</p>}
                <div className="nombre text-danger "></div>
              </div>
            </div>
            <div>
                {errors.price && (<p>{errors.price}</p>)}
            </div>

            <div className="mb-4">
              <label for="mensaje"> <i className="bi bi-chat-left-dots" required></i> Description</label>
              <textarea className="form-control" placeholder="Description..." type="text"
                value={input_rooms.description} name="description" maxLength="500"
                onChange={(e) => handleChange(e)}></textarea>
              <div className="mensaje text-danger"></div>
            </div>
            <div>
                {errors.description && (<p>{errors.description}</p>)}
            </div>


            <div className="mb-2">
              {!input_rooms.id || !input_rooms.name || !input_rooms.image.length || !input_rooms.price || !input_rooms.description || !input_rooms.category ||!input_rooms.services.length || !input_rooms.stock || Object.keys(errors).length?
              <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                <span>Create </span><i id="icono" className="bi bi-cursor-fill "></i>
              </button>
              : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
              <span>Create </span><i id="icono" className="bi bi-cursor-fill "></i>
          </button>}
            </div>

          </form>
        </div>
      </div>
    </section>
    </div>
    </div> 
  )}