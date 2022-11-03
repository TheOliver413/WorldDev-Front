import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyRooms, getHotels, getAllRoomsOfHotel, getAllServicesRoom, getDetailRoom, cleanRoomDetail } from '../../redux/action/action';
import '../CreateRooms/Styles.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";
import { Link } from "react-router-dom";

const validate = (input_rooms) => {
  let errors = {};
  if (!input_rooms.id) errors.id = 'Room Name is required'
  if (!input_rooms.name) errors.name = 'Room Name is required'
  if (!input_rooms.image.length) errors.image = 'Upload at least one image'
  if (!input_rooms.price) errors.price = 'The price is required'
  if (/^\d+$^\d+$/.test(input_rooms.price)) errors.price = 'The price must be in integers'
  if (!input_rooms.description) errors.description = 'Description is required'
  if (!input_rooms.category) errors.category = 'Category is required'
  if (!/^[a-zA-Z ]*$/.test(input_rooms.category)) errors.category = 'Invalid category: must only contain letters'
  if (!input_rooms.services.length) errors.services = 'Services is required'
  if (!input_rooms.stock) errors.stock = 'The stock is required'
  if (/^\d+$^\d+$/.test(input_rooms.stock)) errors.stock = 'The stock must be in integers'
  return errors;
}
const validateTwo = (input_hotel) => {
  let error = {};
  if (!input_hotel.idHotel) error.idHotel = 'Hotel name is required';
  console.log('error is hotel', error)
  return error;
}


