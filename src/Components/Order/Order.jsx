import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { orderBy, getCategory, setActualPage, setMinPageNumber, setMaxPageNumber } from "../../redux/action/action";
import './Order.css'

export default function Order() {
  const dispatch = useDispatch()
  const [, setOrder] = useState('')
  const [, setOrderCategory] = useState('')

  function handleSort(e) {
    dispatch(getCategory(e.target.value))
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    setOrderCategory(`${e.target.value}`)
    dispatch(orderBy(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
  }

  return (
    <div className="order-container">
      <select className="form-select form-select-lg border-primary" onChange={handleSort} defaultValue='DEFAULT'>
        <option className='color' value="DEFAULT" disabled>Select-</option>
        <option className='color' value="A-Z">Name (A-Z)</option>
        <option className='color' value="Z-A">Name (Z-A)</option>
        <option className='color' value="qualification asc">Lowest score</option>
        <option className='color' value="qualification desc">Highest score</option>
      </select>
      <span>Sort by</span>
    </div>
  )
}