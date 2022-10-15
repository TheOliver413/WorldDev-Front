import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from "../../redux/action/action";

const validate = (input_serv_hotel, input_create) => {
    let errors = {};
    if(!input_create) errors = 'Choose an option'

    if(!input_serv_hotel.idHotel) errors.idHotel = 'Hotel name is required'

    if(!input_serv_hotel.name) errors.name = 'Name is required'
    if(!/^[a-zA-Z ]*$/.test(input_serv_hotel.name)) errors.name = 'Invalid name: must only contain letters'
    
    if(!input_serv_hotel.image) errors.image = 'Upload at least one image'
    
    if(!input_serv_hotel.description) errors.description = 'Description is required'

    return errors;
}

const CreateServHotels = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(state=>state.reducerHotel.hotels)

const [input_serv_hotel, setInput_serv_hotel] = useState({
    idHotel:'',
    name: '',
    image: '',
    description: '',
})
const [input_create, setInput_create] = useState({})
const [errors, setErrors] = useState({})

 useEffect(()=>{
     dispatch(getHotels())
 },[dispatch]) 

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

//----------------HANDLE DELETE SELECT HOTEL------------------//
const handleDelete = (e) => {
    e.preventDefault();
    setInput_serv_hotel({
        ...input_serv_hotel,
        idHotel: input.idHotel.filter(e => e !== e.target.value)
    })
}

//----------------HANDLE SUBMIT SERVICES HOTEL------------------//
const handleSubmit = (e) => {
    e.preventDefault()
    if (input_serv_hotel) {
        if(input_create.name === 'create') {
            dispatch(createServicesHotels(input_serv_hotel)) //crear la action
            alert('Service created successfully')
        }else {
            dispatch(modifyServicesHotels(input_serv_hotel)) //crear la action
            alert('Service modified successfully')
        }
        input_serv_hotel({
            name: '',
            image: '',
            description: '',
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
        
        {/*-----------------------NAME HOTEL----------------- */} 
        <div>
            <label>Hotel Name</label>
                <select onChange={(e) => handleChangeHotel(e)}>
                <option hidden selected >Select hotel</option>
                {hotels?.map(e => 
                    <option key= {e.name} value= {e.id} >{e.name}</option>)} {/*mapeo el nombre de los hoteles*/}
                </select>
            </div>
            <div>
            {errors.idHotel && (<p>{errors.idHotel}</p>)}
            </div>
            <ul>{input.idHotel.map(e => 
                <li key={e}>{e}<button value={e} onClick = {(e) => handleDelete(e)}>x</button></li>)}
            </ul>           
        
        {/*-----------------------NAME SERVICE---------------- */} 
        <div>
            <label>Service Name</label>
            <input 
            placeholder="Name service.."
            type="text" value={input_serv_hotel.name} 
            name="nameService" 
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
        {!input_serv_hotel.name || !input_serv_hotel.image || !input_serv_hotel.description || Object.keys(errors).length ? 
            (<button disabled type="submit">Send</button>) 
            : (<button type="submit">Send </button>)}
        </div>

    </form>
    </div>
)}

export default CreateServHotels;