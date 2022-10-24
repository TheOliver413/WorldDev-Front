import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateHotels, getHotels, getState, getDepartment, getCity } from '../../redux/action/action';
import '../Create/Styles.css';
import { toast } from "react-toastify";


export default function ModifyHotel() {
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state => state.reducerHotel.hotels)

  const get_state = useSelector(state => state.reducerHotel.location_state)
  const get_department = useSelector(state => state.reducerHotel.location_department)
  const get_city = useSelector(state => state.reducerHotel.location_city)


  //---------------------------------------------------//

  const [input_hotels, input_sethotels] = useState({
    id: "",
    name: "",
    image: [],
    qualification: 1,
    description: "",
    address: "",
    idLocation: "",

  })

  //-----------------PRECARGA DE FORMULARIO------------------//
  console.log("Hoteles cargados: ", hotels)


  //  const id_hotel = hotels.filter(ele=>ele.id == "1a9a0077-b2bf-43c9-8709-803a84771670")
  //  const pre_description = id_hotel.map(ele=>ele.description)
  //  const pre_qualification = id_hotel.map(ele=>ele.qualification)
  //  const pre_address = id_hotel.map(ele=>ele.address)

  //  console.log("description a precargar: ",id_hotel.map(ele=>ele.description))
  //  console.log("qualification a precargar: ",id_hotel.map(ele=>ele.qualification))
  //  console.log("address a precargar: ",id_hotel.map(ele=>ele.address))






  //---------------------------------------------------//
  const [location, setlocation] = useState({
    state: "",
    department: "",
    city: "",
  })
  //---------------------------------------------------//
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
    dispatch(getState());
  }, [dispatch, hotels])

  //----------------------------------------------------//
  function handleChangeLocation(e) {
    e.preventDefault();
    setlocation({
      ...location,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "state") {
      dispatch(getDepartment(e.target.value))
    }
    if (e.target.name === "department") {
      dispatch(getCity(e.target.value))
    }
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // )
  }

  //------------------------VALIDATIONS-----------------------------//
  // let validateName = /^[a-zA-Z\s]+$/;

  //  const validate = (input_hotels) => {
  //   let errors = {}

  //   if (!input.name.length) {
  //     errors.name = 'Title cannot be empty'
  //   }

  //   if (!validateName.test(input.name)) {
  //     errors.name = 'Special characters or numbers are not allowed'
  //   }

  //   if (recipes.find((e) => e.name.toLowerCase() === input.name.toLowerCase())) {
  //     alert(`The name ${input.name} already exist, please choose another one!`)
  //   }

  //   return errors;

  // } 

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
  //-----------------------CLOUDINARY--------------------------//
  async function handleOpenWidget() {
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5',
      uploadPreset: 'wwtvto96'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info); 
        //setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
        input_sethotels({
          ...input_hotels,
          image: [...input_hotels.image, { url: result.info.url, public_id: result.info.public_id }]
        })
        console.log(input_hotels)
      }
    })
    myWidget.open()
  }



  //---------------- HANDLE SUBMIT HOTELS------------------//
  function handleSubmit(e) {
    e.preventDefault()
    if (input_hotels) {

      // dispatch(createHotels(input_hotels))

      if (input_hotels) {
        console.log("info despachada modify hotel:", input_hotels)
        dispatch(updateHotels(input_hotels))
        toast.success('Hotel modified successfully', { position: 'bottom-right' })
      }

      input_sethotels({
        id: "",
        name: "",
        image: [],
        qualification: 1,
        description: "",
        address: "",
        idLocation: "",

      })

    } else {
      toast.error('Check the fields', { position: 'bottom-right' })
    }
  }

  return (
    <section class="d-flex justify-content-center align-items-center">
      <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
        <div class="mb-4 d-flex justify-content-start align-items-center">
          <h1>Modify Hotels</h1>
        </div>

        <div class="mb-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Hotel Name</label>
                <select class="form-select" name="id" value={input_hotels.id} onChange={(e) => handleChange(e)}>
                  <option hidden selected>Hotels...</option>
                  {data_hotels?.map((ele, i) => {
                    return (
                      <option value={ele.id} key={i}>{ele.name}</option>
                    )
                  })}
                </select>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-plus-circle"></i> Name</label>
                <input type="text" class="form-control" placeholder="Rename Hotel..." value={input_hotels.name} name="name"
                  onChange={(e) => handleChange(e)} />
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"> <i class="bi bi-building"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                  {input_hotels.image.map((imag) => (
                    <div>
                      <img src={imag.url} />
                    </div>
                  ))}

                </div>
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div className="mb-4">
              <label for="nombre"><i className="bi bi-geo-alt"></i> Adress</label>
              <input type="text" className="form-control" placeholder="Address..."
                value={input_hotels.address} name="address" onChange={(e) => handleChange(e)} />
              <div className="nombre text-danger "></div>
            </div>

            <div className="mb-4">
              <label for="nombre"><i className="bi bi-house"></i> State</label>
              <select className="form-select" name="state" value={location.state} onChange={(e) => handleChangeLocation(e)}>
                <option disabled selected >State...</option>
                {get_state?.map((ele, i) => {
                  return (
                    <option value={ele} key={i} > {ele} </option>
                  )
                })
                }
              </select>
              <div className="nombre text-danger "></div>
            </div>

            <div className="mb-4 d-flex justify-content-between">
              <div>
                <label for="apellido"><i className="bi bi-pin"></i> Department</label>
                <select className="form-select " name="department" value={location.department} onChange={(e) => handleChangeLocation(e)}>
                  <option disabled selected>Department...</option>
                  {get_department?.map((ele, i) => {
                    return (
                      <option value={ele} key={i} > {ele} </option>
                    )
                  })
                  }
                </select>
                <div className="apellido text-danger"></div>
              </div>

              <div>
                <label for="nombre"><i className="bi bi-pin-map"></i> City</label>
                <select className="form-select" name="idLocation" value={input_hotels.idLocation} onChange={(e) => handleChange(e)}>
                  <option disabled selected>City...</option>
                  {get_city?.map((ele, i) => {
                    return (
                      <option value={ele.id} key={i} > {ele.city} </option>
                    )
                  })
                  }
                </select>
                <div className="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <div>
                <label for="nombre"><i class="bi bi-star"></i> Qualification</label>
                <input class="form-range" type="range" min="1" max="5" value={input_hotels.qualification} name="qualification"
                  maxLength="1000" onChange={(e) => handleChange(e)} />
                {<p className=""> <i class="bi bi-star"></i> : {input_hotels.qualification}</p>}
                <div class="nombre text-danger "></div>
              </div>
            </div>

            <div class="mb-4">
              <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
              <textarea id="mensaje" class="form-control" placeholder="Description..." value={input_hotels.description}
                name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
              <div class="mensaje text-danger"></div>
            </div>

            <div class="mb-4">
              <button class="col-12 btn btn-primary d-flex justify-content-between" type="submit" onClick={(e) => handleSubmit(e)}>
                <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    // <div className="cardHotels-container">
    //   <form onSubmit={(e) => handleSubmit(e)} >
    //     <div className="form-group">
    //       <h1>✯ Hotel ✯</h1>

    //       {/*-----------------------NAME------------------------ */}
    //       <div className="form-row" >
    //       <select
    //       className="form-control" name = "id" value= {input_hotels.id} onChange={(e) => handleChange(e)}>
    //       <option disabled selected >Hotels...</option>
    //       {data_hotels?.map((ele, i) => {
    //         return (
    //           <option value={ele.id} key={i} >{ele.name}</option>
    //         )
    //       })}
    //     </select>

    //           {/*--------------------------REMANE------------------- */}
    //         <div className=''>
    //           <input
    //             className="form-control"
    //             placeholder="Rename Hotel..."
    //             type="text"
    //             value={input_hotels.name}
    //             name="name"
    //             onChange={(e) => handleChange(e)} />
    //         </div>


    //         {/*--------------------------UPLOAD FILES------------------- */}

    //          <button type="button" onClick={() => handleOpenWidget()}>Upload files . . .</button>
    //             <div>
    //               {input_hotels.image.map((imag) =>(
    //                 <div>
    //                   <img src={imag.url}/>
    //                 </div>
    //               ))}

    //             </div>

    //         {/*--------------------------DESCRIPTION----------------------- */}
    //         <div >
    //           <textarea
    //             className="form-control"
    //             placeholder="Description..."
    //             type="text"
    //             value={input_hotels.description}
    //             name="description"
    //             maxLength="1000"
    //             onChange={(e) => handleChange(e)}>
    //           </textarea>
    //         </div>

    //         {/*--------------------------QUALIFICATION----------------------- */}

    //         <div >
    //           <h4>Category</h4>
    //           <input
    //             className="form-control"
    //             type="range"
    //             min="1"
    //             max="5"
    //             value={input_hotels.qualification}
    //             name="qualification"
    //             maxLength="1000"
    //             onChange={(e) => handleChange(e)}>
    //           </input>
    //           {<p className="" > Value : {input_hotels.qualification}</p>}
    //         </div>

    //         {/*--------------------------ADRESS----------------------- */}
    //         <h4>Location</h4>
    //         <div >
    //           <input
    //             className="form-control"
    //             placeholder="Address..."
    //             type="text"
    // value={input_hotels.address}
    // name="address"
    // onChange={(e) => handleChange(e)}>
    //           </input>
    //         </div>

    //           {/*--------------------------STATE----------------------- */}          

    //          <select  name="state" value={ location.state }  onChange={(e) => handleChangeLocation(e)} >
    //            <option   disabled selected >State...</option>
    //           { get_state?.map((ele,i)=>{
    //             return(
    //               <option  value= { ele } key={i} > { ele } </option>
    //             )
    //           })
    //             }
    //          </select>

    //          {/*--------------------------DEPARTMENT----------------------- */}          

    //          <select  name="department" value={ location.department } onChange={(e) => handleChangeLocation(e)} >
    //            <option disabled selected >Department...</option>
    //            { get_department?.map((ele,i)=>{
    //             return(
    //               <option  value= { ele } key= {i} > { ele } </option>
    //             )
    //           })
    //             }      
    //          </select>

    //          {/*--------------------------CITY----------------------- */}          

    //          <select  name="idLocation" value={ input_hotels.idLocation } onChange={(e) => handleChange(e)} >
    //            <option disabled selected >City...</option>
    //            { get_city?.map((ele,i)=>{
    //             return(
    //               <option  value= { ele.id } key={i} > { ele.city } </option>
    //             )
    //           })
    //             }
    //          </select>

    //         {/*----------------------------BUTTON------------------------ */}
    //         <div>
    //           <button className='btn btn-primary mb-2'
    //             type="submit"
    //             onClick={(e) => handleSubmit(e)}>Send</button>
    //         </div>

    //       </div>
    //     </div>
    //   </form>
    // </div>
  )
}