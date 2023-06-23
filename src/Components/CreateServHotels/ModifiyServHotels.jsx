import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { modifyServicesHotels, getHotels, getServicesHotel, getServicesHotelById, clearServiceId } from "../../redux/action/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";

const validate = (input_hotel) => {
    let error = {};
    if (!input_hotel.idHotel) error.idHotel = 'Hotel name is required'
    return error;
}
const validateTwo = (input_serv_hotel) => {
    let errors = {}
    if (!input_serv_hotel.id) errors.id = 'Select Service Name'
    if (!input_serv_hotel.name) errors.name = 'Service Name is required'
    if (!input_serv_hotel.image.length) errors.image = 'Upload at least one image'
    if (!input_serv_hotel.description) errors.description = 'Description is required'
    return errors;
}


const ModifyServHotels = () => {
    const dispatch = useDispatch();
    const hotels = useSelector(state => state.reducerHotel.hotels)
    const servicesHotelID = useSelector(state => state.reducerHotel.onlyServicesHotel)//todos los servicios de ese hotel
    const serviceId = useSelector(state => state.reducerHotel.serviceId)//solo ese servicio

    const [input_hotel, setInput_hotel] = useState({
        idHotel: ''
    })

    const [input_serv_hotel, setInput_serv_hotel] = useState({
        id: '',
        name: '',
        image: [],
        description: '',
    })

    const [error, setError] = useState({})
    const [errors, setErrors] = useState({})


    useEffect(() => {
        !hotels.length && dispatch(getHotels())
    }, [dispatch, hotels])

    //component will unmount
    useEffect(() => {
        return () => dispatch(clearServiceId())
    }, [dispatch])

    //-------------------------------------------------
    const datos = useSelector((state) => state.reducerAuth.users);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.uid) dispatch(getDetailUser(user.uid));
    }, [dispatch, user]);

    useEffect(() => {
        if (datos && datos.rol === "admin") {
            let hotelFinded = hotels.find(e => e.name === datos.hotel)

            setInput_hotel({
                ...input_hotel,
                idHotel: hotelFinded.id
            })
            dispatch(getServicesHotel(hotelFinded.id))
        }

    }, [dispatch, datos])

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

    const onHandleDeleteimage = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            image: input_serv_hotel.image.filter(el => el.public_id !== e.target.value)
        })
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
        dispatch(getServicesHotelById(e.target.value))
    }


    //------------ HANDLE CHANGE NAME SERVICES HOTEL--------------//
    const handleName = (e) => {
        e.preventDefault();
        setInput_serv_hotel({
            ...input_serv_hotel,
            name: e.target.value.toLowerCase()
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
    const navigate = useNavigate()
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
                image: [],
                description: '',
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
                datos.rol === 'superAdmin' || datos.rol === 'admin' ?
                    <section className="d-flex justify-content-center align-items-center">
                        <div className="card shadow col-xs-12 col-sm-6 col-md-6 col-lg-3   p-4">
                            <div className="mb-4 d-flex justify-content-start align-items-center">
                                <h1>Modify Hotel Services</h1>
                            </div>

                            <div className="mb-4">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="mb-4">
                                        <div>
                                            <label for="nombre"> <i className="bi bi-building"></i> Hotel Name</label>
                                            {datos && datos.rol === "superAdmin" ?
                                                <select className="form-select" name='idHotel' value={input_hotel.idHotel} onChange={(e) =>
                                                    handleChangeHotel(e)}>
                                                    <option hidden selected>Select hotel</option>
                                                    {hotels?.sort((a, b) => {
                                                        if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                                        if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                                                        return 0;
                                                    }).map(e =>
                                                        <option key={e.id} value={e.id}>{`${e.name}, ${(e.Locations).map(e =>
                                                            `${e.state},${e.department},${e.city.toLowerCase()}`)}`}</option>)} {/*mapeo el nombre de los
                                    hoteles*/}
                                                </select> :
                                                <option disabled value={datos.id}> {datos.hotel} </option>}
                                            <div className="nombre text-danger ">
                                                <div>
                                                    {error.idHotel && (<p>{error.idHotel}</p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div>
                                            <label for="nombre"> <i className="bi bi-gear"></i> Current Service Name</label>
                                            <select className="form-select" value={input_serv_hotel.id} onChange={(e) => handleChangeId(e)}>
                                                <option hidden selected>Select Service Name</option>
                                                {servicesHotelID?.sort((a, b) => {
                                                    if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                                    if (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                                                    return 0;
                                                }).map(e =>
                                                    <option key={e.name} value={e.id}>{e.name.toLowerCase()}</option>)}
                                            </select>
                                            <div className="nombre text-danger ">
                                                {errors.id && (<p>{errors.id}</p>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div>
                                            <label for="nombre"> <i className="bi bi-plus-circle"></i> Service Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="New service name..."
                                                defaultValue={input_serv_hotel.name || serviceId.name}
                                                name="name"
                                                onChange={(e) => handleName(e)} />
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
                                                    {input_serv_hotel.image?.map((imag) => (
                                                        <div key={imag.public_id}>
                                                            <img src={imag.url} alt='images servHotel' /><button className="btn btn-outline-danger mt-2" value={imag.public_id} onClick={(e) => onHandleDeleteimage(e)}>x</button>
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
                                        <label for="mensaje"> <i className="bi bi-chat-left-dots" required></i> Description</label>
                                        <textarea
                                            id="mensaje"
                                            className="form-control"
                                            placeholder="Description"
                                            type="text"
                                            defaultValue={input_serv_hotel.description || serviceId.description} name="description" maxLength="1000"
                                            onChange={(e) => handleChange(e)}></textarea>
                                        <div className="mensaje text-danger">
                                            {errors.description && (<p>{errors.description}</p>)}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        {!input_hotel.idHotel || !input_serv_hotel.id || !input_serv_hotel.name ||
                                            !input_serv_hotel.image.length || !input_serv_hotel.description || Object.keys(errors).length ||
                                            Object.keys(error).length
                                            ? <button disabled type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                                <span>Modify</span><i id="icono" className="bi bi-cursor-fill "></i>
                                            </button>
                                            : <button type="submit" className="col-12 btn btn-primary d-flex justify-content-between">
                                                <span>Modify</span><i id="icono" className="bi bi-cursor-fill "></i>
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

export default ModifyServHotels;