import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFormAdmin,
  createUsers,
  getAllAdmins,
  modifyUsers,
} from "../../../redux/action/actionAuth";
import { getHotels } from "../../../redux/action/action";

const validate = (inputA) => {
  let errors = {};

  // if(!inputA.email) errors.email="The administrator's email is required";
  // if(!inputA.name) errors.name='Administrator name is required';
  // if(!inputA.lastname) errors.lastname="Enter admin last name";
  // if(!inputA.dateOfBirth) errors.dateOfBirth="Enter administrator date of birth";
  // if(!inputA.dni) errors.dni="Enter administrator ID"
  // if(!/^[0-9]+$/.test(inputA.dni)) errors.dni="Must contain only numbers"
  // if(!inputA.hotel) errors.hotel = 'Hotel name is required'
  // if(!inputA.address) errors.address = "Enter administrator address"
  // if(!inputA.city) errors.city= "Enter admin city"
  // if(!inputA.country) errors.country= "Enter administrator country"

  return errors;
};

const EditAdmin = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allAdmin = useSelector((state) => state.reducerAuth.allAdmins);
  const allHotels = useSelector((state) => state.reducerHotel.hotels);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const [inputA, setInputA] = useState({
    email: "",
    name: "",
    lastname: "",
    rol: "admin",
    dateOfBirth: "",
    dni: "",
    hotel: "",
    address: "",
    city: "",
    country: "",
    create: true,
    id: "",
  });

  const idAdmin = inputA.email
    ? allAdmin
        ?.filter((e) => e.email === inputA.email)
        .map((el) => el.id)
        .toString()
    : null;

  if (idAdmin) setInputA({ id: idAdmin });

  function refreshPage() {
    window.location.reload();
    setTimeout(() => {
      window.location.reload(false);
    }, 50);
    // console.log("page to reload");
  }

  useEffect(() => {
    dispatch(getAllAdmins());
    if (user && user.hasOwnProperty("uid")) {
      setInputA({
        ...inputA,
        // id: user.uid,
        // email: user.email
      });
    }
  }, [user]);

  function handleChangeData(e) {
    e.preventDefault();
    setInputA({
      ...inputA,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...inputA,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSelect = (e) => {
    setInputA({
      ...inputA,
      hotel: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...inputA,
        [e.target.name]: e.target.value,
      })
    );
    if (inputA.create === true) {
      dispatch(modifyUsers(inputA));
      dispatch(cleanFormAdmin());
      navigate("/profileSuperAdmin/adminTable");
      refreshPage();
    } else {
      dispatch(createUsers(inputA));
      dispatch(cleanFormAdmin());
      navigate("/profileSuperAdmin/adminTable");
      refreshPage();
    }
    // console.log("holis", inputA);
    // console.log("holiiiiiis", allAdmin);
  };

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="profileUser-container d-flex flex-column gap-0 w-75 mx-auto my-4 card p-4 p-md-5" style={{ maxWidth: "600px" }}>
        <h1>Edit Admin Profile</h1>
        <div className="my-2">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            value={inputA.email}
            name="email"
            placeholder="Email"
            onChange={handleChangeData}
          />
          {errors.email ? <h4>{errors.email}</h4> : false}
        </div>
        <div className="my-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={inputA.name}
            name="name"
            placeholder="Name"
            onChange={handleChangeData}
          />
          {errors.name ? <h4>{errors.name}</h4> : false}
        </div>
        <div className="my-2">
          <label>Lastname</label>
          <input
            type="text"
            className="form-control"
            id="inputLastname"
            value={inputA.lastname}
            name="lastname"
            placeholder="Lastname"
            onChange={handleChangeData}
          />
          {errors.lastname ? <h4>{errors.lastname}</h4> : false}
        </div>
        <div className="my-2">
          <label>Birthday</label>
          <input
            type="date"
            className="form-control"
            id="inputBirth"
            value={inputA.dateOfBirth}
            name="dateOfBirth"
            placeholder="Date of birthday"
            onChange={handleChangeData}
          />
          {errors.dateOfBirth ? <h4>{errors.dateOfBirth}</h4> : false}
        </div>
        <div className="my-2">
          <label>DNI</label>
          <input
            type="text"
            className="form-control"
            id="inputDNI"
            value={inputA.dni}
            name="dni"
            placeholder="DNI"
            onChange={handleChangeData}
          />
          {errors.dni ? <h4>{errors.dni}</h4> : false}
        </div>
        <div className="my-2">
          <label>Hotel</label>
          <select className="form-select" onChange={(e) => handleSelect(e)} value={inputA.hotel}>
            <option hidden>--select hotel--</option>
            {allHotels.map((h) => (
              <option value={h.name} key={h.name}>
                {h.name}
              </option>
            ))}
          </select>
          {errors.hotel ? <h4>{errors.hotel}</h4> : false}
        </div>
        <div className="my-2">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={inputA.address}
            name="address"
            placeholder="1234 Main St"
            onChange={handleChangeData}
          />
          {errors.address ? <h4>{errors.address}</h4> : false}
        </div>
        <div className="my-2">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={inputA.city}
            name="city"
            placeholder="City..."
            onChange={handleChangeData}
          />
          {errors.city ? <h4>{errors.city}</h4> : false}
        </div>
        <div className="my-2">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={inputA.country}
            name="country"
            placeholder="Country..."
            onChange={handleChangeData}
          />
          {errors.country ? <h4>{errors.country}</h4> : false}
        </div>
        <div className="d-flex flex-column gap-2 mt-3">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditAdmin;
