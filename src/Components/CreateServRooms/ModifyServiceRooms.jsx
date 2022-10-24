import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllServicesRoom, modifyServicesRooms } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_serv_room) => {
    let errors = {};
    if (!input_serv_room.id) errors.id = 'Select service name'
    if (!input_serv_room.name) errors.name = 'Service name is required'
    if (!input_serv_room.image) errors.image = 'Upload at least one image'

    return errors;
}

const ModifyServRooms = () => {
    const dispatch = useDispatch();
    const servicesRoom = useSelector(state => state.reducerRoom.servicesRoom)

    const [input_serv_room, setInput_serv_room] = useState({
        id: '',
        name: '',
        image: [],
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllServicesRoom())
    }, [dispatch])


    //------------ HANDLE CHANGE NAME SERVICES ROOM--------------//
    const handleName = (e) => {
        e.preventDefault();
        setInput_serv_room({
            ...input_serv_room,
            name: e.target.value.toLowerCase().trim()
        })
        setErrors(validate({
            ...input_serv_room,
            name: e.target.value
        }))
    }
//------------------Cloudinary-----------------//
async function handleOpenWidget(){
    var myWidget = await window.cloudinary.createUploadWidget({
      cloudName: 'dyyoavgq5', 
      uploadPreset: 'wwtvto96'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          // console.log('Done! Here is the image info: ', result.info); 
          // setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
          setInput_serv_room( {
            ...input_serv_room,
            image:[...input_serv_room.image, {url: result.info.url,public_id: result.info.public_id}]
          })
         
        }
      })
      myWidget.open()
  }
    //------------ HANDLE CHANGE --------------//
    const handleChange = (e) => {
        e.preventDefault();
        setInput_serv_room({
            ...input_serv_room,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input_serv_room,
            [e.target.name]: e.target.value
        }))
    }

    //----------------HANDLE SUBMIT SERVICES ROOM------------------//
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input_serv_room && !Object.keys(errors).length) {
            dispatch(modifyServicesRooms(input_serv_room))
            toast.success('Service modified successfully', { position: 'bottom-right' })
            setInput_serv_room({
                id: "",
                name: "",
                image: [],
            })
        } else {
            toast.error("Check the fields", { position: 'bottom-right' })
        }
    }


    return (
        <section class="d-flex justify-content-center align-items-center">
            <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                <div class="mb-4 d-flex justify-content-start align-items-center">
                    <h1>Modify Services Rooms</h1>
                </div>

                <div class="mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-gear"></i> Current Service Name</label>
                                <select class="form-select" value={input_serv_room.id} name="id" onChange={(e) =>
                                    handleChange(e)}>
                                    <option hidden selected>Select Service Name</option>
                                    {servicesRoom?.sort((a, b) => {
                                        if (a.name > b.name) return 1;
                                        if (a.name < b.name) return -1; return 0;
                                    }).map(e =>
                                        <option key={e.id} value={e.id}>{e.name}</option>)}
                                </select>
                                <div class="nombre text-danger ">
                                    {errors.id && (<p>{errors.id}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-plus-circle"></i> New Service Name</label>
                                <input type="text" class="form-control" placeholder="New Service name..."
                                    value={input_serv_room.name} name="name" onChange={(e) => handleName(e)} />
                                <div class="nombre text-danger ">
                                    {errors.name && (<p>{errors.name}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            {/* <div>
                                <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                                <input type="file" class="form-control" placeholder="Load URL Image..."
                                    value={input_serv_room.image} name="image" onChange={(e) => handleChange(e)} />
                                <div class="nombre text-danger ">
                                    {errors.image && (<p>{errors.image}</p>)}
                                </div>
                            </div> */}
                           <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                <div>
                  {input_serv_room.image?.map((imag) =>(
                    <div>
                      <img src={imag.url}/>
                    </div>
                  ))}
                </div>
                <div class="nombre text-danger ">
                                    {errors.image && (<p>{errors.image}</p>)}
                                </div>
                        </div>
                        </div>
                        </div>

                        
                        <div class="mb-4">
                            {!input_serv_room.id || !input_serv_room.name || !input_serv_room.image ||
                                Object.keys(errors).length
                                ? <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
                                </button>
                                : <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Creat </span><i id="icono" class="bi bi-cursor-fill "></i>
                                </button>}
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default ModifyServRooms;