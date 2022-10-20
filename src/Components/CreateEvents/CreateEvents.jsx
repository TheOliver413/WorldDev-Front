import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createEvents, getHotels } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_event) => {
  let errors = {};
  if (!input_event.name) errors.name = 'Name is required'
  if (!input_event.image) errors.image = 'Upload at least one image'
  if (!input_event.description) errors.description = 'Description is required.. '
  if (!input_event.date) errors.date = 'Date is required'
  if (!input_event.time) errors.time = 'Time is required'
  if (!input_event.idHotel) errors.idHotel = 'Hotel name is required'
  return errors;
}

const CreateEvents = () => {
  const dispatch = useDispatch();

  const hotels = useSelector(state=>state.reducerHotel.hotels)

  const [input_event, setInput_event] = useState({
    name: '',
    idHotel:'',
    date: '',
    time: '',
    image: '',
    description: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    !hotels.length && dispatch(getHotels());
  }, [dispatch, hotels]) 

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
    if (input_event) {
      // if(input_create.option === 'create') {
      dispatch(createEvents(input_event)) //crear la action
      toast.success('Event created successfully', { position: 'bottom-right' })
      // } else {
      //  dispatch(modifyEvents(input_event)) //crear la action
      // toast.success('Event modified successfully', { position: 'bottom-right' })
      // }
      setInput_event({
        name: '',
        idHotel:'',
        date: '',
        image: '',
        time: '',
        description: '',
      })
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }   
      

  return (
    <div>
    <form onSubmit={(e) => handleSubmit(e)}>
     
{/* {-----------------EVENT NAME-----------} */}
      <div>
        <label>Event Name</label>
        <input 
          placeholder="Event Name..."
          type="text" 
          value={input_event.name} 
          name="name" 
          onChange={(e) => handleName(e)} 
        />
      </div>
      <div>
        {errors.name && (<p>{errors.name}</p>)}
      </div>

       {/* {-----------------HOTEL NAME (idHotel)-----------} */}
       <div>
        <label>Hotel Name</label>
        <select value={input_event.idHotel} onChange={(e) => handleChangeHotel(e)}>
          <option hidden selected>Select hotel</option>
          {hotels?.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }).map(e =>
            <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e=> `${e.city}, ${e.state},${e.department}`)}`}</option>)} {/*mapeo el nombre de los hoteles*/}
        </select>
      </div>
      <div>
        {errors.idHotel && (<p>{errors.idHotel}</p>)}
      </div>

{/* {-----------------DATE-----------} */}
      <div>
        <label>Date</label>
        <input
          type="date"
          value={input_event.date}
          name="date"
          onChange={(e) => handleChange(e)}
        />
        <div>
        {errors.date && (<p>{errors.date}</p>)}
        </div>
      </div>

      {/* {-----------------TIME-----------} */}
      <div>
        <label>Time</label>
        <input
          type="time"
          value={input_event.time}
          name="time"
          onChange={(e) => handleChange(e)}
        />
        <div>
        {errors.time && (<p>{errors.time}</p>)}
        </div>
      </div>

 {/* {-----------------IMAGE-----------} */}     
      <div>
        <label>Image</label>
        <input
          placeholder="Load URL Image..."
          type="file"
          value={input_event.image}
          name="image"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        {errors.image && (<p>{errors.image}</p>)}
      </div>

 {/* {-----------------DESCRIPTION-----------} */}         
      <div>
        <label>Description</label>
        <textarea
          placeholder="Description..."
          type="text"
          value={input_event.description}
          name="description"
          maxLength="1000"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        {errors.description && (<p>{errors.description}</p>)}
      </div>

{/* {-----------------BUTTON-----------} */}   
      {!input_event.name || !input_event.image || !input_event.description || !input_event.date||!input_event.time ||!input_event.idHotel || Object.keys(errors).length 
        ? (<button disabled type="submit">Send</button>) 
        : (<button type="submit">Send</button>)}
    </form>
    </div>
  )
}

export default CreateEvents;