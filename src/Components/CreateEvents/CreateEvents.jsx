import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createEvents, getHotels } from "../../redux/action/action";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";

const validate = (input_event) => {
  let errors = {};
  if (!input_event.name) errors.name = 'Name is required'
  if (!input_event.image.length) errors.image = 'Upload at least one image'
  if (!input_event.description) errors.description = 'Description is required.. '
  if (!input_event.date) errors.date = 'Date is required'
  if (!input_event.time) errors.time = 'Time is required'
  if (!input_event.idHotel) errors.idHotel = 'Hotel name is required'
  return errors;
}

const CreateEvents = () => {
  const dispatch = useDispatch();

  const hotels = useSelector(state => state.reducerHotel.hotels)

  const [input_event, setInput_event] = useState({
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
  }, [dispatch, hotels])

  //-------------------------------------------------
  const datos = useSelector((state) => state.reducerAuth.users);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) dispatch(getDetailUser(user.uid));
  }, [dispatch, user]);

useEffect(()=> {
  if (datos && datos.rol === "admin"){
    let hotelFinded = hotels.find(e => e.name === datos.hotel)

    setInput_event({
      ...input_event,
      idHotel: hotelFinded.id
    })
  }
},[datos])

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
 //-----------------Cloudinary-----------------//
 async function handleOpenWidget(){
  var myWidget = await window.cloudinary.createUploadWidget({
    cloudName: 'dyyoavgq5', 
    uploadPreset: 'wwtvto96'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        // console.log('Done! Here is the image info: ', result.info); 
        // setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        setInput_event( {
          ...input_event,
          image:[...input_event.image, {url: result.info.url,public_id: result.info.public_id}]
        })
        setErrors(validate({
          ...input_event,
          image:[...input_event.image, {url: result.info.url,public_id: result.info.public_id}]
        }))
       
      }
    })
    myWidget.open()
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

  const onHandleDeleteimage = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      image: input_event.image.filter(el => el.public_id !== e.target.value)
  })
}
  //------------ HANDLE CHANGE --------------//
  const handleChangeDate = (e) => {
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

  //----------------HANDLE SUBMIT EVENT------------------//
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (input_event && !Object.keys(errors).length) {
      dispatch(createEvents(input_event)) 
      toast.success('Event created successfully', { position: 'bottom-right' })
      setInput_event({
        name: '',
        idHotel: '',
        date: '',
        image: [],
        time: '',
        description: '',
      })
      navigate('/home/Events')
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

                <h1>Events</h1>
            </div>
            <div className="mb-4">
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <div className="mb-4">
                        <div>
                            <label for="nombre"> <i className="bi bi-calendar-event"></i> Event Name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Event Name" 
                            value={input_event.name}
                            name="name"
                            onChange={(e)=> handleName(e)} />
                            <div className="nombre text-danger ">
                                {errors.name && (<p>{errors.name}</p>)}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div>
                            <label for="nombre"> <i className="bi bi-building"></i> Hotel Name</label>
                            {datos && datos.rol === "superAdmin" ?
                            <select className="form-select" value={input_event.idHotel} onChange={(e)=>
                                handleChangeHotel(e)}>
                                <option hidden selected>Select hotel</option>
                                {hotels?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map(e=>
                                    <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e => `
                                        ${e.state},${e.department}, ${e.city.toLowerCase()}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                            </select>:
                                <option disabled value={datos.id}> {datos.hotel} </option>}
                            <div className="nombre text-danger ">
                                {errors.idHotel && (<p>{errors.idHotel}</p>)}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 d-flex justify-content-between">
                        <div>
                            <label for="nombre"> <i className="bi bi-calendar-event"></i> Date</label>
                            <input type="date" 
                            className="form-control"
                            value={input_event.date} 
                            min={format(new Date(), 'yyyy-MM-dd')} 
                            max="2023-04-01"
                            name="date" 
                            onChange={(e)=>
                            handleChangeDate(e)} />
                            <div className="nombre text-danger ">
                                {errors.date && (<p>{errors.date}</p>)}
                            </div>
                        </div>

                        <div>
                            <label for="nombre"> <i className="bi bi-clock"></i> Time</label>
                            <input type="time" className="form-control" value={input_event.time} name="time" onChange={(e)=>
                            handleChange(e)} />
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
                        {input_event.image?.map((imag) =>(
                        <div key={imag.public_id}>
                          <img src={imag.url} alt='images event'/><button value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
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
                        <textarea className="form-control" placeholder="Description..." type="text"
                            value={input_event.description} name="description" maxLength="1000"
                            onChange={(e)=> handleChange(e)}></textarea>
                        <div className="mensaje text-danger">
                            {errors.description && (<p>{errors.description}</p>)}
                        </div>
                    </div>


                    <div className="mb-4">
                        {!input_event.name || !input_event.image.length || !input_event.description ||
                        !input_event.date || !input_event.time || !input_event.idHotel || Object.keys(errors).length
                        ? <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
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
  )
}

export default CreateEvents;