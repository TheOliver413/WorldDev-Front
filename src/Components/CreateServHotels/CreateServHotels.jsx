import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createServicesHotels, getHotels } from "../../redux/action/action";
import { toast } from "react-toastify";

const validate = (input_serv_hotel) => {
    let errors = {};
    if (!input_serv_hotel.idHotel) errors.idHotel = 'Hotel name is required'
    if (!input_serv_hotel.name) errors.name = 'Service Name is required'
    if (!input_serv_hotel.image.length) errors.image = 'Upload at least one image'
    if (!input_serv_hotel.description) errors.description = 'Description is required'
    return errors;
}

const CreateServHotels = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(state => state.reducerHotel.hotels)

    const [input_serv_hotel, setInput_serv_hotel] = useState({
        idHotel: '',
        name: '',
        image: [],
        description: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        !hotels.length && dispatch(getHotels())
    }, [dispatch, hotels])


    //------------ HANDLE CHANGE NAME SERVICES HOTEL--------------//
    const handleName = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            [e.target.name]: e.target.value.toLowerCase()
        })
        setErrors(validate({
            ...input_serv_hotel,
            [e.target.name]: e.target.value
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
                setInput_serv_hotel({
                    ...input_serv_hotel,
                    image: [...input_serv_hotel.image, { url: result.info.url, public_id: result.info.public_id }]
                })
                setErrors(validate({
                    ...input_serv_hotel,
                    image: [...input_serv_hotel.image, { url: result.info.url, public_id: result.info.public_id }]
                }))
            }
        })
        myWidget.open()
    }
    //------------ HANDLE CHANGE DEMAS INPUT SERVICES HOTEL----------//
    const handleChange = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input_serv_hotel,
            [e.target.name]: e.target.value
        }))
    }

    //------------ HANDLE CHANGE HOTEL NAME----------//
    const handleChangeHotel = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            idHotel: e.target.value
        })
        setErrors(validate({
            ...input_serv_hotel,
            idHotel: e.target.value
        }))
    }


    //----------------HANDLE SUBMIT SERVICES HOTEL------------------//
    const handleSubmit = (e) => {
        e.preventDefault()
        if (input_serv_hotel && !Object.keys(errors).length) {
            dispatch(createServicesHotels(input_serv_hotel))
            toast.success('Service created successfully', { position: 'bottom-right' })
            setInput_serv_hotel({
                idHotel: '',
                name: '',
                image: [],
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
                    <h1>Services Hotels</h1>
                </div>

                <div class="mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-building"></i> Hotel Name</label>
                                <select class="form-select" value={input_serv_hotel.idHotel} onChange={(e) =>
                                    handleChangeHotel(e)}>
                                    <option hidden selected>Select hotel</option>
                                    {hotels?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map(e =>
                                        <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e =>
                                            `${e.state},${e.department}, ${e.city.toLowerCase()}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                                </select>
                                <div class="nombre text-danger ">
                                    {errors.idHotel && (<p>{errors.idHotel}</p>)}
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i class="bi bi-gear"></i> Service Name</label>
                                <input type="text" class="form-control" placeholder="Service name..."
                                    value={input_serv_hotel.name} name="name" onChange={(e) => handleName(e)} />
                                <div class="nombre text-danger ">
                                    {errors.name && (<p>{errors.name}</p>)}
                                </div>
                            </div>
                        </div>


                        <div class="mb-4">
                            <div>
                                <label for="nombre"> <i className="bi bi-image"></i> Image</label>
                                <button type="button" className="col-12 btn btn-primary d-flex justify-content-between" onClick={() => handleOpenWidget()}>Upload files . . .</button>
                                <div>
                                    <div>
                                        {input_serv_hotel.image?.map((imag) => (
                                            <div>
                                                <img src={imag.url} />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {errors.image && (<p>{errors.image}</p>)}
                                    </div>
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

                        <div class="mb-2">
                            {!input_serv_hotel.idHotel || !input_serv_hotel.name || !input_serv_hotel.image.length ||
                                !input_serv_hotel.description || Object.keys(errors).length
                                ? <button disabled type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Create </span><i id="icono" class="bi bi-cursor-fill "></i>
                                </button>
                                : <button type="submit" class="col-12 btn btn-primary d-flex justify-content-between">
                                    <span>Create </span><i id="icono" class="bi bi-cursor-fill "></i>
                                </button>}
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateServHotels;