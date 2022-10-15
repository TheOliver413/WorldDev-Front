//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createHotels } from '../../redux/action/action';


export default function Create() {

  //-------------------------- STATE ------------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //-------------------------USEEFFECT------------------------------//
  // ---------------cargar los services...
  // useEffect(() => {
  //   dispatch()
  // }, [dispatch])

  //------------------------STATE LOCAL FORM------------------------//
  const [input_hotels, input_sethotels] = useState({
    name: "",
    image: "",
    qualification: 0,
    description: "",
    city: "",
    country: "",
    continent: "",

  })

  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    input_sethotels({
      ...input_hotels,
      [e.target.name]: e.target.value
    })

  }

  //---------------- HANDLE SUBMIT HOTELS------------------//

  function handleSubmit(e) {
    e.preventDefault()
    console.log(input_hotels)
    if (input_hotels) {
      dispatch(createHotels(input_hotels))
      
      input_sethotels({
        name: "",
        image: "",
        qualification: 0,
        description: "",
        city: "",
        country: "",
        continent: "",
        services: [],
      })

      alert('Hotel created successfully')
    } else {
      alert("Check the fields")
    }
  }

  //------------------------------------------RETURN----------------------------//
  return (

    <div className="cardHotels-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <h1>Hotel</h1>
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


            {/*--------------------QUALIFICATION--------------------------- */}
            <div className=''>
              <label className=''>Qualification</label>
              <input
                className="form-control"
                type="range" min="0" max="5"
                value={input_hotels.qualification}
                name="qualification"
                onChange={(e) => handleChange(e)} />
            </div>

            {/*--------------------------CITY----------------------- */}
            <h4>Location:</h4>
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

            {/*--------------------------SERVICES----------------------- */}
            <div >
              <h4>Services:</h4>
              <select
                className="form-control"
                value={input_hotels.services}
                name="services"
                onChange={(e) => handleChange(e)}>
                <option>meeting</option>
                <option>spa</option>
                <option>piscina</option>
                <option>wifi</option>
                <option>parking</option>
                <option>admite mascotas</option>
                <option>barbacoa</option>
                <option>gym</option>
                <option>Biking Tours</option>
              </select>
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
