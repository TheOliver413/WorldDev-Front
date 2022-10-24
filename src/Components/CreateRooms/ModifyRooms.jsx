import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyRooms, getHotels, getAllRoomsOfHotel } from '../../redux/action/action';
import '../CreateRooms/Styles.css';
import { toast } from "react-toastify";

export default function ModifyRooms() {
  //--------------------------------------------------//
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)
  const rooms = useSelector(state=>state.reducerRoom.allRooms)
  const servicios = useSelector(state=>state.reducerRoom.servicesRoom)

  console.log("servicios que me llegan: ", servicios)
  console.log("habitaciones para select: ",rooms)
  //console.log("info de hoteles: ",data_hotels)
  useEffect(() => {
    !hotels.length && dispatch(getHotels());

  }, [dispatch, hotels])

  //----------------------------------------//
  const [input_rooms, input_setrooms] = useState({
    id: "",
    name: "",
    image: [],
    price: 10,
    description: "",
    category: "",
    services:[""],
    stock: 0,
  })

  const [nameRooms, setnameRooms] = useState([
      "single","double","family","siute"
  ])

  //console.log("aca name: ",input_rooms.name)

  // const [input_create, setInput_create] = useState({
  //   option: ''
  // })
  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  /* const validate = (input_rooms) => {
    // let errors = {}

    // if (!input.title.length) {
    //   errors.title = 'Name cannot be empty'
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
    //console.log(e.target.name, e.target.value)
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
//------------------------------------------//
  function handleChangeRooms(e) {
    e.preventDefault();
   dispatch(getAllRoomsOfHotel(e.target.value))
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }

   //-----------------------CLOUDINARY--------------------------//
   async function handleOpenWidget(){
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5', 
      uploadPreset: 'wwtvto96'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          // console.log('Done! Here is the image info: ', result.info); 
          //setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
          input_setrooms( {
            ...input_rooms,
            image:[...input_rooms.image, {url: result.info.url,public_id: result.info.public_id}]
          })
          // console.log(input_rooms)
        }
      })
      myWidget.open()
  }
  //--------------------------------------------//
    function handleSubmit(e) {
      e.preventDefault()
  
      if ( input_rooms ) {
        dispatch(modifyRooms(input_rooms))
        console.log("despacho modify room: ",input_rooms)
        input_setrooms({
          id: "",
          name: "",
          image: [],
          price: 10,
          description: "",
          category: "",
          services:[""],
          stock: 0,
        })
  
        toast.success('Rooms modify successfully', { position: 'bottom-right' })
      } else {
        toast.error("Check the fields", { position: 'bottom-right' })
      }
    }

  return (
    <div className="cardHotels-container" >
      <form onSubmit={(e) => handleSubmit(e)} >
        <h1>✯ Rooms ✯</h1>


        {/*-------------------SELECT HOTELS---------------- */}
        <p></p>
        <select
          className="form-control"  onChange={(e) => handleChangeRooms(e)}>
          <option disabled selected >Hotels...</option>
          {data_hotels?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele.name}</option>
            )
          })}
        </select>

        {/*-----------------------ID------------------------ */}
        <select value={input_rooms.id} name="id" className="form-control" onChange={(e) => handleChange(e)} >
        {rooms?.map((ele, i) => {
            return (
              <option value={ele.id} key={i} >{ele.name}</option>
            )
          })}
        </select>
            {/*-----------------------NAME------------------------ */}
        <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)} >
        {nameRooms?.map((ele, i) => {
            return (
              <option value={ele} key={i} >{ele}</option>
            )
          })}
        </select>

          {/*--------------------------UPLOAD FILES------------------- */}
          <button type="button" onClick={() => handleOpenWidget()}>Upload files . . .</button>
            <div>
                {input_rooms.image.map((imag) =>(
                  <div>
                  <img src={imag.url}/>
                </div>
              ))}

          </div>

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
          {servicios?.map((ele, i) => {
            return (
              <option value={ele} key={i} >{ele}</option>
            )
          })}
        </select>

        {/*--------------------------CATEGORY----------------------- */}
        <select name="category" value={input_rooms.category}
          className="form-control"
          onChange={(e) => handleChange(e)} >
          <option disabled selected >Categories... </option>
          <option value="presidential">presidential</option>
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

        {/*----------------------------BUTTONS------------------------ */}

        <div>
          <button className='btn btn-primary mb-2'
            type="submit"
            onClick={(e) => handleSubmit(e)}>Send</button>
        </div>
    </section>
  )

}