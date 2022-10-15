//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRooms } from '../../redux/action/action';


export default function CreateRooms(){

//-------------------------- STATE ------------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  const [input_rooms, input_setrooms] = useState({
    name: "",
    image: "",
    price: 0,
    description: "",
    category: [],
  })

//------------------ HANDLE CHANGE ROOMS-------------------//
  function handleChange(e) {
    e.preventDefault();
    input_rooms({
      ...input_rooms,
      [e.target.name]: e.target.value
    })

  }

//----------------HANDLE SUBMIT ROOMS------------------//
  function handleSubmit(e) {
    e.preventDefault()

    if ( input_rooms ) {
      dispatch(createRooms(input_rooms))

      input_setrooms({
        name: "",
        image: "",
        price: 0,
        description: "",
        category: [],
      })

      alert('Rooms created successfully')
    } else {
      alert("Check the fields")
    }
  } 


return(

    <div className="cardHotels-container" >
    <form onSubmit={(e) => handleSubmit(e)} >
        <h1>Rooms</h1>
        {/*-------------------SELECT HOTELS---------------- */}
        <select className="form-control" >
          <option>Hotels:</option>
        </select>
  
        {/*-----------------------NAME------------------------ */} 
        <input
        className="form-control" 
        placeholder="Name..."
        type="text" value={input_rooms.name} 
        name="name" 
        onChange={(e) => handleChange(e)} />
  
        {/*-----------------------IMAGE------------------------ */} 
        <input
        className="form-control"
        placeholder= "Load URL Image..." 
        type="url" 
        value={input_rooms.image} 
        name="image" 
        onChange={(e) => handleChange(e)} />
        
  
        {/*-----------------------PRICE------------------------ */} 
        <label className=''>Price:</label>
        <input 
        className="form-control"
        type="range" min="0" max="1000" 
        value={input_rooms.price} 
        name="price" 
        onChange={(e) => handleChange(e)} />
        {<p  > Value: U${input_rooms.price}</p>}

        {/*--------------------------CATEGORY----------------------- */}
        <select>
        <option>Category:</option>
        </select>

        {/*--------------------------DESCRIPTION----------------------- */}  
        <textarea
        className="form-control" 
        placeholder="Description..."
        type="text" 
        value={input_rooms.description} 
        name="description" 
        maxLength="1000" 
        onChange={(e) => handleChange(e)}>
        </textarea>

        {/*----------------------------BUTTON------------------------ */}
        <div>
        <button className='btn btn-primary mb-2'
        type="submit"
        onClick={(e) => handleSubmit(e)}>Create</button>
        </div>

    </form>
    </div>
)

}