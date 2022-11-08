import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { orderBy, getCategory, setActualPage, setMinPageNumber, setMaxPageNumber } from "../../redux/action/action";
import './Order.css'

export default function Order({ selectValue, setSelectValue }) {
  const dispatch = useDispatch()
  const [, setOrder] = useState('')
  const [, setOrderCategory] = useState('')

  function handleSort(e) {
    setSelectValue(e.target.value)
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
      <span>Sort by:</span>
      <select onChange={handleSort} defaultValue={selectValue} value={selectValue}>
        <option value="DEFAULT" disabled>-select sort-</option>
        <option value="A-Z">Name (A-Z)</option>
        <option value="Z-A">Name (Z-A)</option>
        <option value="qualification asc">Lowest score</option>
        <option value="qualification desc">Highest score</option>
      </select>
    </div>
  )
}