import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createServicesRooms } from "../../redux/action/action";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const validate = (input_serv_room) => {
    let errors = {};
    if (!input_serv_room.name) errors.name = 'Service name is required'
    if (!input_serv_room.image.length) errors.image = 'Upload at least one image'
    return errors;
}

const CreateServRooms = () => {
    const dispatch = useDispatch();

    const [input_serv_room, setInput_serv_room] = useState({
        name: '',
        image: [],
    })

    const [errors, setErrors] = useState({})

    //------------ HANDLE CHANGE NAME SERVICES ROOM--------------//
    const handleName = (e) => {
        e.preventDefault();
        setInput_serv_room({
            ...input_serv_room,
            name: e.target.value.toLowerCase()
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
          setErrors(validate({
            ...input_serv_room,
            image:[...input_serv_room.image, {url: result.info.url,public_id: result.info.public_id}]
          }))         
        }
      })
      myWidget.open()
  }
  
  const onHandleDeleteimage = (e) => {
    e.preventDefault();
    setInput_serv_room({
      ...input_serv_room,
      image: input_serv_room.image.filter(el => el.public_id !== e.target.value)
  })
}

    //----------------HANDLE SUBMIT SERVICES ROOM------------------//
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input_serv_room && !Object.keys(errors).length) {
            dispatch(createServicesRooms(input_serv_room))
            toast.success('Service created successfully', { position: 'bottom-right' })
            setInput_serv_room({
                name: "",
                image: [],
            })
            navigate('/home')
        } else {
            toast.error("Check the fields", { position: 'bottom-right' })
        }
    }


    return (
        <div class="container">
        <div class="row">
        <Link to= "/profileSuperAdmin/formsSuperAdmin">
      <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
      </Link>
        <section className="d-flex justify-content-center align-items-center">
            <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                <div className="mb-4 d-flex justify-content-start align-items-center">
                    <h1>Services Rooms</h1>
                </div>

                <div className="mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-4">
                            <div>
                                <label for="nombre"> <i className="bi bi-gear"></i> Service Name</label>
                                <input type="text" className="form-control" placeholder="Service name..."
                                    value={input_serv_room.name} name="name" onChange={(e) => handleName(e)} />
                                <div className="nombre text-danger ">
                                    {errors.name && (<p>{errors.name}</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div>
                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                <div>
                <div>
                  {input_serv_room.image?.map((imag) =>(
                    <div key={imag.public_id}>
                      <img src={imag.url} alt='images servRoom'/><button value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
                    </div>
                  ))}
                </div>
                <div className="nombre text-danger ">
                                    {errors.image && (<p>{errors.image}</p>)}
                                </div>
                        </div>
                        </div>
                        </div>
                        

                        <div className="mb-4">
                            {!input_serv_room.name || !input_serv_room.image.length || Object.keys(errors).length
                                ? <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Create </span><i id="icono" className="bi bi-cursor-fill "></i>
                                </button>
                                : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Create </span><i id="icono" className="bi bi-cursor-fill "></i>
                                </button>}
                        </div>

                    </form>
                </div>
            </div>
        </section>
        </div>
        </div>
    )
}

export default CreateServRooms;