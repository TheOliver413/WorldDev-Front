import React, { useEffect } from "react";
import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllServicesRoom, modifyServicesRooms } from "../../redux/action/action";

const validate = (input_serv_room) => {
    let errors = {};
    if(!input_serv_room.id) errors.id = 'Select service name' 
    if(!input_serv_room.name) errors.name = 'Service name is required'    
    if(!input_serv_room.image) errors.image = 'Upload at least one image'
    
    return errors;
}

const ModifyServRooms = () => {
    const dispatch = useDispatch();
    const servicesRoom = useSelector(state=>state.reducerRoom.servicesRoom)
    
const [input_serv_room, setInput_serv_room] = useState({
    id: '',
    name: '',
    image: '',
})

const [errors, setErrors] = useState({})

useEffect(()=>{
    dispatch(getAllServicesRoom())
}, [dispatch])


//------------ HANDLE CHANGE NAME SERVICES ROOM--------------//
const handleName = (e) => {
    e.preventDefault();        
    setInput_serv_room({
        ...input_serv_room,
        name : e.target.value.toLowerCase().trim()
    })        
    setErrors(validate({
        ...input_serv_room,
        name : e.target.value
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
    if (input_serv_room && !Object.keys(errors).length) {        
        dispatch(modifyServicesRooms(input_serv_room))
        alert('Service modified successfully')
        setInput_serv_room({
            id: "",
            name: "",
            image: "",
        })
    } else {
      alert("Check the fields")
    }
  } 


return (
    <div>
    <form className="cardHotels-container" onSubmit={(e) => handleSubmit(e)}>        
        {/*-----------------------CURRENT SERVICE NAME------------------------ */}                 
            <div>
                <label>Current Service Name
                <select value={input_serv_room.id } name="id" onChange={(e) => handleChange(e)}>
                <option hidden selected >Select Service Name</option>
                {servicesRoom?.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                        return 0;
                    }).map(e => 
                    <option key= {e.id} value= {e.id} >{e.name}</option>)}
                </select>
                </label>
            </div>
            <div>
                {errors.id && (<p>{errors.id}</p>)}
            </div>
             {/*-----------------------NEW NAME------------------------ */} 
        <div>
            <label>New Service Name</label>
            <input 
            placeholder="New Service name..."
            type="text" 
            value={input_serv_room.name} 
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
            type="file" 
            value={input_serv_room.image} 
            name="image" 
            onChange={(e) => handleChange(e)}/>
            </div>
        <div>
            {errors.image && (<p>{errors.image}</p>)}
        </div>
        
        {/*----------------------------BUTTON CREATE------------------------ */}
        <div>
        {!input_serv_room.id ||!input_serv_room.name || !input_serv_room.image || Object.keys(errors).length   
            ? (<button disabled type="submit">Send</button>) 
            : (<button type="submit">Send</button>)}
        </div>

    </form>
    </div>
)}

export default ModifyServRooms;