//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRooms, getHotels } from '../../redux/action/action';
import '../CreateRooms/Styles.css';


export default function CreateRooms() {
  //--------------------------------------------------//
  const dispatch = useDispatch();
  const history = useHistory();
  const render_hotels = useSelector((state) => state.hotels)
  console.log("info de hoteles: ", render_hotels)
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

    if (input_rooms) {
      dispatch(createRooms(input_rooms))
      input_setrooms({
        name: "",
        image: [""],
        price: 10,
        description: "",
        category: "",
      })

      alert('Rooms created successfully')
    } else {
      alert("Check the fields")
    }
  }


  return (
    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">

          <h1>Rooms</h1>
        </div>
        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-house"></i> Name</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required name="name" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Hotels</label>
                <select type="text" class="form-select" required>
                  <option>Miami resort</option>
                  {/* {render_hotels?.map()} */}
                </select>
                <div class="nombre text-danger "></div>
              </div>

              <div>
                <label for="nombre"> <i class="bi bi-tag"></i> Categories</label>
                <select type="text" class="form-select" required>
                  <option>Suite Presidential</option>
                  <option>Standard</option>
                  <option>Single</option>
                  <option>Family</option>
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            {/* <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                <input type="text" class="form-control" placeholder="ej: Hotel..." required value={input_rooms.image} name="image" onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div> */}

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-currency-dollar"></i> Price</label>
                <input type="range" class="form-range" min="10" max="1000" value={input_rooms.price} name="price" onChange={(e) => handleChange(e)} required />
                {<p >Value ${input_rooms.price}</p>}
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea class="form-control" placeholder="ej: hola" value={input_rooms.description} name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
              <div class="mensaje text-danger"></div>
            </div>


            <div class="mb-2">
              <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between" onClick={(e) => handleSubmit(e)}>
                <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>

  )

}