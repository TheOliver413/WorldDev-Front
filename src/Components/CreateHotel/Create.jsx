import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createHotels, updateHotels, getHotels } from '../../redux/action/action';
import { toast } from "react-toastify";
import '../Create/Styles.css';

export default function Create() {
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
  const [input_create, setInput_create] = useState({
    option: ''
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

  } */
  
  //------------------ HANDLE CHANGE HOTELS -------------------//
  function handleChange(e) {
    e.preventDefault();
    console.log("estado actual:", input_create)
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

  const handleChangeCreate = (e) => {
    e.preventDefault();
    setInput_create({
      ...input_create,
      [e.target.name]: e.target.value
    })
  }

  //---------------- HANDLE SUBMIT HOTELS------------------//
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   if (input_hotels) {
  //     dispatch(createHotels(input_hotels))

  //     input_sethotels({
  //       name: "",
  //       image: [""],
  //       qualification: 1,
  //       description: "",
  //       city: "",
  //       country: "",
  //       continent: "",
  //     })

  //     alert('Hotel created successfully')
  //   } else {
  //     alert("Check the fields")
  //   }
  // }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(input_create)
    if (input_hotels) {
      if (input_create.option === 'create') {
        dispatch(createHotels(input_hotels))
        toast.success('Hotel created successfully', { position: 'bottom-right' })
      } else {
        dispatch(updateHotels(input_hotels))
        toast.success('Hotel modified successfully', { position: 'bottom-right' })
      }
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
    } else {
      toast.error('Check the fields', { position: 'bottom-right' })
    }
  }

  return (
    <div className="cardHotels-container">
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-group">
          <h1>✯ Hotel ✯</h1>
          {/*-----------------------NAME------------------------ */}

          {/*----------------CREATE OR MODIFY------------------------ */}
          <div>
            <label>-Select an option-
              <br></br>
              <label> Create
                <input
                  type='radio'
                  id='create'
                  name='option'
                  value='create'

                  onChange={(e) => handleChangeCreate(e)} />
              </label>
              <label> Modify
                <input
                  type='radio'
                  id='modify'
                  name='option'
                  value='modify'
                  onChange={(e) => handleChangeCreate(e)} />
              </label>
            </label>
          </div>

          {/*-----------------------SELECT HOTELS------------------------ */}
          <div className="form-row" >
            {input_create.option === 'create' ?
              (<input
                className="form-control"
                autoFocus
                placeholder="Name..."
                type="text" value={input_hotels.name}
                name="name"
                onChange={(e) => handleChange(e)} />)
              : (<div>

                <select value={input_create.id} name="id" onChange={(e) => handleChange(e)}>
                  <option hidden selected >Hotels...</option>
                  {data_hotels?.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  }).map(e =>
                    <option key={e.name} value={e.id} >{e.name}</option>)}
                </select>

              </div>)}

              {/*--------------------------NAME------------------- */}

            <div className=''>
              <input
                className="form-control"
                placeholder="Name..."
                type="text"
                value={input_hotels.name}
                name="name"
                onChange={(e) => handleChange(e)} />
            </div>

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
                name="adress"
                onChange={(e) => handleChange(e)}>
              </input>
            </div>
             {/*--------------------------DEPARTMENT----------------------- */}          
              
             <select>
              { 
                <option>departamento</option>
               }      
             </select>
                     

             {/*--------------------------CITY----------------------- */}          
              
             <select>
              { 
                <option>Moreno</option>
               }
             </select>
              
            
              {/*--------------------------STATE----------------------- */}          
               
             <select>
              { 
                <option>Buenos aires</option>
               }
             </select>
              
              
            {/*--------------------------COUNTRY----------------------- */}
            {/* <div >
              <input
                className="form-control"
                placeholder="Country..."
                type="text"
                value={input_hotels.country}
                name="country"
                onChange={(e) => handleChange(e)}>
              </input>
            </div> */}

            {/*--------------------------CONTINENT----------------------- */}
            {/* <div >
              <input
                className="form-control"
                placeholder="Continent..."
                type="text"
                value={input_hotels.continent}
                name="continent"
                onChange={(e) => handleChange(e)}>
              </input>
            </div> */}

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

