import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getHotels, orderBy } from '../../redux/action/action';
import { getCategory } from "../../redux/action/action";
import { setActualPage, setMinPageNumber, setMaxPageNumber } from "../../redux/action/action";

export default function Order() {
    const dispatch = useDispatch()
    const [order, setOrder] = useState('')
    const [orderCategory, setOrderCategory] = useState('')

    useEffect(() => {
        dispatch(getHotels())
    }, [dispatch])

    function handleSort(e) {
        e.preventDefault()
        dispatch(getCategory(e.target.value))
        dispatch(setActualPage(1))
        dispatch(setMinPageNumber(0))
        dispatch(setMaxPageNumber(5))
        setOrderCategory(`${e.target.value}`)
        if (e.target.value === 'all') {
            dispatch(getHotels())
        } else {
            dispatch(orderBy(e.target.value))
            setOrder(`Ordenado ${e.target.value}`)
        }
    }

    return (
        <div class="input-group ps-5" id="navbarSupportedContent">
            <select class="form-select form-select-lg mb-3" onChange={e => handleSort(e)}>

                <option value="" disabled>Order By... </option>
                <option value='all'>All Hotels</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>

                <option value="" disabled>    🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊</option>
                <option value="qualification asc">Category Ascending</option>
                <option value="qualification desc">Category Descending</option>
            </select>
        </div>
    )
}