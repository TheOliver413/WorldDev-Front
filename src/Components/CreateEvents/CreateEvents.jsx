import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createEvents, getEventsHotel, getHotels, modifyEvents } from "../../redux/action/action";

const validate = (input_event) => {
    let errors = {};

    if(!input_event.name) errors.name = 'Name is required'
    
    if(!input_event.image) errors.image = 'Upload at least one image'
    
    if(!input_event.description) errors.description = 'Description is required.. '

    if(!input_event.date) errors.date = 'Date is required. Example: dd/mm/yyyy'

    if(!input_event.price) errors.price = 'Price is required'
    if(/^\d+$^\d+$/.test(input_event.price)) errors.price = 'Price can only contain numeric values'
    if(input_event.price < 0) errors.price = 'Price cannot be a negative value'

    if(!input_event.idHotel) errors.idHotel = 'Hotel name is required'

    return errors;
}

const CreateEvents = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(state=>state.reducerHotel.hotels)
    const events = useSelector(state => state.reducerHotel.onlyEventsHotel)

const [input_event, setInput_event] = useState({
    name: '',
    image: '',
    description: '',
    date: '',
    price: 0,
    idHotel:'',
})
const [input_create, setInput_create] = useState({
   option:''
})
const [errors, setErrors] = useState({})

useEffect(()=>{
    dispatch(getHotels())
  //  dispatch(getEventsHotel(input_event.idHotel)) //comentado hasta que funcione la ruta
},[dispatch]) 

//------------ HANDLE CHANGE CREATE/MODIFY --------------//
const handleChangeCreate = (e) => {
   e.preventDefault();        
   setInput_create({
       ...input_create,
       [e.target.name] : e.target.value
   })        
}

//------------ HANDLE CHANGE NAME EVENTO--------------//
const handleName = (e) => {
    e.preventDefault();        
    setInput_event({
        ...input_event,
        [e.target.name] : e.target.value.toLowerCase().trim()
    })        
    setErrors(validate({
        ...input_event,
        [e.target.name] : e.target.value
    }))
}

//------------ HANDLE CHANGE --------------//
const handleChange = (e) => {
    e.preventDefault();        
    setInput_event({
        ...input_event,
        [e.target.name] : e.target.value
    })        
    setErrors(validate({
        ...input_event,
        [e.target.name] : e.target.value
    }))
}

//------------ HANDLE CHANGE HOTEL NAME----------//
const handleChangeHotel = (e) => {
    e.preventDefault();        
    setInput_event({
        ...input_event,
       idHotel : e.target.value
    })        
    setErrors(validate({
        ...input_event,
        idHotel : e.target.value
    }))
}

//----------------HANDLE SUBMIT EVENT------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_event) {
      if(input_create.option === 'create') {
         dispatch(createEvents(input_event)) //crear la action
         alert('Event created successfully')
      } else{
         dispatch(modifyEvents(input_event)) //crear la action
         alert('Event modified successfully')
      }
      setInput_event({
         name: '',
         image: '',
         description: '',
         date: '',
         price: 0,
         idHotel:'',
      })
    } else {
      alert("Check the fields")
    }
  } 


return (
    <div className="cardHotels-container">
    <form onSubmit={(e) => handleSubmit(e)}>

      {/*----------------CREATE OR MODIFY------------------------ */} 
      <div>
            <label>Select an option</label>
            <label> Create
            <input 
            type='radio' 
            id='create' 
            name='option' 
            value='create'
            checked 
            onChange={(e) => handleChangeCreate(e)}/>
            </label>
            <label> Modify
            <input
            type='radio' 
            id='modify' 
            name='option' 
            value='modify'  
            onChange={(e) => handleChangeCreate(e)} />
            </label>
        </div>

            {/*-----------------------HOTEL NAME----------------- */} 
            <div>
                <label>Hotel Name
                    <select value={input_event.idHotel} onChange={(e) => handleChangeHotel(e)}>
                    <option hidden selected >Select hotel</option>
                    {hotels?.map(e => 
                        <option key= {e.name} value= {e.id} >{e.name}</option>)} {/*mapeo el nombre de los hoteles*/}
                    </select></label>
                </div>
                <div>
                {errors.idHotel && (<p>{errors.idHotel}</p>)}
                </div>

        {/*------------------EVENT NAME------------------------ */} 
        {input_create.option === 'create'?
        (<div>
            <label>Event Name</label>
            <input 
            placeholder="Event Name..."
            type="text" 
            value={input_event.name} 
            name="name" 
            onChange={(e) => handleName(e)} />
        </div>)
        :(<div>
            <label>Event Name
            <select value={input_event.name  }onChange={(e) => handleName(e)}>
            <option hidden selected >Select Event Name</option>
            {events?.sort((a,b)=>{
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }).map(e => 
                <option key= {e.name} value= {e.name} >{e.name}</option>)}
            </select>
            </label>
        </div>)}
        <div>
            {errors.name && (<p>{errors.name}</p>)}
        </div>

         {/*--------------------------DATE----------------------- */}  
         <div>
            <label>Date</label>
            <input
            type="datetime-local" 
            value={input_event.date} 
            name="date"  
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            {errors.date && (<p>{errors.date}</p>)}
        </div>
        

         {/*--------------------------PRICE----------------------- */}  
         <div>
            <label>Price USD</label>
            <input
            placeholder="Price..."
            type="number" 
            value={input_event.price} 
            name="price"
            min='0'
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            {errors.price && (<p>{errors.price}</p>)}
        </div>

        {/*-----------------------IMAGE------------------------ */} 
        <div>
            <label>Image</label>
            <input
            placeholder= "Load URL Image..." 
            type="url" 
            value={input_event.image} 
            name="image" 
            onChange={(e) => handleChange(e)}/>
            </div>
        <div>
            {errors.image && (<p>{errors.image}</p>)}
        </div>
        
        {/*--------------------------DESCRIPTION----------------------- */}  
        <div>
            <label>Description</label>
            <textarea
            placeholder="Description..."
            type="text" 
            value={input_event.description} 
            name="description" 
            maxLength="1000" 
            onChange={(e) => handleChange(e)}>
            </textarea>
        </div>
        <div>
            {errors.description && (<p>{errors.description}</p>)}
        </div>
        

        {/*----------------------------BUTTON CREATE------------------------ */}
        <div>
        {!input_create.option ||!input_event.name || !input_event.image || !input_event.description || !input_event.date || !input_event.price ||!input_event.idHotel || Object.keys(errors).length 
         
            ? (<button disabled type="submit">Send</button>) 
            : (<button type="submit">Send </button>)}
        </div>

    </form>
    </div>
)}

export default CreateEvents;