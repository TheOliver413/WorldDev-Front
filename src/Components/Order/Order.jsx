//---------------IMPORTS---------------//
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
            // setPages(0)
            setOrder(`Ordenado ${e.target.value}`)
        }
    }

    return (
        <div class="input-group ps-5" id="navbarSupportedContent">
            <select class="form-control " onChange={e => handleSort(e)}>
                <option value="">Order By...</option>
                <option value='all'>All Hotels</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="qualification asc">Qualification Ascending</option>
                <option value="qualification desc">Qualification Descending</option>
            </select>
            <div>
                <a href="/home">
                    <button type='search' class="btn btn-outline-primary">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                </a>
            </div>
        </div>
    )
}