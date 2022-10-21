import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import logo from "./world-developers.png";
import suitcase from './suitcase.svg'
import "./Styles.css";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const cartTotalQuantity = useSelector(state => state.reducerCart.cartTotalQuantity)

  const { logout, user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <h1>loading...</h1>

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
          className="navbar-toggler border-0 shadow-none"
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

            {
              user ?
                <>
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
                </>
                : null
            }

            <li className="nav-item">
              <Link className="nav-link text-dark" to="#">
                ABOUT US
              </Link>
            </li>
            <li className="nav-cart-container nav-item">
              <Link to="/cart">
                <img className="mx-3" src={suitcase} alt='Shopping Cart' />
                <span className="nav-cart-itemsSelected">{cartTotalQuantity}</span>
              </Link>
            </li>

            {
              (!user) ?
                <button type="button" className="btn btn-outline-primary">
                  <Link to='/login'>
                    LOG IN
                  </Link>
                </button> : null
            }

            {
              user ?
                <button type="button" className="btn btn-outline-primary">
                  <Link to='/' onClick={handleLogout}>
                    LOG OUT
                  </Link>
                </button> : null
            }

            {
              user ?
                <div>
                  <Link to='/profileusers' >
                    <img src={user.photoURL ? user.photoURL : "https://www.clarkstontolldentalpractice.com/wp-content/uploads/2020/06/default-img-2-1.jpg"} class="img-circle" alt="Cinque Terre" width="50" height="50"></img>
                  </Link>
                  <small className="fs-6">{user.displayName ? user.displayName : user.email}</small>
                </div> : null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
