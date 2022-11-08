import React, { useState } from "react";
import Search from "../Search/Search";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
import './NavFilters.css'
import FilterCategory from "../FilterCategory/FilterCategory";
import { getHotels } from "../../redux/action/action";
import { useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState('DEFAULT')
  const handleClearFilter = () => {
    dispatch(getHotels())
    setSelectValue('DEFAULT')
  }
  
  return (
    <div className="navfilters-container d-flex flex-column flex-lg-row justify-content-lg-between align-items-center gap-1">
      <Search />
      <div className="navfilters-order-filter d-flex flex-column flex-md-row justify-content-between justify-content-md-center align-items-center gap-1">
        <div className="order-md-1 d-flex justify-content-between align-items-center gap-1">
          <FilterCategory/>
          <Filter />
        </div>
        <button onClick={handleClearFilter} className='navfilters-clear-btn order-md-2 filter-btn btn' type='button'>Clear filters</button>
        <Order selectValue={selectValue} setSelectValue={setSelectValue} />
      </div>
    </div>
  )
}
