import React from "react";
import Search from "../Search/Search";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
/* import FilterCategory from "../FilterCategory/FilterCategory"; */

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-light w-100 pt-4">
      <span className="navbar-brand d-md-none">Brand</span>
      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="d-md-flex d-block w-100">
        <div className="collapse navbar-collapse mx-auto w-auto justify-content-center" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Filter />
              </li>
              <li className="nav-item">
                <Order />
              </li>
              {/* <li className="nav-item">
                <FilterCategory />
              </li> */}
              <li className="nav-item">
                <Search />
              </li>
              <li>
              {/* <button type="button" className="btn btn-outline-primary" disabled>
                Refresh<i className="bi bi-arrow-clockwise"></i>
              </button> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
