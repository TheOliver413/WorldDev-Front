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
  const hotels = useSelector(state => state.reducerHotel.hotels)
  const servicios = useSelector(state => state.reducerRoom.servicesRoom)

  console.log("servicios que me llegan: ", servicios)

  //console.log("info de services : ", hotels1)
  //const serv = hotels?.map(ele=>ele.ServicesHotels)
  //const servi = serv[7]?.map(e=>e.name)
  //console.log("info de services : ", hotels)
  //const services = useSelector(state=>state.servicesRoom)

  // console.log("info de services : ",services)
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getState())
    dispatch(getAllServicesRoom())
    // !hotels.length && dispatch(getAllServicesRoom());
  }, [dispatch, hotels])

  //----------------------------------------//
  const [input_rooms, input_setrooms] = useState({
    id: "",
    name: "",
    image: [],
    price: 10,
    description: "",
    category: "",
    services: [""],
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

  //-----------------------CLOUDINARY--------------------------//
  async function handleOpenWidget() {
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5',
      uploadPreset: 'wwtvto96'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info); 
        //setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        input_setrooms({
          ...input_rooms,
          image: [...input_rooms.image, { url: result.info.url, public_id: result.info.public_id }]
        })
        console.log(input_rooms)
      }
    })
    myWidget.open()
  }
  //--------------------------------------------//
  function handleSubmit(e) {
    e.preventDefault()

    if (input_rooms) {
      //console.log("info que se despacha:",input_rooms)
      dispatch(createRooms(input_rooms))
      input_setrooms({
        id: "",
        name: "",
        image: [],
        price: 10,
        description: "",
        category: "",
        services: [""],
        stock: 0,
      })

      toast.success('Rooms created successfully', { position: 'bottom-right' })
    } else {
      toast.error("Check the fields", { position: 'bottom-right' })
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
                <label for="nombre"> <i class="bi bi-building"></i> Hotels</label>
                <select class="form-select " name="id" value={input_rooms.id} onChange={(e) =>
                  handleChange(e)}>
                  <option disabled selected>Hotels...</option>
                  {data_hotels?.map((ele, i) => {
                    return (
                      <option value={ele.id} key={i}>{ele.name}</option>
                    )
                  })}
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4 d-flex justify-content-between">
              <div>
                <label for="nombre"><i class="bi bi-house"></i> Name</label>
                <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)}>
                  <option disabled selected>Name...</option>
                  <option value="suite" >suite</option>
                  <option value="double" >double</option>
                  <option value="single" >single</option>
                  <option value="family" >family</option>
                </select>
                <div class="nombre text-danger "></div>
              </div>

              <div>
                <label for="nombre"> <i class="bi bi-tag"></i> Categories</label>
                <select class="form-select" value={input_rooms.category} className="form-control" onChange={(e) => handleChange(e)}>
                  <option disabled selected>Categories...</option>
                  <option value="presidential">Presidential</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_rooms.image.map((imag) => (
                    <div>
                      <img src={imag.url} />
                    </div>
                  ))}

                </div>
                <div className="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-gear"></i> Services</label>
                <select class="form-select " name="services" value={input_rooms.services} onChange={(e) => handleChange(e)}>
                  <option disabled selected >Services...</option>
                  {servicios?.map((ele, i) => {
                    return (
                      <option value={ele.id} key={i} >{ele.name}</option>
                    )
                  })}
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-currency-dollar"></i> Stock</label>
                <input class="form-range" type="range" min="1" max="50"
                  value={input_rooms.stock} name="stock" onChange={(e) => handleChange(e)} />
                {<p>Available : {input_rooms.stock}</p>}

                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-currency-dollar"></i> Price</label>
                <input class="form-range" type="range" min="10" max="1000" value={input_rooms.price} name="price" onChange={(e) => handleChange(e)} />
                {<p>Value U💲{input_rooms.price}</p>}

                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea class="form-control" placeholder="Description..." type="text"
                value={input_rooms.description} name="description" maxLength="500"
                onChange={(e) => handleChange(e)}></textarea>
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

    // <div className="cardHotels-container" >
    //   <form onSubmit={(e) => handleSubmit(e)} >
    //     <h1>✯ Rooms ✯</h1>

    //     {/*-------------------SELECT HOTELS---------------- */}

    //     <select
    //       className="form-control" name="id" value={input_rooms.id} onChange={(e) => handleChange(e)}>
    //       <option disabled selected >Hotels...</option>
    //       {data_hotels?.map((ele, i) => {
    //         return (
    //           <option value={ele.id} key={i} >{ele.name}</option>
    //         )
    //       })}
    //     </select>

    //     {/*-----------------------NAME------------------------ */}
    //     <select value={input_rooms.name} name="name" className="form-control" onChange={(e) => handleChange(e)} >
    //       <option value="suite" >suite</option>
    //       <option value="double" >double</option>
    //       <option value="single" >single</option>
    //       <option value="family" >family</option>
    //     </select>

    //       {/*--------------------------UPLOAD FILES------------------- */}
    //       <button type="button" onClick={() => handleOpenWidget()}>Upload files . . .</button>
    //         <div>
    //             {input_rooms.image.map((imag) =>(
    //               <div>
    //               <img src={imag.url}/>
    //             </div>
    //           ))}

    //       </div>

    //     {/*-----------------------PRICE------------------------ */}
    //     {/* <label className=''>Price:</label> */}
    //     <input className="form-control"
    //       type="range" min="10" max="1000"
    //       value={input_rooms.price}
    //       name="price"
    //       onChange={(e) => handleChange(e)} />
    //     {<p >Value U💲{input_rooms.price}</p>}

    //     {/*-----------------------STOCK------------------------ */}
    //     <input className="form-control"
    //       type="range" min="1" max="50"
    //       value={input_rooms.stock}
    //       name="stock"
    //       onChange={(e) => handleChange(e)} />
    //     {<p >Available : {input_rooms.stock}</p>}

    //     {/*-------------------SERVICES---------------- */}
    //     <p></p>
    //     <select
    //       className="form-control" name="services" value={input_rooms.services} onChange={(e) => handleChange(e)}>
    //       <option disabled selected >Services...</option>
    //       {servicios?.map((ele, i) => {
    //         return (
    //           <option value={ele.id} key={i} >{ele.name}</option>
    //         )
    //       })}
    //     </select>

    //     {/*--------------------------CATEGORY----------------------- */}
    //     <select name="category" value={input_rooms.category}
    //       className="form-control"
    //       onChange={(e) => handleChange(e)} >
    //       <option disabled selected >Categories...</option>
    //       <option value="presidential" >presidential</option>
    //       <option value="premium" >premium</option>
    //       <option value="standard" >standard</option>
    //     </select>

    //     {/*--------------------------DESCRIPTION----------------------- */}
    //     <textarea
    //       className="form-control"
    //       placeholder="Description..."
    //       type="text"
    //       value={input_rooms.description}
    //       name="description"
    //       maxLength="500"
    //       onChange={(e) => handleChange(e)}>
    //     </textarea>

    //     {/*----------------------------BUTTON------------------------ */}
    //     <div>
    //       <button className='btn btn-primary mb-2'
    //         type="submit"
    //         onClick={(e) => handleSubmit(e)}>Send</button>
    //     </div>

    //   </form>
    // </div>
  )

}