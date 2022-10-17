import React from "react";
import { Link } from "react-router-dom";
// import logo from '../../dataBase/it_world.png';
import logo from "./world-developers.png";
// import Search from "../Search/Search";
// import Order from "../Order/Order";
// import Filter from "../Filter/Filter";
// import FilterCategory from "../FilterCategory/FilterCategory";
// import Search from "../Search/Search";
import "./Styles.css";

export default function Nav() {
  return (
    <nav className="nav-container navbar navbar-expand-lg sticky-top">
      <div className="container-fluid container-nav">
        <Link className="navbar-brand d-flex justify-content-start align-items-center" to="/">
          <img className="navbar-logo" src={logo} alt="World Developers logo" />
          <div className="text-start">
            <h6 className="mb-0">WORLD DEVELOPERS</h6>
            <small className="fs-6">Work & Relax</small>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toogle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="mx-auto"></div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home">
                HOTELS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="#">
                EVENTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/home/dashboard">
                CREATE
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/favorite">
                FAVORITES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="#">
                ABOUT US
              </Link>
            </li>

            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group">
                <button type="button" className="btn btn-outline-primary" disabled>
                  <i className="bi bi-bag-fill"></i>
                </button>
                <button type="button" className="btn btn-outline-primary" disabled>
                  LOG IN
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
