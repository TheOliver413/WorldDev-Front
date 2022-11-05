import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearServiceRoomById, getAllServicesRoom, getServiceRoomById, modifyServicesRooms } from "../../redux/action/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";
import { Link } from "react-router-dom";

const validate = (input_serv_room) => {
    let errors = {};
    if (!input_serv_room.id) errors.id = 'Select service name'
    if (!input_serv_room.name) errors.name = 'Service name is required'
    if (!input_serv_room.image.length) errors.image = 'Upload at least one image'

    return errors;
}

const ModifyServRooms = () => {
    const dispatch = useDispatch();
    const servicesRoom = useSelector(state => state.reducerRoom.servicesRoom)
    const serviceById = useSelector(state => state.reducerRoom.serviceRoomId)

    const { user } = useAuth()

    const datosTotal = useSelector(state => state.reducerAuth.users)

    useEffect(() => {
        if (user && user.hasOwnProperty('uid')) {
            dispatch(getDetailUser(user.uid))
        }
    }, [user])

    const [input_serv_room, setInput_serv_room] = useState({
        id: '',
        name: '',
        image: [],
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getAllServicesRoom())
    }, [dispatch])

    //component will unmount
    useEffect(() => {
        return () => dispatch(clearServiceRoomById())
    }, [dispatch])

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
    async function handleOpenWidget() {
        var myWidget = await window.cloudinary.createUploadWidget({
            cloudName: 'dyyoavgq5',
            uploadPreset: 'wwtvto96'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                // console.log('Done! Here is the image info: ', result.info); 
                // setImages((prev) => [...prev,{url: result.info.url, public_id: result.info.public_id}])
                setInput_serv_room({
                    ...input_serv_room,
                    image: [...input_serv_room.image, { url: result.info.url, public_id: result.info.public_id }]
                })
                setErrors(validate({
                    ...input_serv_room,
                    image: [...input_serv_room.image, { url: result.info.url, public_id: result.info.public_id }]
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
        dispatch(getServiceRoomById(e.target.value))
    }

    //----------------HANDLE SUBMIT SERVICES ROOM------------------//
    const navigate = useNavigate()
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
            navigate('/home')
        } else {
            toast.error("Check the fields", { position: 'bottom-right' })
        }
    }


    return (
        <div>
            {/* <Link to="/profileSuperAdmin/formsSuperAdmin"> */}
                <dd><button onClick={() => navigate(-1)} className="btn btn-primary mt-1" type="button">Back</button></dd>
            {/* </Link> */}
            {
                datosTotal.rol === 'superAdmin' || datosTotal.rol === 'admin' ?
                    <section className="d-flex justify-content-center align-items-center">
                        <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                            <div className="mb-4 d-flex justify-content-start align-items-center">
                                <h1>Modify Services Rooms</h1>
                            </div>

                            <div className="mb-4">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="mb-4">
                                        <div>
                                            <label for="nombre"> <i className="bi bi-gear"></i> Current Service Name</label>
                                            <select className="form-select" value={input_serv_room.id} name="id" onChange={(e) =>
                                                handleChange(e)}>
                                                <option hidden selected>Select Service Name</option>
                                                {servicesRoom?.sort((a, b) => {
                                                    if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                                    if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                                                    return 0;
                                                }).map(e =>
                                                    <option key={e.id} value={e.id}>{e.name.toLowerCase()}</option>)}
                                            </select>
                                            <div className="nombre text-danger ">
                                                {errors.id && (<p>{errors.id}</p>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div>
                                            <label for="nombre"> <i className="bi bi-plus-circle"></i> New Service Name</label>
                                            <input type="text" className="form-control" placeholder="New Service name..."
                                                defaultValue={input_serv_room.name || serviceById?.name} name="name" onChange={(e) => handleName(e)} />
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
                                                    {input_serv_room.image?.map((imag) => (
                                                        <div key={imag.public_id}>
                                                            <img src={imag.url} alt='images servRoom' /><button className="btn btn-outline-danger mt-2" value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
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
                                        {!input_serv_room.id || !input_serv_room.name || !input_serv_room.image.length ||
                                            Object.keys(errors).length
                                            ? <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                                <span>Modify </span><i id="icono" className="bi bi-cursor-fill "></i>
                                            </button>
                                            : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                                <span>Modify </span><i id="icono" className="bi bi-cursor-fill "></i>
                                            </button>}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </section> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
            }
        </div>
    )
}

export default ModifyServRooms;