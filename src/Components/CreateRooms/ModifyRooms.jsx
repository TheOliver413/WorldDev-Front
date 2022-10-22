import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyRooms, getHotels } from '../../redux/action/action';
import '../CreateRooms/Styles.css';


export default function ModifyRooms() {
  //--------------------------------------------------//
  const dispatch = useDispatch();
  const data_hotels = useSelector(state => state.reducerHotel.hotels)
  const hotels = useSelector(state=>state.reducerHotel.hotels)

  //console.log("info de hoteles: ",data_hotels)
  useEffect(() => {
    !hotels.length && dispatch(getHotels());
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
  //console.log("aca name: ",input_rooms.name)

  // const [input_create, setInput_create] = useState({
  //   option: ''
  // })
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

  function handleSubmit(e) {
    e.preventDefault()

    if ( input_rooms ) {
      dispatch(modifyRooms(input_rooms))
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

      alert('Rooms modify successfully')
    } else {
      alert("Check the fields")
    }
  }

  return (
<section class="d-flex justify-content-center align-items-center">
        <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
            <div class="mb-4 d-flex justify-content-start align-items-center">

                <h1>Modify Rooms</h1>
            </div>
            <div class="mb-1">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-4">
                        <div>
                            <label for="nombre"> <i class="bi bi-building"></i> Hotels</label>
                            <select class="form-select " name="id" value={input_rooms.id} onChange={(e)=>
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
                            <select class="form-select" value={input_rooms.name} name="name" onChange={(e)=>
                                handleChange(e)}>
                                <option disabled selected>Name...</option>
                                <option value="suite">suite</option>
                                <option value="double">double</option>
                                <option value="single">single</option>
                                <option value="family">family</option>
                            </select>
                            <div class="nombre text-danger "></div>
                        </div>

                        <div>
                            <label for="nombre"> <i class="bi bi-tag"></i> Categories</label>
                            <select class="form-select" name="category" value={input_rooms.category} onChange={(e)=>
                                handleChange(e)}>
                                <option disabled selected>Categories...</option>
                                <option value="presidential">presidential</option>
                                <option value="premium">premium</option>
                                <option value="standard">standard</option>
                            </select>
                            <div class="nombre text-danger "></div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div>
                            <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                            <input class="form-control" type="file" value={input_rooms.image} name="image"
                                onChange={(e)=> handleChange(e)}/>
                            <div class="nombre text-danger "></div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div>
                            <label for="nombre"> <i class="bi bi-gear"></i> Services</label>
                            <select class="form-select " name="services" value={input_rooms.services} onChange={(e)=>
                                handleChange(e)}>
                                <option disabled selected>Services...</option>
                                {/* {servi?.map((ele, i) => {
                                return (
                                <option value={ele.id} key={i}>{ele}</option>
                                )
                                })} */}
                            </select>
                            <div class="nombre text-danger "></div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div>
                            <label for="nombre"><i class="bi bi-currency-dollar"></i> Stock</label>
                            <input class="form-range" type="range" min="1" max="50" value={input_rooms.stock}
                                name="stock" onChange={(e)=> handleChange(e)}/>
                            {<p>Available : {input_rooms.stock}</p>}

                            <div class="nombre text-danger "></div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <div>
                            <label for="nombre"><i class="bi bi-currency-dollar"></i> Price</label>
                            <input class="form-range" type="range" min="10" max="1000" value={input_rooms.price}
                                name="price" onChange={(e)=> handleChange(e)}/>
                            {<p>Value U💲{input_rooms.price}</p>}

                            <div class="nombre text-danger "></div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
                        <textarea class="form-control" placeholder="Description..." type="text"
                            value={input_rooms.description} name="description" maxLength="500"
                            onChange={(e)=> handleChange(e)}></textarea>
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