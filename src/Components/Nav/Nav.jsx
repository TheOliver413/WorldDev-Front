import React from "react";
import { Link } from "react-router-dom";
// import logo from '../../dataBase/it_world.png';
import logo from "./world-developers.png";
import Search from "../Search/Search";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
import FilterCategory from "../FilterCategory/FilterCategory";

// import Search from "../Search/Search";
import "./Styles.css";

export default function Nav() {
  return (
    <nav class="navbar navbar-expand-lg bg-light fixed-top">
      <div class="container-fluid container-nav">
        <Link class="navbar-brand" to="/">
          <img className="navbar-logo d-inline-block " src={logo} alt="" />
          <span className="">WORLD DEVELOPERS</span>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toogle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="mx-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link text-dark" to="/">
                HOME
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-dark" to="/home">
                HOTELS
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-dark" to="#">
                EVENTS
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-dark" to="/home/dashboard">
                CREATE
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-dark" to="/favorite">
                FAVORITES
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link text-dark" to="#">
                ABOUT US
              </Link>
            </li>

            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary" disabled>
                  <i class="bi bi-bag-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-primary" disabled>
                  LOG IN
                </button>
              </div>
            </div>




            {/* <li class="nav-item">
              <Search />
            </li>
            <li class="nav-item">
              <Order />
            </li>
            <li class="nav-item">
              <Filter />
            </li>
            <div>
                <a href="/home">
                    <button type='search' class="btn btn-outline-primary">
                        Refresh<i class="bi bi-arrow-clockwise"></i>
                    </button>
                </a>
            </div>
            <li class="nav-item">
              <FilterCategory />
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
