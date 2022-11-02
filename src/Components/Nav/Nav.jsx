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
              <div className="nav-user-container d-flex flex-column align-items-end ms-4" onClick={handleUserMenuToggle} style={{ maxWidth: "600px" }}>
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M19.7882 10.312L19.258 10.8423L18.1974 11.9028L8.57723 21.5227C8.26751 21.8324 7.8827 22.0624 7.46035 22.1844L1.44423 23.9535C1.05004 24.0708 0.622998 23.9629 0.332047 23.6672C0.0410958 23.3716 -0.0715306 22.954 0.0457885 22.5551L1.81496 16.5438C1.93697 16.1215 2.16692 15.7367 2.47664 15.427L12.0968 5.80712L13.1574 4.74659L13.6877 4.21632L15.2785 5.80712L18.1927 8.72124L19.7836 10.312H19.7882ZM4.50391 16.5814L4.06749 17.0178C4.02525 17.06 3.9924 17.1163 3.97363 17.1773L2.78636 21.213L6.82214 20.0258C6.88314 20.007 6.93946 19.9741 6.98169 19.9319L7.41812 19.4955H5.25476C4.84179 19.4955 4.50391 19.1576 4.50391 18.7447V16.5814ZM21.2712 0.879867L23.1201 2.72876C24.2933 3.90192 24.2933 5.80243 23.1201 6.97558L22.4397 7.65601L21.3791 8.71655L20.8488 9.24681L19.258 7.65601L16.3438 4.74189L14.7482 3.1511L15.2785 2.62083L16.3391 1.5603L17.0195 0.879867C18.1927 -0.293289 20.0933 -0.293289 21.2665 0.879867H21.2712Z" fill="#201200"/>
                    </svg>
                  }
                  alt="Profile pic"
                />
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