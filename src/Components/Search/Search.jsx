import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hotelByName, setActualPage } from '../../redux/action/action';
import './Search.css'

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
    if (!name.trim()) return
    dispatch(hotelByName(name.trim()));
    setName('')
  }

  return (
    <form className='search'>
      <input className='search-input' value={name} onChange={handleInputChange} type='search' placeholder='Search hotel...' />
      <button className='search-btn' onClick={handleSubmit} type='submit' aria-label="search"></button>
    </form>
  )
}