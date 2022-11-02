import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Create/Styles.css';

export default function FormsSuperAdmin() {

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div>
              <Link to="../Admin/UserTable/"><button>User Table</button></Link>
              <Link to="../Admin/AdminTable"><button>Admin Table</button></Link>
              <Link to="/home/dashboard/ProfileAdmin"><button>Profile Administrator</button></Link>
              <Link to="/home/dashboard/RegisterAdmin"><button>Register Administrator</button></Link>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Hotels</h5>
              <p class="card-text">In this section you can create and/or modify a hotel by uploading its name, an image (drag the image or select one from a folder), choose the number of stars that corresponds, the exact address, location, state and a description of your services. </p>
              <Link to="/home/createHotels">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Create<i class="bi bi-plus-lg"></i>
                </button>
              </Link>

              <Link to="/home/modifyHotel">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Modify<i class="bi bi-plus-lg"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rooms</h5>
              <p class="card-text"> In this section you can create and/or modify a room that is associated with a hotel. you can put a name, choose the category, add an image (drag an image or load it from a folder), add services available in the room, quantity available, price and a description of it. </p>
              <Link to="/home/createRooms">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Create<i class="bi bi-plus-lg"></i>
                </button>
              </Link>

              <Link to="/home/modifyRooms">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Modify<i class="bi bi-plus-lg"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Services Hotels</h5>
              <p class="card-text"> In this section you can create and/or modify a service that will be associated with a hotel, you will be able to add a service name, load an image (by dragging it or loading it from a folder), as well as add a description about it. </p>
              <Link to="/home/createServHotels">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Create<i class="bi bi-plus-lg"></i>
                </button>
              </Link>

              <Link to="/home/modifyServHotels">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Modify<i class="bi bi-plus-lg"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Services Rooms</h5>
              <p class="card-text">In this section you can create and/or modify a service that will be associated with a room, you will be able to add a service name, load an image (by dragging it or loading it from a folder), as well as add a description about it.</p>
              <Link to="/home/createServRooms">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Create<i class="bi bi-plus-lg"></i>
                </button>
              </Link>

              <Link to="/home/modifyServRooms">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Modify<i class="bi bi-plus-lg"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Events</h5>
              <p class="card-text">In this section you can create and/or modify an event that will be associated with a hotel, you will be able to add an event name, add a date, add the time, upload an image (by dragging it or uploading it from a folder), and Make a description of the event in question.</p>
              <Link to="/home/createEvents">
                <button type="button" className="btn btn-primary btn-lg" disabled>
                  Create<i class="bi bi-plus-lg"></i>
                </button>
              </Link>

              <Link to="/home/modifyEvents">
                <button type="button" className="btn btn-primary btn-lg " disabled>
                  Modify<i class="bi bi-plus-lg"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}