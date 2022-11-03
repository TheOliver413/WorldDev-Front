import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import logo from "./world-developers.png";
import suitcase from "./suitcase.svg";
import "./Styles.css";
import { useAuth } from "../../context/AuthContext";
import { clearCart } from "../../redux/action/cartAction";
import { getDetailUser } from "../../redux/action/actionAuth";
import '../Authentication/ProfileUsers/ProfileUsers.css';

export default function Nav() {
  const cartTotalQuantity = useSelector(
    (state) => state.reducerCart.cartTotalQuantity
  );

  const { logout, user, loading } = useAuth();

  const navigate = useNavigate()
  const dispatch = useDispatch()




  const datosTotal= useSelector(state => state.reducerAuth.users)

  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      dispatch(getDetailUser(user.uid))
    }
   }, [user])




  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearCart())
      setUserMenuVisibility(!userMenuVisibility)
      navigate('/')
    } catch (error) {
      console.error(error.message);
    }
  };

  const [userMenuVisibility, setUserMenuVisibility] = useState(false)
  const handleUserMenuToggle = () => setUserMenuVisibility(!userMenuVisibility)

  if (loading) return <h1>loading...</h1>;
  
  return (
    <nav className="nav-container navbar navbar-expand-lg sticky-top">
      <div className="container-fluid container-nav">
        <Link
          className="navbar-brand d-flex justify-content-start align-items-center"
          to="/"
        >
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
          <ul className="navbar-nav d-flex align-items-center">
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
              <Link className="nav-link text-dark" to="/home/Events">
                EVENTS
              </Link>
            </li>

            {/* {user && (
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
            )} */}

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                ABOUT US
              </Link>
            </li>
            <li className="nav-cart-container nav-item">
              <Link to="/cart">
                <img className="mx-3" src={suitcase} alt="Shopping Cart" />
                <span className="nav-cart-itemsSelected">
                  {cartTotalQuantity}
                </span>
              </Link>
            </li>

            {!user ? (
              <button className="nav-log-btn ms-4" onClick={() => navigate('/login')} type="button">
                LOG IN
              </button>
            ) : (
              <div className="nav-user-container d-flex flex-column align-items-center ms-4" onClick={handleUserMenuToggle}>

                {
                  user.photoURL
                  ? <img src={user?.photoURL} alt="Profile pic"></img>
                  : <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.4062 36.0188C35.3344 32.4188 31.4438 30 27 30H21C16.5562 30 12.6656 32.4188 10.5938 36.0188C13.8938 39.6938 18.675 42 24 42C29.325 42 34.1063 39.6844 37.4062 36.0188ZM48 24C48 37.2562 37.2562 48 24 48C10.7438 48 0 37.2562 0 24C0 10.7438 10.7438 0 24 0C37.2562 0 48 10.7438 48 24ZM24 25.5C27.7313 25.5 30.75 22.4813 30.75 18.75C30.75 15.0188 27.7313 12 24 12C20.2687 12 17.25 15.0188 17.25 18.75C17.25 22.4813 20.2687 25.5 24 25.5Z" fill="#56A5AF"/>
                  </svg>
                }
                <small>
                  {user.displayName ? user.displayName : user.email}
                </small>
              </div>
            )}

            {userMenuVisibility && (
              <div className="nav-usermenu-bg">
                    {
                      datosTotal.rol==='user'?
                      <Link onClick={handleUserMenuToggle} to="/profileusers">See profile</Link>:null
                    }
                    {
                      datosTotal.rol==='admin' ?
                      <Link onClick={handleUserMenuToggle} to="/profileAdmin">See profile</Link>:null
                    }
                    {
                      datosTotal.rol==='superAdmin'?
                      <Link onClick={handleUserMenuToggle} to="/profileSuperAdmin">See profile</Link>:null
                    }
              
                <hr />
                <button className="nav-log-btn" onClick={handleLogout} type="button">
                  Log out
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}