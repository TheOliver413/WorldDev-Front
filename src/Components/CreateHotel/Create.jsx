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

    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">
          <h1>Hotels</h1>
        </div>

        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)} >
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Name</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required value={input_hotels.name} name="name" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            {/* <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required value={input_hotels.image} name="image" onChange={(e)=> handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div> */}

            <div class="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"><i class="bi bi-house"></i> City</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required value={input_hotels.city} name="city" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>

              <div>
                <label for="apellido"><i class="bi bi-pin"></i> Country</label>
                <input type="text" class="form-control" placeholder="ej: Pacheco" required value={input_hotels.country} name="country" onChange={(e) => handleChange(e)} />
                <div class="apellido text-danger"></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-geo-alt"></i> Continet</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required value={input_hotels.continent} name="continent" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-star"></i> Qualification</label>
                <input type="range" min="1" max="5" class="form-range" required name="qualification" maxLength="1000" onChange={(e) => handleChange(e)} />
                {<p className=""> Value : {input_hotels.qualification}</p>}
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Mensaje</label>
              <textarea id="mensaje" class="form-control" placeholder="ej: hola" value={input_hotels.description} name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
              <div class="mensaje text-danger"></div>
            </div>

            <div class="mb-2">
              <button class="col-12 btn btn-primary d-flex justify-content-between" type="submit" onClick={(e) => handleSubmit(e)}>
                <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
              </button>
            </div>

          </form>
        </div>
      </div >
    </section >

  )
}
