import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from "../../../redux/action/actionAuth";

export default function FormsAdmin() {
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
        datosTotal.rol === 'admin' ?
          <div className="container">
            <div className="row">
              <div>
                <Link to='/profileAdmin'>
                  <button className="btn btn-primary mt-1" type="button">Back</button>
                </Link>
              </div>
              <div className="col-sm-6">
                <div className="card">

                  <div className="card-body">
                    <h5 className="card-title">Hotels</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quod deserunt autem cum at distinctio, minus repellendus tempore possimus consequuntur, excepturi explicabo molestiae ex eligendi! Magnam quae deleniti excepturi cum?</p>
                    <Link to="/home/modifyHotel">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Modify<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rooms</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
                    <Link to="/home/createRooms">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyRooms">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Modify<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Services Hotels</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
                    <Link to="/home/createServHotels">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyServHotels">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Modify<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Services Rooms</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
                    <Link to="/home/createServRooms">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyServRooms">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Modify<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Events</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
                    <Link to="/home/createEvents">
                      <button type="button" className="btn btn-primary btn-lg" disabled>
                        Create<i className="bi bi-plus-lg"></i>
                      </button>
                    </Link>

                    <Link to="/home/modifyEvents">
                      <button type="button" className="btn btn-primary btn-lg " disabled>
                        Modify<i className="bi bi-plus-lg"></i>
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