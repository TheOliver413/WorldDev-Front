import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDetailUser } from "../../redux/action/actionAuth";
import "./Styles.css"

export default function FormsSuperAdmin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()

  const datosTotal = useSelector(state => state.reducerAuth.users)

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [user])

  return (
    <div>
      {
        datosTotal.rol === 'superAdmin' ?
          <div className="container">
            <Link to='/profileSuperAdmin'>
              <button className="btn btn-primary mt-1" type="button">Back</button>
            </Link>
            <div className="row">
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Hotels</h5>
                    <p className="card-text">In this section you can create and/or modify a hotel by uploading its name, an image (drag the image or select one from a folder), choose the number of stars that corresponds, the exact address, location, state and a description of your services. </p>
                    <Link to="/home/createHotels">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyHotel">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Modify<i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rooms</h5>
                    <p className="card-text"> In this section you can create and/or modify a room that is associated with a hotel. you can put a name, choose the category, add an image (drag an image or load it from a folder), add services available in the room, quantity available, price and a description of it. </p>
                    <Link to="/home/createRooms">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyRooms">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Modify<i className="bbi bi-pencil"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Services Hotels</h5>
                    <p className="card-text"> In this section you can create and/or modify a service that will be associated with a hotel, you will be able to add a service name, load an image (by dragging it or loading it from a folder), as well as add a description about it. </p>
                    <Link to="/home/createServHotels">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyServHotels">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Modify<i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Services Rooms</h5>
                    <p className="card-text">In this section you can create and/or modify a service that will be associated with a room, you will be able to add a service name, load an image (by dragging it or loading it from a folder), as well as add a description about it.</p>
                    <Link to="/home/createServRooms">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyServRooms">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Modify<i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Events</h5>
                    <p className="card-text">In this section you can create and/or modify an event that will be associated with a hotel, you will be able to add an event name, add a date, add the time, upload an image (by dragging it or uploading it from a folder), and Make a description of the event in question.</p>
                    <Link to="/home/createEvents">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyEvents">
                      <button type="button" className="btn btn-secondary btn-lg radio" disabled>
                        Modify<i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}