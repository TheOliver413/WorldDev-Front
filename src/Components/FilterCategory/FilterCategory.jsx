import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getCategory } from "../../redux/action/action";
import { setActualPage, setMinPageNumber, setMaxPageNumber } from "../../redux/action/action";



export default function FilterCategory() {
    
    const dispatch= useDispatch();
    const [order, setOrder] = useState('')

    function handleCategory(e) {
        e.preventDefault() 
        dispatch(getCategory(e.target.value))
        dispatch(setActualPage(1))
        dispatch(setMinPageNumber(0))
        dispatch(setMaxPageNumber(5))
        setOrder(`${e.target.value}`)
    }

    return(
        <div class="input-group ps-5" id="navbarSupportedContent">
            <select class="form-select form-select-lg mb-3" onChange={handleCategory}>
                <option value="">Category...</option>
                <option value="qualification asc">Category Ascending</option>
                <option value="qualification desc">Category Descending</option>
            </select>
        </div>
    )
}

