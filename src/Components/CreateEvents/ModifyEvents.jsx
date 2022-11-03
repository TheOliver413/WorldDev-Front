import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearEventById, getAllEvents, getEventById, getHotels, modifyEvents,getEventsByIdHotel } from "../../redux/action/action";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";
import { Link } from "react-router-dom";

const validate = (input_event) => {
  let errors = {};
  if (!input_event.id) errors.id = 'Event is required'
  if (!input_event.name) errors.name = 'Name is required'
  if (!input_event.idHotel) errors.idHotel = 'Hotel name is required'
  if (!input_event.date) errors.date = 'Date is required'
  if (!input_event.time) errors.time = 'Time is required'
  if (!input_event.image.length) errors.image = 'Upload at least one image'
  if (!input_event.description) errors.description = 'Description is required.. '
  return errors;
}


const ModifyEvents = () => {
  const dispatch = useDispatch();

  const hotels = useSelector(state => state.reducerHotel.hotels)
  const allEvents = useSelector(state => state.reducerHotel.allEvents)
  const eventId = useSelector(state => state.reducerHotel.eventId)
  const [input_event, setInput_event] = useState({
    id: '',
    name: '',
    idHotel: '',
    date: '',
    time: '',
    image: [],
    description: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    if (datos && datos.rol === "superAdmin"){
    !allEvents.length && dispatch(getAllEvents())
    }
  }, [dispatch, hotels])

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearEventById())
  }, [dispatch])
  //-------------------------------------------------
  const datos = useSelector((state) => state.reducerAuth.users);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) dispatch(getDetailUser(user.uid));
  }, [dispatch, user]);
 
 useEffect(()=> {
  if (datos && datos.rol === "admin"){
    let hotelFinded = hotels.find(e => e.name === datos.hotel)
    console.log("consologeando holte!!!", hotelFinded)
    dispatch(getEventsByIdHotel(hotelFinded.id))
    setInput_event({
      ...input_event,
      idHotel: hotelFinded.id
    })
  }
 },[datos])

  //------------ HANDLE CHANGE EVENT--------------//
  const handleChangeEvent = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      id: e.target.value
    })
    setErrors(validate({
      ...input_event,
      id: e.target.value
    }))
    dispatch(getEventById(e.target.value))
  }

  //------------ HANDLE CHANGE NAME EVENTO--------------//
  const handleName = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      name: e.target.value.toLowerCase()
    })
    setErrors(validate({
      ...input_event,
      name: e.target.value
    }))
  }
  //--------------Cloudinary-----------------//
  async function handleOpenWidget() {
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5',
      uploadPreset: 'wwtvto96'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info); 
        // setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        setInput_event({
          ...input_event,
          image: [...input_event.image, { url: result.info.url, public_id: result.info.public_id }]
        })
        setErrors(validate({
          ...input_event,
          image: [...input_event.image, { url: result.info.url, public_id: result.info.public_id }]
        }))
      }
    })
    myWidget.open()
  }

  const onHandleDeleteimage = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      image: input_event.image.filter(el => el.public_id !== e.target.value)
    })
  }

  //------------ HANDLE CHANGE HOTEL NAME----------//
  const handleChangeHotel = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      idHotel: e.target.value
    })
    setErrors(validate({
      ...input_event,
      idHotel: e.target.value
    }))
  }

  //------------ HANDLE CHANGE --------------//
  const handleChange = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input_event,
      [e.target.name]: e.target.value
    }))
  }
