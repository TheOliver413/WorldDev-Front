import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getHotels, modifyEvents } from "../../redux/action/action";
import { toast } from "react-toastify";

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
    !allEvents.length && dispatch(getAllEvents())
  }, [dispatch, hotels])


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
  }

  //------------ HANDLE CHANGE NAME EVENTO--------------//
  const handleName = (e) => {
    e.preventDefault();
    setInput_event({
      ...input_event,
      name: e.target.value.toLowerCase().trim()
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
        setErrors({
          ...input_event,
          image: [...input_event.image, { url: result.info.url, public_id: result.info.public_id }]
        })
      }
    })
    myWidget.open()
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

  //----------------HANDLE SUBMIT EVENT------------------//
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
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }


  return (
    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">

          <h1>Modify Events</h1>
        </div>
        <div class="mb-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Current event name</label>
                <select class="form-select" value={input_event.id} onChange={(e) => handleChangeEvent(e)}>
                  <option hidden selected>Select Event</option>
                  {allEvents?.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1; return 0;
                  }).map(e =>
                    <option key={e.id} value={e.id}>{`${e.name}, ${e.date}, ${e.time}`}</option>)}
                  {/*mapeo el nombre de los hoteles*/}
                </select>
                <div class="nombre text-danger ">
                  {errors.id && (<p>{errors.id}</p>)}
                </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-calendar-event"></i> Event Name</label>
                <input type="text" class="form-control" value={input_event.name} name="name" onChange={(e) =>
                  handleName(e)} />
                <div class="nombre text-danger ">
                  {errors.name && (<p>{errors.name}</p>)}
                </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Hotel Name</label>
                <select class="form-select" value={input_event.idHotel} onChange={(e) =>
                  handleChangeHotel(e)}>
                  <option hidden selected>Select hotel</option>
                  {hotels?.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1; return 0;
                  }).map(e =>
                    <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e =>
                      `${e.state},${e.department}, ${e.city.toLowerCase()}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                </select>
                <div class="nombre text-danger ">
                  {errors.idHotel && (<p>{errors.idHotel}</p>)}
                </div>
              </div>
            </div>

            <div class="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"> <i class="bi bi-calendar-event"></i> Date</label>
                <input type="date" class="form-control" value={input_event.date} name="date" onChange={(e) =>
                  handleChange(e)} />
                <div class="nombre text-danger ">
                  {errors.date && (<p>{errors.date}</p>)}
                </div>
              </div>

              <div>
                <label for="nombre"> <i class="bi bi-clock"></i> Time</label>
                <input type="time" class="form-control" value={input_event.time} name="time" onChange={(e) =>
                  handleChange(e)} />
                <div class="nombre text-danger ">
                  {errors.time && (<p>{errors.time}</p>)}
                </div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  <div>
                    {input_event.image?.map((imag) => (
                      <div>
                        <img src={imag.url} />
                      </div>
                    ))}
                  </div>
                  <div>
                    {errors.image && (<p>{errors.image}</p>)}
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea class="form-control" placeholder="Description..."
                value={input_event.description} name="description" maxLength="1000"
                onChange={(e) => handleChange(e)}></textarea>
              <div class="mensaje text-danger">
                {errors.description && (<p>{errors.description}</p>)}
              </div>
            </div>


            <div class="mb-4">
              {!input_event.id || !input_event.name || !input_event.image.length || !input_event.description || !input_event.date || !input_event.time || !input_event.idHotel || Object.keys(errors).length
                ? <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                  <span>Modify </span><i id="icono" class="bi bi-cursor-fill "></i>
                </button>
                : <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                  <span>Modify </span><i id="icono" class="bi bi-cursor-fill "></i>
                </button>}
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default ModifyEvents;