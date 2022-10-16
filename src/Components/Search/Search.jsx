
//---------------IMPORTS---------------//
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hotelByName, setActualPage } from '../../redux/action/action';

export default function Search() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    dispatch(hotelByName(name))
    dispatch(setActualPage(1))
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(hotelByName(name));
    setName('')
  }

  return (
    <div class="input-group ps-5" id="navbarSupportedContent">
      <div id="navbar-search-autocomplete" class="form-outline">
        <input type="search" class="form-control " placeholder='Search hotel ...' name='search' onChange={ handleInputChange}/>
      </div>
      <button type='search' onClick={handleSubmit} class="btn btn-outline-primary">
        <i class="bi bi-search"></i>
      </button>
    </div>
  )
}