function refreshPage(){
  window.location.reload()
  setTimeout(()=>{
    window.location.reload(false)
  },500)
}
  console.log("info hacia el back: ", input_event)
  //----------------HANDLE SUBMIT EVENT------------------//
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input_event && !Object.keys(errors).length) {
      dispatch(modifyEvents(input_event))
      toast.success('Event modified successfully', { position: 'bottom-right' })
      setInput_event({
        id: '',
        name: '',
        idHotel: '',
        date: '',
        time: '',
        image: [],
        description: '',
      })
      navigate('/home/Events')
      refreshPage()
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

                <h1>Modify Events</h1>
              </div>
              <div className="mb-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-building"></i> Current event name</label>
                      <select className="form-select" value={input_event.id} onChange={(e) => handleChangeEvent(e)}>
                        <option hidden selected>Select Event</option>
                        {allEvents?.sort((a, b) => {
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                          if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                          return 0;
                        }).map(e =>
                          <option key={e.id} value={e.id}>{e.name} - {e.date.substr(-30, 10)} - {e.time.substr(-30, 5)}hrs</option>)}
                        {/*mapeo el nombre de los hoteles*/}
                      </select>
                      <div className="nombre text-danger ">
                        {errors.id && (<p>{errors.id}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-calendar-event"></i> Event Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={input_event.name || eventId?.name}
                        name="name"
                        onChange={(e) => handleName(e)} />
                      <div className="nombre text-danger ">
                        {errors.name && (<p>{errors.name}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-building"></i> Hotel Name</label>
                      {datos && datos.rol === "superAdmin" ?
                        <select className="form-select" value={input_event.idHotel} onChange={(e) =>
                          handleChangeHotel(e)}>
                          <option hidden selected>Select hotel</option>
                          {hotels?.sort((a, b) => {
                            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                            if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                            return 0;
                          }).map(e =>
                            <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e =>
                              `${e.state},${e.department}, ${e.city.toLowerCase()}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                        </select> :
                        <option disabled value={datos.id}> {datos.hotel} </option>}
                      <div className="nombre text-danger ">
                        {errors.idHotel && (<p>{errors.idHotel}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 d-flex justify-content-between">
                    <div>
                      <label for="nombre"> <i className="bi bi-calendar-event"></i> Date</label>
                      <input
                        type="date"
                        min={format(new Date(), 'yyyy-MM-dd')}
                        max="2023-04-01"
                        className="form-control"
                        defaultValue={input_event.date || eventId?.date}
                        name="date"
                        onChange={(e) => handleChange(e)} />
                      <div className="nombre text-danger ">
                        {errors.date && (<p>{errors.date}</p>)}
                      </div>
                    </div>

                    <div>
                      <label for="nombre"> <i className="bi bi-clock"></i> Time</label>
                      <input
                        type="time"
                        className="form-control"
                        defaultValue={input_event.time || eventId?.time}
                        name="time"
                        onChange={(e) => handleChange(e)} />
                      <div className="nombre text-danger ">
                        {errors.time && (<p>{errors.time}</p>)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div>
                      <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                      <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                      <div>
                        <div>
                          {input_event.image?.map((imag) => (
                            <div key={imag.public_id}>
                              <img src={imag.url} alt='images event' /><button className="btn btn-outline-danger mt-2" value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
                            </div>
                          ))}
                        </div>
                        <div>
                          {errors.image && (<p>{errors.image}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label for="mensaje"> <i className="bi bi-chat-left-dots" required></i> Description</label>
                    <textarea
                      className="form-control"
                      placeholder="Description..."
                      defaultValue={input_event.description || eventId?.description}
                      name="description" maxLength="1000"
                      onChange={(e) => handleChange(e)}>
                    </textarea>
                    <div className="mensaje text-danger">
                      {errors.description && (<p>{errors.description}</p>)}
                    </div>
                  </div>


                  <div className="mb-4">
                    {!input_event.id || !input_event.name || !input_event.image.length || !input_event.description || !input_event.date || !input_event.time || !input_event.idHotel || Object.keys(errors).length
                      ? <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                        <span>Modify </span><i id="icono" className="bi bi-cursor-fill "></i>
                      </button>
                      : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                        <span>Modify </span><i id="icono" className="bi bi-cursor-fill "></i>
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

export default ModifyEvents;