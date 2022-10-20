import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { modifyServicesHotels, getHotels, getServicesHotel } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_hotel) => {
    let error = {};
    if(!input_hotel.idHotel) error.idHotel = 'Hotel name is required'    
    return error;
}
const validateTwo = (input_serv_hotel) => {
    let errors={}
    if(!input_serv_hotel.id) errors.id = 'Select Service Name'
    if(!input_serv_hotel.name) errors.name = 'Service Name is required'    
    if(!input_serv_hotel.image) errors.image = 'Upload at least one image'    
    if(!input_serv_hotel.description) errors.description = 'Description is required'
    return errors;
}


const ModifyServHotels = () => {
    const dispatch = useDispatch();
    
    const hotels = useSelector(state=>state.reducerHotel.hotels)
    const servicesHotelID = useSelector(state=>state.reducerHotel.onlyServicesHotel)

const [input_hotel, setInput_hotel] = useState({
    idHotel: ''
})    

const [input_serv_hotel, setInput_serv_hotel] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
})

const [error, setError] = useState({})
const [errors, setErrors] = useState({})


 useEffect(()=>{
    !hotels.length && dispatch(getHotels())
 },[dispatch, hotels]) 


 //------------ HANDLE CHANGE HOTEL NAME----------//
const handleChangeHotel = (e) => {
    e.preventDefault();        
    setInput_hotel({
        ...input_hotel,
       idHotel: e.target.value
    })   
    setError(validate({
        ...input_hotel,
        idHotel: e.target.value
    }))
    dispatch(getServicesHotel(e.target.value)) 
}

//------------ HANDLE CHANGE ID SERVICES HOTEL(select) --------------//
const handleChangeId = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
        id: e.target.value
    })        
    setErrors(validateTwo({
        ...input_serv_hotel,
        id: e.target.value
    }))
}


//------------ HANDLE CHANGE NAME SERVICES HOTEL--------------//
const handleName = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
        name: e.target.value.toLowerCase().trim()
    })        
    setErrors(validateTwo({
        ...input_serv_hotel,
        name: e.target.value
    }))
}

//------------ HANDLE CHANGE -----------------------//
const handleChange = (e) => {
    e.preventDefault();        
    setInput_serv_hotel({
        ...input_serv_hotel,
        [e.target.name] : e.target.value
    })        
    setErrors(validateTwo({
        ...input_serv_hotel,
        [e.target.name] : e.target.value
    }))
}


//----------------HANDLE SUBMIT SERVICES HOTEL------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_serv_hotel && !Object.keys(errors).length && !Object.keys(error).length) {
        dispatch(modifyServicesHotels(input_serv_hotel)) 
        toast.success('Service modified successfully', { position: 'bottom-right' })
        setInput_hotel({
            idHotel:''
        })
        setInput_serv_hotel({
            id:'',
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
                <select value={input_hotel.idHotel} onChange={(e) => handleChangeHotel(e)}>
                <option hidden selected >Select hotel</option>
                {hotels?.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }).map(e => 
                    <option key= {e.id} value= {e.id} >{`${e.name}, ${(e.Locations).map(e=> `${e.city}, ${e.state},${e.department}`)}`}</option>)} {/*mapeo el nombre de los hoteles*/}
                </select></label>
            </div>
            <div>
            {errors.idHotel && (<p>{error.idHotel}</p>)}
            </div>
                     
        
        {/*-----------------------ID SERVICE (name actual)---------------- */} 
                <div>
                    <label> Current Service Name
                    <select value={input_serv_hotel.id} onChange={(e) => handleChangeId(e)}>
                    <option hidden selected >Select Service Name</option>
                    {servicesHotelID?.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }).map(e => 
                        <option key= {e.name} value= {e.id} >{e.name}</option>)}
                    </select>
                    </label>
                </div>
            <div>
                {errors.id && (<p>{errors.id}</p>)}
            </div>
        {/*-----------------------NEW SERVICE NAME ------------------------ */} 
        <div>
                    <label>Service Name</label>
                    <input 
                    placeholder="New service name..."
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
            type="file" 
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
        {!input_hotel.idHotel || !input_serv_hotel.id || !input_serv_hotel.name || !input_serv_hotel.image || !input_serv_hotel.description || Object.keys(errors).length || Object.keys(error).length     
            ? (<button disabled type="submit">Send</button>) 
            : (<button type="submit">Send </button>)}
        </div>

    </form>
    </div>
)}

export default ModifyServHotels;