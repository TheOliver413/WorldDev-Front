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
    <footer className="footer text-white">
      <div className="footer-container container">
        <div className="row">
          <div className="col-lg-4 mb-3">
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

          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="fw-bold text-uppercase text-heading mb-3">Contact</h6>
            <ul className="list-unstyled">
              <li>World Developers.</li>
              <li>worlddevd@gmail.com</li>
              <li>+54 5436286345.</li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-3">
            <h6 className="fw-bold text-uppercase text-heading mb-3">Pages</h6>
            <ul className="list-unstyled">
              <li><Link to='/' className='footer-link text-decoration-none text-white'><i className="bi bi-house-door"></i> Home</Link></li>
              <li><Link to='/home' className='footer-link text-decoration-none text-white'><i className="bi bi-building"></i> Hotels</Link></li>
              <li><Link to='/home/Events' className='footer-link text-decoration-none text-white'><i className="bi bi-calendar-check"></i> Events</Link></li>
              <li><Link to='/about' className='footer-link text-decoration-none text-white'><i className="bi bi-info-circle"></i> About Us</Link> </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h6 className="fw-bold text-uppercase text-heading mb-3">Daily offers & discounts</h6>
            <p className="mb-3">Receive our offers in your email</p>
            <form className="input-group mb-3" onSubmit={submitHandler}>
              <input style={{ maxWidth: '400px' }} className="form-control bg-white border-white border-end-0" type="email" name='correo' id='correo' placeholder="Your Email" aria-label="Your Email" />
              <button className="footer-btn btn border-white bg-white border-start-0" type="submit">
                <i className="bi bi-cursor-fill"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="py-4 mt-2">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-sm mb-md-0">&copy; {new Date().getFullYear()} - World Developers, Work & Relax. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link className='footer-link text-white text-decoration-none' to="/terms">
                Terms and Conditions
              </Link>
              &nbsp;|&nbsp;
              <Link className='footer-link text-white text-decoration-none' to="/privacy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;