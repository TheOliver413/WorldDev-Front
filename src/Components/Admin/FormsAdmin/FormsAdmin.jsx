import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FormsAdmin() {

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <Link to='/profileAdmin'>
              <button>Back</button>
            </Link>
            <div class="card-body">
              <h5 class="card-title">Hotels</h5>
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quod deserunt autem cum at distinctio, minus repellendus tempore possimus consequuntur, excepturi explicabo molestiae ex eligendi! Magnam quae deleniti excepturi cum?</p>
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
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
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
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
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
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
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
              <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda obcaecati repellat hic ad blanditiis iure, perspiciatis est et sequi fugit pariatur nihil, non ex rem illo eveniet mollitia magnam quidem?</p>
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