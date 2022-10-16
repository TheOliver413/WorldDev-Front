//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRooms, getHotels } from '../../redux/action/action';
import '../CreateRooms/Styles.css';


export default function CreateRooms(){
//--------------------------------------------------//
  const dispatch = useDispatch();
  const history = useHistory();
  const render_hotels = useSelector((state) => state.hotels)
  console.log("info de hoteles: ",render_hotels)
  //-------------------USEEFFECT----------------//
  useEffect(() => {
    dispatch(getHotels())
  }, [dispatch])

  //----------------------------------------//
  const [input_rooms, input_setrooms] = useState({
    name: "",
    image: [""],
    price: 10,
    description: "",
    category: "",
  })

//------------------------VALIDATIONS-----------------------------//
let validateName = /^[a-zA-Z\s]+$/;

const validate = (input_rooms) => {
  // let errors = {}
  
  // if (!input.title.length) {
  //   errors.title = 'Title cannot be empty'
  // }

  // if (!validateTitle.test(input.title)) {
  //   errors.title = 'Special characters or numbers are not allowed'
  // }

  // if (recipes.find((e) => e.title.toLowerCase() === input.title.toLowerCase())) {
  //   alert(`The title ${input.title} already exist, please choose another one!`)
  // }
  // if (input.image && !validateUrl.test(input.image)) {
  //   errors.image = 'This is not a valid URL'
  // }

  // if (!input.summary.length) {
  //   errors.summary = 'Summary cannot be empty'
  // }

  // if (input.summary.length < 40) {
  //   errors.summary = 'Summary must be at least 40 characters'
  // }

  // if (input.healthScore < 1 || input.healthScore > 100) {
  //   errors.healthScore = 'The healt score must be a number between 1 - 100'
  // }
  
  // if (!input.steps.length) {
  //   errors.steps = 'Your recipe must have steps to follow'
  // }
  
  // if (input.steps.length < 40) {
  //   errors.steps = 'Your recipe must have more details'
  // }

  // return errors;
  
}


//------------------ HANDLE CHANGE ROOMS-------------------//
  function handleChange(e) {
    e.preventDefault();
    input_setrooms({
      ...input_rooms,
      [e.target.name]: e.target.value
    })
        // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }

//----------------HANDLE SUBMIT ROOMS------------------//
  function handleSubmit(e) {
    e.preventDefault()

    if ( input_rooms ) {
      dispatch(createRooms(input_rooms))
      input_setrooms({
        name: "",
        image: [""],
        price: 10,
        description: "",
        category:"",
      })

      alert('Rooms created successfully')
    } else {
      alert("Check the fields")
    }
  } 


return(

    <div className="cardHotels-container" >
    <form onSubmit={(e) => handleSubmit(e)} >
        <h1>✯ Rooms ✯</h1>
        {/*-------------------SELECT HOTELS---------------- */}
        <select className="form-control" >
          <option>Miami resort</option>
          {/* {render_hotels?.map()} */}
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
        {/* <label className=''>Price:</label> */}
        <input className="form-control"
        type="range" min="10" max="1000" 
        value={input_rooms.price} 
        name="price" 
        onChange={(e) => handleChange(e)} />
        {<p >Value U💲{input_rooms.price}</p>}

        {/*--------------------------CATEGORY----------------------- */}
        <h4>Categories</h4> 
        <select className="form-control" >
        <option>Suite Presidential</option>
        <option>Standard</option>
        <option>Single</option>
        <option>Family</option>
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