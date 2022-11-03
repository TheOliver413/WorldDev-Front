import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';

import sendEmail from '../emails/sendOfferts';
function Footer() {

  function submitHandler(e) {
    e.preventDefault();
    let correo = e.target.correo.value;
    sendEmail(correo);
    document.getElementById("correo").value = "";
  }

  return (
    <footer>
      <div className="py-6 bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h6 className="fw-bold text-uppercase text-heading mb-3">about World Developers</h6>
              <p>
                We are a platform where you can publish your hotel, manage and achieve great results because we have an important diffusion in the market. You can also publish events that take place in your rooms and get the client to have many additional services and increase their stay at the hotel.
              </p>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link to='' className='text-reset'><i className="bi bi-youtube"></i></Link>
                </li>

                <li className="list-inline-item">
                  <Link to='' className='text-reset'><i className="bi bi-twitter"></i></Link>
                </li>

                <li className="list-inline-item">
                  <Link to='' className='text-reset'><i className="bi bi-facebook"></i></Link>
                </li>

                <li className="list-inline-item">
                  <Link to='' className='text-reset'><i className="bi bi-instagram"></i></Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 className="fw-bold text-uppercase text-heading mb-3">Contact</h6>
              <ul className="list-unstyled">
                <li className='text-para'>World Developers.</li>
                <li className='text-para'>worlddevd@gmail.com</li>
                <li className='text-para'>+54 5436286345.</li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-5 mb-lg-0 ">
              <h6 className="fw-bold text-uppercase text-heading mb-3">Pages</h6>
              <ul className="list-unstyled">
                <li><Link to='/' className='text-para'><i className="bi bi-house-door"></i> Home</Link></li>
                <li><Link to='/home' className='text-para'><i className="bi bi-building"></i> Hotels</Link></li>
                <li><Link to='/home/Events' className='text-para'><i className="bi bi-calendar-check"></i> Evenst</Link></li>
                <li><Link to='/about' className='text-para'><i className="bi bi-info-circle"></i> About Us</Link> </li>
              </ul>
            </div>



            <div className="col-lg-4">
              <h6 className="fw-bold text-uppercase text-heading mb-3">Daily Offers & Discon</h6>
              <p className="mb-3">Receive Our Offers In Your Email</p>
              <form onSubmit={submitHandler}>
                <div className="input-group mb-3">
                  <input type="email" name='correo' id='correo' className="form-control bg-transparent border-dark border-end-0" placeholder="Your Email"
                    aria-label="Your Email" />
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark border-dark border-start-0" type="submit"><i
                      className="bi bi-cursor-fill text-lg"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 bg-dark-gray text-gray-300">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-sm mb-md-0">&copy; - World Developers, Work & Relax. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link className='link' to="/terms">
                <a href="#" className="link text-decoration-none">Terms and Conditions</a>
              </Link> and
              <Link className='link' to="/privacy">
                <a href="#" className="link text-decoration-none"> Privacy Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;