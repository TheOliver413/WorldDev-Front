import React from "react";
import { Link } from "react-router-dom";
// import logo from '../../dataBase/it_world.png';
import Search from "../Search/Search";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
import FilterCategory from "../FilterCategory/FilterCategory";
import "./Styles.css";

export default function Nav() {
  return (
    <div >
      <nav class="navbar navbar-expand-md navbar-light bg-faded">
        <a class="navbar-brand d-md-none" href="#">Brand</a>
        <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-md-flex d-block w-100">
          <div class="collapse navbar-collapse mx-auto w-auto justify-content-center" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Filter />
                </li>
                <li class="nav-item">
                  <Order />
                </li>
                <li class="nav-item">
                  <FilterCategory />
                </li>
                <li class="nav-item">
                  <Search />
                </li>
                <li>
                  {/* <button type="button" class="btn btn-outline-primary" disabled>
                    Refresh<i class="bi bi-arrow-clockwise"></i>
                  </button> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}
