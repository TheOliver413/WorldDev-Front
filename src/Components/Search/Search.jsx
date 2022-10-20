import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hotelByName, setActualPage } from '../../redux/action/action';

export default function Search() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    dispatch(hotelByName(e.target.value))
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
        <div class="input-group mb-3">

          <input  type="text" class="form-control-lg" placeholder='Search hotel ...' onChange={handleInputChange} value={name} />
          {/* {errors.name && (
                        <p className="error">{errors.name}</p>
                    )} */}
          {name.length?
          <button class="btn btn-outline-primary" onClick={handleSubmit} type="submit"><i class="bi bi-search"></i></button>:<button disabled  type="submit" class="btn btn-outline-primary" onClick={handleSubmit}><i class="bi bi-search"></i></button>}
        </div>
      </div>
    </div >
  )
}