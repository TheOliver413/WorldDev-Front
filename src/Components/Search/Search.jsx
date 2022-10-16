//---------------IMPORTS---------------//
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hotelByName } from '../../redux/action/action';
//import "./Styles.css";

//--------------FUNCTION-----------------//
/* export default function Search() {
  const dispatch=useDispatch();

  const [name, setName]=useState('');

  const handleInputChange=(e)=>{
    e.preventDefault();
    setName(e.target.value);
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(hotelByName(name))
    setName('');
  } */

//----------------RETURN------------------//
/*  return (
   <div>
     <input type='text' placeholder='Search hotel...' onChange={handleInputChange} />
     <button type="submit" onClick={handleSubmit}>Search</button>
   </div>
 );
} */

export default function Search() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    dispatch(hotelByName(name));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(hotelByName(name));

  }
  return (
    <div class="input-group ps-5" id="navbarSupportedContent">
      <div id="navbar-search-autocomplete" class="form-outline">
        <div class="input-group mb-3">
          <input type="text" class="form-control-lg" placeholder='Search hotel ...' onChange={handleInputChange} value={name} />
          <button class="btn btn-outline-primary" onClick={handleSubmit} type="submit"><i class="bi bi-search"></i></button>
        </div>
      </div>
    </div >
  )
}