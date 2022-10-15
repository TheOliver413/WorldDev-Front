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
        <input type="search" class="form-control " placeholder='Search hotel ...' onChange={ handleInputChange}value={name}/>
      </div>
      <button type='search' onClick={handleSubmit} class="btn btn-outline-primary">
        <i class="bi bi-search"></i>
      </button>
    </div>
  )
}