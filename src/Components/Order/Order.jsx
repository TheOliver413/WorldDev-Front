import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getHotels, orderBy } from '../../redux/action/action';
import { Link } from "react-router-dom"


export default function Order() {
    const dispatch = useDispatch()
    const [order, setOrder] = useState('')

    useEffect(() => {
        dispatch(getHotels())
    }, [dispatch])

    function handleSort(e) {
        e.preventDefault()
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
                <option value="">Order By... </option>
                <option value='all'>All Hotels</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
    )
}
