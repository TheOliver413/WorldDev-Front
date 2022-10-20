import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createRooms, getHotels, getAllServicesRoom } from '../../redux/action/action';
import { getCity, getDepartment, getState } from "../../redux/action/action";
import { toast } from "react-toastify";

import '../CreateRooms/Styles.css';

export default function CreateRooms() {
  //--------------------------------------------------//
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)
  const hotels1 = useSelector(state=>state.servicesRoom)


  //console.log("info de services : ", hotels1)
  //const serv = hotels?.map(ele=>ele.ServicesHotels)
  //const servi = serv[7]?.map(e=>e.name)
  //console.log("info de services : ", hotels)
  //const services = useSelector(state=>state.servicesRoom)
  
  // console.log("info de services : ",services)
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getState())
    // dispatch(getDepartment())
    // dispatch(getCity())

    // !hotels.length && dispatch(getAllServicesRoom());
  }, [dispatch, hotels])

  //----------------------------------------//
  const [input_rooms, input_setrooms] = useState({
    id: "",
    name: "",
    image: [""],
    price: 10,
    description: "",
    category: "",
    services:[""],
    stock: 0,
  })

  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  /* const validate = (input_rooms) => {
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

    // return errors;

  } */

  //------------------ HANDLE CHANGE ROOMS-------------------//
  function handleChange(e) {
    e.preventDefault();
    // console.log(e.target.name, e.target.value)
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
        category: "",
        services:[""],
        stock: 0,
      })

      toast.success('Rooms created successfully', { position: 'bottom-right' })
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
    }
  }

  return (

    <div className="cardHotels-container" >
      <form onSubmit={(e) => handleSubmit(e)} >
        <h1>✯ Rooms ✯</h1>

        {/*-------------------SELECT HOTELS---------------- */}
        
        <select
          className="form-control" name="id" value={input_rooms.id} onChange={(e) => handleChange(e)}>
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

        {/*-----------------------IMAGE------------------------ */}
        <input
          className="form-control"
          type="file"
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

        {/*-----------------------STOCK------------------------ */}
        <input className="form-control"
          type="range" min="1" max="50"
          value={input_rooms.stock}
          name="stock"
          onChange={(e) => handleChange(e)} />
        {<p >Available : {input_rooms.stock}</p>}

        {/*-------------------SERVICES---------------- */}
        <p></p>
        <select
          className="form-control" name="services" value={input_rooms.services} onChange={(e) => handleChange(e)}>
          <option disabled selected >Services...</option>
          {/* {servi?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele}</option>
            )
          })} */}
        </select>

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