import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import logo from "./world-developers.png";
import suitcase from './suitcase.svg'
import "./Styles.css";

export default function Nav() {
  const roomsSelected = useSelector(state => state.reducerCart.roomsSelected)

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
            <li className="nav-cart-container nav-item">
              <img className="mx-3" src={suitcase} alt='Shopping Cart' />
              <span className="nav-cart-itemsSelected">{roomsSelected}</span>
            </li>

            <button type="button" className="btn btn-outline-primary ms-4" disabled>
              LOG IN
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
