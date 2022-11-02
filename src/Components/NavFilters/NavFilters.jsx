import React from "react";
import Search from "../Search/Search";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
import './NavFilters.css'
import FilterCategory from "../FilterCategory/FilterCategory";

export default function Nav() {
  return (
    <div className="navfilters-container ">
      <Search />
      <div className="navfilters-order-filter d-flex justify-content-between align-items-center">
        <Order />
        <FilterCategory/>
        <Filter />
      </div>
    </div>
  )
}
