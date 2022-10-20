import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createServicesRooms } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_serv_room) => {
    let errors = {};
    if (!input_serv_room.name) errors.name = 'Service name is required'
    if (!input_serv_room.image) errors.image = 'Upload at least one image'
    return errors;
}

const CreateServRooms = () => {
    const dispatch = useDispatch();

    const [input_serv_room, setInput_serv_room] = useState({
        name: '',
        image: '',
    })

    const [errors, setErrors] = useState({})

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

    //------------ HANDLE CHANGE --------------//
    const handleChange = (e) => {
        e.preventDefault();
        setInput_serv_room({
            ...input_serv_room,
            image: e.target.value
        })
        setErrors(validate({
            ...input_serv_room,
            image: e.target.value
        }))
    }

    //----------------HANDLE SUBMIT SERVICES ROOM------------------//
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input_serv_room && !Object.keys(errors).length) {
            dispatch(createServicesRooms(input_serv_room))
            toast.success('Service created successfully', { position: 'bottom-right' })
            setInput_serv_room({
                name: "",
                image: "",
            })
        } else {
            toast.error("Check the fields", { position: 'bottom-right' })
        }
    }


    return (
        <section class="d-flex justify-content-center align-items-center">
            <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                <div class="mb-4 d-flex justify-content-start align-items-center">
                    <h1>Services Rooms</h1>
                </div>

                <div class="mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-gear"></i> Service Name</label>
                                <input type="text" class="form-control" placeholder="Service name..."
                                    value={input_serv_room.name} name="name" onChange={(e) => handleName(e)} />
                                <div class="nombre text-danger ">
                                    {errors.name && (<p>{errors.name}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                                <input type="file" class="form-control" placeholder="Load URL Image..."
                                    value={input_serv_room.image} name="image" onChange={(e) => handleChange(e)} />
                                <div class="nombre text-danger ">
                                    {errors.image && (<p>{errors.image}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            {!input_serv_room.name || !input_serv_room.image || Object.keys(errors).length
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

export default CreateServRooms;