export default function ModifyRooms() {

  const dispatch = useDispatch();
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const rooms = useSelector(state => state.reducerRoom.allRooms)
  const servicios = useSelector(state => state.reducerRoom.servicesRoom)
  const detailRoom = useSelector(state => state.reducerRoom.detailRoom)
  const datos = useSelector((state) => state.reducerAuth.users);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) dispatch(getDetailUser(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    if (datos && datos.rol === "admin") {
      let hotelFinded = hotels.find(e => e.name === datos.hotel)

      setInput_hotel({
        ...input_hotel,
        idHotel: hotelFinded.id
      })
      dispatch(getAllRoomsOfHotel(hotelFinded.id))
    }
  }, [datos])

  const [input_hotel, setInput_hotel] = useState({
    idHotel: "",
  })
  const [input_rooms, input_setrooms] = useState({
    id: "", //DE LA ROOM
    name: "",
    image: [],
    price: 0,
    description: "",
    category: "",
    services: [],
    stock: 0,
  })


  const [nameRooms, setnameRooms] = useState([
    "Single", "Double", "Family", "Suite"
  ])

  const [errors, setErrors] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getAllServicesRoom());
  }, [dispatch, hotels])

  //component will unmount
  useEffect(() => {
    return () => dispatch(cleanRoomDetail())
  }, [dispatch])

  //------------------ HANDLE CHANGE ROOMS-------------------//

  function handleChangeHotel(e) {
    e.preventDefault();
    setInput_hotel({
      ...input_hotel,
      idHotel: e.target.value
    })
    setError(validateTwo({
      ...input_hotel,
      idHotel: e.target.value
    }))
    dispatch(getAllRoomsOfHotel(e.target.value))
  }

  function handleChangeRoom(e) {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_rooms,
      [e.target.name]: e.target.value
    }))
    dispatch(getDetailRoom(e.target.value))
  }

  function handleChange(e) {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_rooms,
      [e.target.name]: e.target.value
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
      services: [...input_rooms.services, e.target.value]
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
  //--------------------------------------------//
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()

    if (input_rooms && !Object.keys(errors).length) {
      dispatch(modifyRooms(input_rooms))
      toast.success('Rooms modify successfully', { position: 'bottom-right' })
      setInput_hotel({
        idHotel: ''
      })
      input_setrooms({
        id: "",
        name: "",
        image: [],
        price: 0,
        description: "",
        category: "",
        services: [""],
        stock: 0,
      })
      navigate('/home')
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }

  return (
    <div>
      <Link to="/profileSuperAdmin/formsSuperAdmin">
        <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
      </Link>
      {
        datos.rol === 'superAdmin' || datos.rol === 'admin' ?

          <section className="d-flex justify-content-center align-items-center">
            <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
              <div className="mb-4 d-flex justify-content-start align-items-center">

                <h1>Modify Rooms</h1>
              </div>
              <div className="mb-1">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-building"></i> Hotels</label>
                      {datos && datos.rol === "superAdmin" ?
                        <select className="form-select " value={input_hotel.idHotel} onChange={(e) => handleChangeHotel(e)}>
                          <option hidden selected >Select hotel</option>
                          {hotels?.sort((a, b) => {
                            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                            return 0;
                          }).map((ele, i) => (
                            <option value={ele.id} key={i}>{`${ele.name}, ${(ele.Locations).map(ele =>
                              `${ele.state},${ele.department}, ${ele.city.toLowerCase()}`)}`}</option>
                          ))}
                        </select> :
                        <option disabled value={datos.id}> {datos.hotel} </option>}
                      <div className="nombre text-danger "></div>
                      <div className="nombre text-danger ">
                        {error.idHotel && (<p>{error.idHotel}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-house"></i> Rooms</label>
                      <select className="form-select " value={input_rooms.id} name="id" onChange={(e) => handleChangeRoom(e)}>
                        <option hidden selected >Select room</option>
                        {rooms?.sort((a, b) => {
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                          return 0;
                        }).map((ele, i) => {
                          return (
                            <option value={ele.id} key={i} >{ele.name}</option>
                          )
                        })}
                      </select>
                      <div className="nombre text-danger "></div>
                      <div>
                        {errors.id && (<p>{errors.id}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 d-flex justify-content-between">
                    <div>
                      <label for="nombre"><i className="bi bi-house"></i> Name</label>
                      <select className="form-select" value={input_rooms.name} name="name" onChange={(e) => handleChange(e)}>
                        <option hidden selected >Select name</option>
                        {nameRooms?.sort((a, b) => {
                          if (a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                          if (a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                          return 0;
                        }).map((ele, i) => (
                          <option value={ele} key={i} >{ele}</option>
                        )
                        )}
                      </select>
                      <div>
                        {errors.name && (<p>{errors.name}</p>)}
                      </div>
                      <div className="nombre text-danger "></div>
                    </div>

                    <div>
                      <label for="nombre"> <i className="bi bi-tag"></i> Category</label>
                      <select className="form-select form-control" name="category" value={input_rooms.category} onChange={(e) => handleChange(e)}>
                        <option hidden selected >Select category </option>
                        <option value="premium">Premium</option>
                        <option value="presidential" >Presidential</option>
                        <option value="standard" >Standard</option>
                      </select>
                      <div className="nombre text-danger "></div>
                      <div>
                        {errors.category && (<p>{errors.category}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                      <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                      <div>
                        {input_rooms.image.map((imag) => (
                          <div key={imag.public_id}>
                            <img src={imag.url} alt='images room' /><button className="btn btn-outline-danger mt-2" value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
                          </div>
                        ))}

                      </div>
                      <div className="nombre text-danger "></div>
                      <div>
                        {errors.image && (<p>{errors.image}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-gear"></i> Services</label>
                      <select className="form-select " value={input_rooms.services} onChange={(e) => handleServices(e)}>
                        <option hidden selected >Select services</option>
                        {servicios?.sort((a, b) => {
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                          return 0;
                        }).map(e => <option key={e.id} value={e.name}>{e.name.toLowerCase()}</option>)}
                      </select>
                      <div>
                        {errors.services && (<p>{errors.services}</p>)}
                      </div>

                      <ul>{input_rooms.services.map(el =>
                        <li className='punto-list' key={el}>{el}<button value={el} onClick={(e) => onHandleDelete(e)}>x</button> </li>)}
                      </ul>

                      <div className="nombre text-danger "></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"><i className="bi bi-currency-dollar"></i> Stock</label>
                      <input className="form-range"
                        type="range"
                        min="1"
                        max="50"
                        defaultValue={input_rooms.stock || detailRoom?.stock}
                        name="stock"
                        onChange={(e) => handleChange(e)} />
                      {<p >Available : {input_rooms.stock || detailRoom?.stock}</p>}
                      <div className="nombre text-danger "></div>
                    </div>
                    <div>
                      {errors.stock && (<p>{errors.stock}</p>)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"><i className="bi bi-currency-dollar"></i> Price</label>
                      <input className="form-range"
                        type="range"
                        min="10"
                        max="1000"
                        defaultValue={detailRoom?.price || input_rooms.price}
                        name="price"
                        onChange={(e) => handleChange(e)} />
                      {<p>Value USD {input_rooms.price || detailRoom?.price}</p>}

                      <div className="nombre text-danger "></div>
                      <div>
                        {errors.price && (<p>{errors.price}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label for="mensaje"> <i className="bi bi-chat-left-dots" required></i> Description</label>
                    <textarea className="form-control" placeholder="Description..."
                      type="text"
                      defaultValue={input_rooms.description || detailRoom?.description}
                      name="description"
                      maxLength="500"
                      onChange={(e) => handleChange(e)}></textarea>
                    <div className="mensaje text-danger"></div>
                    <div>
                      {errors.description && (<p>{errors.description}</p>)}
                    </div>
                  </div>


                  <div className="mb-2">
                    {!input_hotel.idHotel || !input_rooms.id || !input_rooms.name || !input_rooms.image.length || !input_rooms.price || !input_rooms.description || !input_rooms.category || !input_rooms.services.length || !input_rooms.stock || Object.keys(errors).length ?
                      <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                        <span>Modify </span><i id="icono" className="bi bi-cursor-fill "></i>
                      </button>
                      : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between" onClick={(e) => handleSubmit(e)}>
                        <span>Modify</span><i id="icono" className="bi bi-cursor-fill "></i>
                      </button>}
                  </div>

                </form>
              </div>
            </div>
          </section> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}