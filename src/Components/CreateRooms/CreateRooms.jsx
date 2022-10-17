//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link, useHistory } from "react-router-dom";
import { createRooms, getHotels, modifyRooms } from '../../redux/action/action';
import '../CreateRooms/Styles.css';


export default function CreateRooms() {
  //--------------------------------------------------//
  const dispatch = useDispatch();
  //const history = useHistory();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  //-------------------------USEEFFECT------------------------------//

  //console.log("info de hoteles: ",data_hotels)
  //-------------------USEEFFECT----------------//
  useEffect(() => {
    dispatch(getHotels())
  }, [dispatch])

  //----------------------------------------//
  const [input_rooms, input_setrooms] = useState({
    id: "",
    name: "",
    image: [""],
    price: 10,
    description: "",
    category: "",
  })
  //console.log("aca name: ",input_rooms.name)

  // const [input_create, setInput_create] = useState({
  //   option: ''
  // })
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
    console.log(e.target.name, e.target.value)
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
  // const handleChangeUpdate = (e) => {
  //   e.preventDefault();
  //   setInput_create({
  //     ...input_create,
  //     [e.target.name]: e.target.value
  //   })
  // }
  //----------------HANDLE SUBMIT ROOMS------------------//
  // function handleSubmit(e) {
  //   e.preventDefault()

  //   if ( input_rooms ) {
  //     dispatch(createRooms(input_rooms))
  //     input_setrooms({
  //       name: "",
  //       image: [""],
  //       price: 10,
  //       description: "",
  //       category:"",
  //     })

  //     alert('Rooms created successfully')
  //   } else {
  //     alert("Check the fields")
  //   }
  // } 

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("dispatch : ", input_rooms)
  //   if (input_rooms) {

  //     if (input_create.option === 'create') {
  //       dispatch(createRooms(input_rooms))
  //       alert('Room created successfully')
  //     } else {
  //       dispatch(modifyRooms(input_rooms))
  //       alert('Room modified successfully')
  //     }
  //     input_setrooms({
  //       id: "",
  //       name: "",
  //       image: [""],
  //       price: 10,
  //       description: "",
  //       category: "",
  //     })
  //   } else {
  //     alert("Check the fields")
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault()

    if ( input_rooms ) {
      dispatch(createRooms(input_rooms))
      input_setrooms({
        id: "",
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

  return (

    <div className="cardHotels-container" >
      <form onSubmit={(e) => handleSubmit(e)} >
        <h1>✯ Rooms ✯</h1>

        {/*----------------CREATE OR MODIFY------------------------ */}
        {/* <div>
          <label>Select an option
            <label> Create
              <input
                type='radio'
                id='create'
                name='option'
                value='create'
                onChange={(e) => handleChangeUpdate(e)} />
            </label>
            <label> Modify
              <input
                type='radio'
                id='modify'
                name='option'
                value='modify'
                onChange={(e) => handleChangeUpdate(e)} />
            </label>
          </label>
        </div> */}

        {/*-------------------SELECT HOTELS---------------- */}
        <p></p>
        <select
          className="form-control" name="idHotel" value={input_rooms.idHotel} onChange={(e) => handleChange(e)}>
          <option disabled selected >Hotels...</option>
          {data_hotels?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele.name}</option>
            )
          })}
        </select>

        {/*-----------------------NAME------------------------ */}
        <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)} >
          <option value="suite" >suite</option>
          <option value="double" >double</option>
          <option value="single" >single</option>
          <option value="family" >family</option>
        </select>

        {/* <input
          className="form-control"
          placeholder="name"
          type="text"
          value={input_rooms.name}
          name="name"
          onChange={(e) => handleChange(e)} /> */}

        {/*-----------------------IMAGE------------------------ */}
        <input
          className="form-control"
          placeholder="Load URL Image..."
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
        <select name="category" value={input_rooms.category}
          className="form-control"
          onChange={(e) => handleChange(e)} >
          <option disabled selected >Categories...</option>
          <option value="presidential" >presidential</option>
          <option value="premium" >premium</option>
          <option value="standard" >standard</option>
        </select>

        {/*--------------------------DESCRIPTION----------------------- */}
        <textarea
          className="form-control"
          placeholder="Description..."
          type="text"
          value={input_rooms.description}
          name="description"
          maxLength="500"
          onChange={(e) => handleChange(e)}>
        </textarea>

        {/*----------------------------BUTTON------------------------ */}
        <div>
          <button className='btn btn-primary mb-2'
            type="submit"
            onClick={(e) => handleSubmit(e)}>Send</button>
        </div>

      </form>
    </div>
  )

}