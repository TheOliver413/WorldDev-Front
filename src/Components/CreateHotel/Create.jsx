//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createHotels } from '../../redux/action/action';
import '../Create/Styles.css';

export default function Create() {

  //-------------------------- STATE ------------------------//
  const dispatch = useDispatch();
  const history = useHistory();
  // const services = useSelector(state=>state.services)
  //-------------------------USEEFFECT------------------------------//
  // ---------------cargar los services...
  // useEffect(() => {
  //   dispatch(get_Services())
  // }, [dispatch])

  //------------------------STATE LOCAL FORM------------------------//
  const [input_hotels, input_sethotels] = useState({
    name: "",
    image: [""],
    qualification: 1,
    description: "",
    city: "",
    country: "",
    continent: "",

  })
  //------------------------VALIDATIONS-----------------------------//
  let validateName = /^[a-zA-Z\s]+$/;

  const validate = (input_hotels) => {
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
  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    input_sethotels({
      ...input_hotels,
      [e.target.name]: e.target.value
    })
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }

  //---------------- HANDLE SUBMIT HOTELS------------------//

  function handleSubmit(e) {
    e.preventDefault()
    if (input_hotels) {
      dispatch(createHotels(input_hotels))
      
      input_sethotels({
        name: "",
        image: [""],
        qualification: 1,
        description: "",
        city: "",
        country: "",
        continent: "",
      })

      alert('Hotel created successfully')
    } else {
      alert("Check the fields")
    }
  }

  //------------------------------------------RETURN----------------------------//
  return (

    <div className="cardHotels-container">
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-group">
          <h1>✯ Hotel ✯</h1>
          {/*-----------------------NAME------------------------ */}
          
          <div className="form-row" >
            <input
              className="form-control"
              autoFocus
              placeholder="Name..."
              type="text" value={input_hotels.name}
              name="name"
              onChange={(e) => handleChange(e)} />

            {/*--------------------------IMAGE------------------- */}
            <div className=''>
              <input
                className="form-control"
                placeholder="Load URL Image..."
                type="url"
                value={input_hotels.image}
                name="image"
                onChange={(e) => handleChange(e)} />
            </div>

            {/*--------------------------DESCRIPTION----------------------- */}
            <div >
              <textarea
                className="form-control"
                placeholder="Description..."
                type="text"

                value={input_hotels.description}
                name="description"
                maxLength="1000"
                onChange={(e) => handleChange(e)}>
              </textarea>
            </div>

            {/*--------------------------QUALIFICATION----------------------- */}

            <div >
              <h4>Qualification</h4>
              <input
                className="form-control"
                type="range"
                min="1"
                max="5"
                value={input_hotels.qualification}
                name="qualification"
                maxLength="1000"
                onChange={(e) => handleChange(e)}>
              </input>
              {<p className="" > Value : {input_hotels.qualification}</p>}
            </div>

            {/*--------------------------CITY----------------------- */}
            <h4>Location</h4>
            <div >
              <input
                className="form-control"
                placeholder="City..."
                type="text"
                value={input_hotels.city}
                name="city"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>

            {/*--------------------------COUNTRY----------------------- */}
            <div >
              <input
                className="form-control"
                placeholder="Country..."
                type="text"
                value={input_hotels.country}
                name="country"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>

            {/*--------------------------CONTINENT----------------------- */}
            <div >
              <input
                className="form-control"
                placeholder="Continent..."
                type="text"
                value={input_hotels.continent}
                name="continent"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>

            {/*----------------------------BUTTON------------------------ */}
            <div>
              <button className='btn btn-primary mb-2'
                type="submit"
                onClick={(e) => handleSubmit(e)}>Create</button>
            </div>

          </div>
        </div>
      </form>   
    </div>
  )
}

