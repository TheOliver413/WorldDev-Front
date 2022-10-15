import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const validate = (input_event) => {
    let errors = {};
    if(!input_create) errors = 'Choose an option'

    if(!input_event.name) errors.name = 'Name is required'
    
    if(!input_event.image) errors.image = 'Upload at least one image'
    
    if(!input_event.description) errors.description = 'Description is required'

    if(!input_event.date) errors.date = 'Date is required'

    if(!input_event.price) errors.price = 'Price is required'
    if(/^\d+$^\d+$/.test(input.price)) errors.price = 'The price must be in integers'

    return errors;
}

const CreateEvents = () => {
    const dispatch = useDispatch();
    //const servicesHotels = useSelector(state=>state.reducerHotel.hotels)

const [input_event, setInput_event] = useState({
    name: '',
    image: '',
    description: '',
    date: '',
    price: 0,
    //hotel:''
})
const [input_create, setInput_create] = useState({})
const [errors, setErrors] = useState({})

// useEffect(()=>{
//     dispatch(get de hotel)
// },[dispatch]) 

//------------ HANDLE CHANGE CREATE/MODIFY --------------//
const handleChangeCreate = (e) => {
   e.preventDefault();        
   setInput_create({
       ...input_create,
       [e.target.name] : e.target.value
   })        
   setErrors(validate({
       ...input_create,
       [e.target.name] : e.target.value
   }))
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

//----------------HANDLE SUBMIT SERVICES HOTEL------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_event) {
      if(input_create.name === 'create') {
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
      })
    } else {
      alert("Check the fields")
    }
  } 


return (
    <div>
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
            onChange={(e) => handleChangeCreate(e)}/>
            </label>
            <label>
            <input
            type='radio' 
            id='modify' 
            name='option' 
            value='modify'  
            onChange={(e) => handleChangeCreate(e)} />
            </label>
        </div>
        <div>
            {errors && (<p>{errors}</p>)}
        </div>

        {/*-----------------------NAME------------------------ */} 
        <div>
            <label>Event Name</label>
            <input 
            placeholder="Name..."
            type="text" value={input_event.name} 
            name="name" 
            onChange={(e) => handleName(e)} />
        </div>
        <div>
            {errors.name && (<p>{errors.name}</p>)}
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

         {/*--------------------------DATE----------------------- */}  
         <div>
            <label>Date</label>
            <input
            type="datetime" 
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
            <label>PRICE</label>
            <input
            placeholder="Price..."
            type="number" 
            value={input_event.price} 
            name="price"
            onChange={(e) => handleChange(e)}
            />
        </div>
        <div>
            {errors.price && (<p>{errors.price}</p>)}
        </div>
        
        {/*----------------------------BUTTON CREATE------------------------ */}
        <div>
        {!input_event.name || !input_event.image || !input_event.description || !input_event.date || !input_event.price || Object.keys(errors).length ? 
            (<button disabled type="submit">Create</button>) 
            : (<button type="submit">Create </button>)}
        </div>

    </form>
    </div>
)}

export default CreateEvents;