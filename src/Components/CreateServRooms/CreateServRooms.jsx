import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const validate = (input_serv_room) => {
    let errors = {};
    if(!input_create) errors = 'Choose an option'
    
    if(!input_serv_room.name) errors.name = 'Name is required'
    if(!/^[a-zA-Z ]*$/.test(input_serv_room.name)) errors.name = 'Invalid name: must only contain letters'
    
    if(!input_serv_room.image) errors.image = 'Upload at least one image'
    
    return errors;
}

const CreateServRooms = () => {
    const dispatch = useDispatch();
    //const servicesHotels = useSelector(state=>state.reducerHotel.hotels)

const [input_serv_room, setInput_serv_room] = useState({
    name: '',
    image: '',
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

//------------ HANDLE CHANGE NAME SERVICES ROOM--------------//
const handleName = (e) => {
    e.preventDefault();        
    setInput_serv_room({
        ...input_serv_room,
        [e.target.name] : e.target.value.toLowerCase().trim()
    })        
    setErrors(validate({
        ...input_serv_room,
        [e.target.name] : e.target.value
    }))
}

//------------ HANDLE CHANGE --------------//
const handleChange = (e) => {
    e.preventDefault();        
    setInput_serv_room({
        ...input_serv_room,
        [e.target.name] : e.target.value
    })        
    setErrors(validate({
        ...input_serv_room,
        [e.target.name] : e.target.value
    }))
}

//----------------HANDLE SUBMIT SERVICES ROOM------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_serv_room) {
        if(input_create.name === 'create') {
            dispatch(createServicesRooms(input_serv_room))//crear la action
            alert('Service created successfully')
        } else {
            dispatch(modifyServicesRooms(input_serv_room))//crear la action
            alert('Service modified successfully')
        }
      setInput_serv_room({
        name: "",
        image: "",
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
            <label>Name</label>
            <input 
            placeholder="Name..."
            type="text" value={input_serv_room.name} 
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
            value={input_serv_room.image} 
            name="image" 
            onChange={(e) => handleChange(e)}/>
            </div>
        <div>
            {errors.image && (<p>{errors.image}</p>)}
        </div>
        
        {/*----------------------------BUTTON CREATE------------------------ */}
        <div>
        {!input_serv_room.name || !input_serv_room.image || Object.keys(errors).length ? 
            (<button disabled type="submit">Create</button>) 
            : (<button type="submit">Create </button>)}
        </div>

    </form>
    </div>
)}

export default CreateServRooms;