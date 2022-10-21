import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { modifyServicesHotels, getHotels, getServicesHotel } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_hotel) => {
    let error = {};
    if (!input_hotel.idHotel) error.idHotel = 'Hotel name is required'
    return error;
}
const validateTwo = (input_serv_hotel) => {
    let errors = {}
    if (!input_serv_hotel.id) errors.id = 'Select Service Name'
    if (!input_serv_hotel.name) errors.name = 'Service Name is required'
    if (!input_serv_hotel.image) errors.image = 'Upload at least one image'
    if (!input_serv_hotel.description) errors.description = 'Description is required'
    return errors;
}


const ModifyServHotels = () => {
    const dispatch = useDispatch();

    const hotels = useSelector(state => state.reducerHotel.hotels)
    const servicesHotelID = useSelector(state => state.reducerHotel.onlyServicesHotel)

    const [input_hotel, setInput_hotel] = useState({
        idHotel: ''
    })

    const [input_serv_hotel, setInput_serv_hotel] = useState({
        id: '',
        name: '',
        image: '',
        description: '',
    })

    const [error, setError] = useState({})
    const [errors, setErrors] = useState({})


    useEffect(() => {
        !hotels.length && dispatch(getHotels())
    }, [dispatch, hotels])


    //------------ HANDLE CHANGE HOTEL NAME----------//
    const handleChangeHotel = (e) => {
        e.preventDefault();
        setInput_hotel({
            ...input_hotel,
            idHotel: e.target.value
        })
        setError(validate({
            ...input_hotel,
            idHotel: e.target.value
        }))
        dispatch(getServicesHotel(e.target.value))
    }

    //------------ HANDLE CHANGE ID SERVICES HOTEL(select) --------------//
    const handleChangeId = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            id: e.target.value
        })
        setErrors(validateTwo({
            ...input_serv_hotel,
            id: e.target.value
        }))
    }


    //------------ HANDLE CHANGE NAME SERVICES HOTEL--------------//
    const handleName = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            name: e.target.value.toLowerCase().trim()
        })
        setErrors(validateTwo({
            ...input_serv_hotel,
            name: e.target.value
        }))
    }

    //------------ HANDLE CHANGE -----------------------//
    const handleChange = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            [e.target.name]: e.target.value
        })
        setErrors(validateTwo({
            ...input_serv_hotel,
            [e.target.name]: e.target.value
        }))
    }


    //----------------HANDLE SUBMIT SERVICES HOTEL------------------//
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input_serv_hotel && !Object.keys(errors).length && !Object.keys(error).length) {
            dispatch(modifyServicesHotels(input_serv_hotel))
            toast.success('Service modified successfully', { position: 'bottom-right' })
            setInput_hotel({
                idHotel: ''
            })
            setInput_serv_hotel({
                id: '',
                name: '',
                image: '',
                description: '',
            })
        } else {
            toast.error("Check the fields", { position: 'bottom-right' })
        }
    }


    return (
        <section class="d-flex justify-content-center align-items-center">
            <div class="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                <div class="mb-4 d-flex justify-content-start align-items-center">
                    <h1>Modify Hotel Services</h1>
                </div>

                <div class="mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-building"></i> Hotel Name</label>
                                <select class="form-select" value={input_hotel.idHotel} onChange={(e) =>
                                    handleChangeHotel(e)}>
                                    <option hidden selected>Select hotel</option>
                                    {hotels?.sort((a, b) => {
                                        if (a.name > b.name) return 1;
                                        if (a.name < b.name) return -1; return 0;
                                    }).map(e =>
                                        <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e =>
                                            `${e.state},${e.department},${e.city}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                                </select>
                                <div class="nombre text-danger ">
                                    {errors.idHotel && (<p>{error.idHotel}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-gear"></i> Current Service Name</label>
                                <select class="form-select" value={input_serv_hotel.id} onChange={(e) => handleChangeId(e)}>
                                    <option hidden selected>Select Service Name</option>
                                    {servicesHotelID?.sort((a, b) => {
                                        if (a.name > b.name) return 1;
                                        if (a.name < b.name) return -1; return 0;
                                    }).map(e =>
                                        <option key={e.name} value={e.id}>{e.name}</option>)}
                                </select>
                                <div class="nombre text-danger ">
                                    {errors.id && (<p>{errors.id}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-plus-circle"></i> Service Name</label>
                                <input type="text" class="form-control" placeholder="New service name..."
                                    value={input_serv_hotel.name} name="name" onChange={(e) => handleName(e)} />
                                <div class="nombre text-danger ">
                                    {errors.name && (<p>{errors.name}</p>)}
                                </div>
                            </div>
                        </div>


                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-images"></i> Image</label>
                                <input type="file" class="form-control" placeholder="Load URL Image..."
                                    value={input_serv_hotel.image} name="image" onChange={(e) => handleChange(e)} />
                                <div class="nombre text-danger ">
                                    {errors.image && (<p>{errors.image}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="mensaje"> <i class="bi bi-chat-left-dots" required></i> Description</label>
                            <textarea id="mensaje" class="form-control" placeholder="Description..." type="text"
                                value={input_serv_hotel.description} name="description" maxLength="1000"
                                onChange={(e) => handleChange(e)}></textarea>
                            <div class="mensaje text-danger">
                                {errors.description && (<p>{errors.description}</p>)}
                            </div>
                        </div>

                        <div class="mb-4">
                            {!input_hotel.idHotel || !input_serv_hotel.id || !input_serv_hotel.name ||
                                !input_serv_hotel.image || !input_serv_hotel.description || Object.keys(errors).length ||
                                Object.keys(error).length
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

export default ModifyServHotels;