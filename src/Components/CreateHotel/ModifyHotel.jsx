import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHotels, getHotels } from '../../redux/action/action';
import '../Create/Styles.css';

export default function ModifyHotel() {
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)

  const [input_hotels, input_sethotels] = useState({
    id: "",
    name: "",
    image: [""],
    qualification: 1,
    description: "",
    address:"",
    city: "",
    country: "",
    department: "",

  })

  useEffect(() => {
    !hotels.length && dispatch(getHotels());
  }, [dispatch, hotels])

  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  /* const validate = (input_hotels) => {
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

    // return errors;

  } */
  
  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    //console.log("estado actual:", input_create)
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
      dispatch(updateHotels(input_hotels))

      input_sethotels({
        id: "",
        name: "",
        image: [""],
        qualification: 1,
        description: "",
        address:"",
        city: "",
        country: "",
        department: "",
      })

      alert('Hotel created successfully')
    } else {
      alert("Check the fields")
    }
  }
  
  return (
    <div className="cardHotels-container">
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-group">
          <h1>✯ Hotel ✯</h1>

          {/*-----------------------NAME------------------------ */}
          <div className="form-row" >
          <select
          className="form-control" name="id" value={input_hotels.id} onChange={(e) => handleChange(e)}>
          <option disabled selected >Hotels...</option>
          {data_hotels?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele.name}</option>
            )
          })}
        </select>

            {/*--------------------------IMAGE------------------- */}
            <div className=''>
              <input
                className="form-control"
                type="file"
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
              <h4>Category</h4>
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

            {/*--------------------------ADRESS----------------------- */}
            <h4>Location</h4>
            <div >
              <input
                className="form-control"
                placeholder="Address..."
                type="text"
                value={input_hotels.address}
                name="address"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>

              {/*--------------------------STATE----------------------- */}          
               
             <select onChange={(e) => handleChange(e)} >
               <option disabled selected >State...</option>
              {

               }
             </select>

             {/*--------------------------DEPARTMENT----------------------- */}          
              
             <select onChange={(e) => handleChange(e)} >
               <option disabled selected >Department...</option>
              {

               }      
             </select>
                     

             {/*--------------------------CITY----------------------- */}          
              
             <select onChange={(e) => handleChange(e)} >
               <option disabled selected >City...</option>
              {

               }
             </select>
              
            {/*----------------------------BUTTON------------------------ */}
            <div>
              <button className='btn btn-primary mb-2'
                type="submit"
                onClick={(e) => handleSubmit(e)}>Send</button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}




