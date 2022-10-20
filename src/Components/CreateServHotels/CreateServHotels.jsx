import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createServicesHotels, getHotels } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_serv_hotel) => {
    let errors = {};

    if(!input_serv_hotel.idHotel) errors.idHotel = 'Hotel name is required'

    if(!input_serv_hotel.name) errors.name = 'Service Name is required'
    
    if(!input_serv_hotel.image) errors.image = 'Upload at least one image'
    
    if(!input_serv_hotel.description) errors.description = 'Description is required'

    return errors;
}


const CreateServHotels = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(state=>state.reducerHotel.hotels)

const [input_serv_hotel, setInput_serv_hotel] = useState({
    idHotel: '',
    name: '',
    image: '',
    description: '',
})

const [errors, setErrors] = useState({})


 useEffect(()=>{
    !hotels.length && dispatch(getHotels())
 },[dispatch, hotels]) 


//------------ HANDLE CHANGE NAME SERVICES HOTEL--------------//
const handleName = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
        [e.target.name] : e.target.value.toLowerCase().trim()
    })        
    setErrors(validate({
        ...input_serv_hotel,
        [e.target.name] : e.target.value
    }))
}

//------------ HANDLE CHANGE DEMAS INPUT SERVICES HOTEL----------//
const handleChange = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
        [e.target.name] : e.target.value
    })        
    setErrors(validate({
        ...input_serv_hotel,
        [e.target.name] : e.target.value
    }))
}

//------------ HANDLE CHANGE HOTEL NAME----------//
const handleChangeHotel = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
       idHotel : e.target.value
    })        
    setErrors(validate({
        ...input_serv_hotel,
        idHotel : e.target.value
    }))
}


//----------------HANDLE SUBMIT SERVICES HOTEL------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_serv_hotel && !Object.keys(errors).length) {
        dispatch(createServicesHotels(input_serv_hotel)) 
        toast.success('Service created successfully', { position: 'bottom-right' })
        setInput_serv_hotel({
            idHotel:'',
            name: '',
            image: '',
            description: '',
        })
    } else {
        toast.error("Check the fields", { position: 'bottom-right' })
    }
  } 


return (
    <div className="cardHotels-container">
    <form onSubmit={(e) => handleSubmit(e)}>

        {/*-----------------------NAME HOTEL----------------- */} 
        <div>
            <label>Hotel Name
                <select value={input_serv_hotel.idHotel} onChange={(e) => handleChangeHotel(e)}>
                <option hidden selected >Select hotel</option>
                {hotels?.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }).map(e => 
                    <option key= {e.id} value= {e.id} >{e.name}</option>)} {/*mapeo el nombre de los hoteles*/}
                </select>
                </label>
            </div>
            <div>
            {errors.idHotel && (<p>{errors.idHotel}</p>)}
            </div>
                     
        
        {/*-----------------------NAME SERVICE---------------- */} 
                <div>
                    <label>Service Name</label>
                    <input 
                    placeholder="Service name..."
                    type="text" 
                    value={input_serv_hotel.name} 
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
            value={input_serv_hotel.image} 
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
            value={input_serv_hotel.description} 
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
        {!input_serv_hotel.idHotel || !input_serv_hotel.name || !input_serv_hotel.image || !input_serv_hotel.description || Object.keys(errors).length        
            ? (<button disabled type="submit">Send</button>) 
            : (<button type="submit">Send </button>)}
        </div>

    </form>
    </div>
)}

export default CreateServHotels;